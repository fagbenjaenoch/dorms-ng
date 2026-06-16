package repositories

import (
	"context"
	"database/sql"
	"fmt"
	"strings"
	"time"

	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/database/models"
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/dto"
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/utils"
	"github.com/google/uuid"
	"github.com/rs/zerolog"
)

type HostelRepository struct {
	BaseRepository
	db *sql.DB
}

func NewHostelRepository(db *sql.DB, logger *zerolog.Logger) *HostelRepository {
	return &HostelRepository{
		BaseRepository: BaseRepository{
			Queries: models.New(db),
			Logger:  logger,
		},
		db: db,
	}
}

func (hr *HostelRepository) CheckHostelExists(ctx context.Context, name string) (bool, error) {
	hostelExists, err := hr.BaseRepository.Queries.CheckHostelExists(ctx, strings.ToLower(name))
	if err != nil {
		return false, err
	}
	return hostelExists, nil
}

func (hr *HostelRepository) CreateHostel(ctx context.Context, hostel dto.CreateHostel) (*models.Hostel, error) {
	tx, err := hr.db.Begin()
	if err != nil {
		return nil, err
	}
	defer tx.Rollback()

	qtx := hr.BaseRepository.Queries.WithTx(tx)

	var h models.CreateHostelParams
	h.ID = uuid.New().String()
	h.Name = hostel.Name
	h.City = sql.NullString{String: hostel.City, Valid: true}
	h.Neighborhood = sql.NullString{String: hostel.Neighborhood, Valid: true}
	h.NeighborhoodID = sql.NullString{String: hostel.NeighborhoodID, Valid: true}
	h.Address = sql.NullString{String: hostel.Address, Valid: true}
	h.EstimatedPriceRange = sql.NullFloat64{Float64: hostel.EstimatedPriceRange, Valid: true}
	h.Latitude = hostel.Latitude
	h.Longitude = hostel.Longitude
	h.IsVerifiedByAdmin = sql.NullBool{Bool: hostel.IsVerified, Valid: true}
	h.PhotoUrls = sql.NullString{String: strings.Join(hostel.PhotoURLs, ", "), Valid: true}
	h.Description = sql.NullString{String: hostel.Description, Valid: true}
	h.Slug = utils.GenerateSlug(hostel.Name, fmt.Sprintf("%d", time.Now().Unix()))

	hr.Logger.Debug().Str("hostel slug", h.Slug).Msg("generated hostel slug")

	ch, err := qtx.CreateHostel(ctx, h)
	if err != nil {
		return nil, err
	}

	searchEntry := models.CreateSearchEntryParams{
		EntityID:   ch.ID,
		EntityType: "hostel",
		Entity:     ch.Name,
		SearchText: sql.NullString{String: fmt.Sprintf("%s, %s, %s", h.Name, h.Address.String, h.City.String), Valid: true},
		Slug:       h.Slug,
		Address:    sql.NullString{String: ch.Address.String, Valid: true},
	}

	_, err = qtx.CreateSearchEntry(ctx, searchEntry)
	if err != nil {
		return nil, err
	}

	if err := tx.Commit(); err != nil {
		return nil, err
	}

	return &ch, nil
}

func (hr *HostelRepository) GetHostel(ctx context.Context, slug string) (*models.Hostel, error) {
	h, err := hr.BaseRepository.Queries.GetHostelBySlug(ctx, slug)
	if err != nil {
		return nil, err
	}

	return &h, nil
}

func (hr *HostelRepository) GetHostelByNeighborhood(ctx context.Context, neighborhoodID string) ([]models.Hostel, error) {
	nId := sql.NullString{String: neighborhoodID, Valid: true}
	hostels, err := hr.BaseRepository.Queries.GetHostelsByNeighborhood(ctx, nId)
	if err != nil {
		return nil, err
	}

	return hostels, nil
}

func (hr *HostelRepository) GetHostelByInstitution(ctx context.Context, institutionID string) ([]models.Hostel, error) {
	hostels, err := hr.BaseRepository.Queries.GetHostelsByInstitution(ctx, institutionID)
	if err != nil {
		return nil, err
	}

	return hostels, nil
}
