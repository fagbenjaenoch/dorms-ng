package repositories

import (
	"context"
	"database/sql"
	"fmt"
	"strings"

	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/database/models"
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/dto"
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/utils"
	"github.com/google/uuid"
	"github.com/rs/zerolog"
)

type InstitutionRepository struct {
	BaseRepository
	db *sql.DB
}

func NewInstitutionRepository(db *sql.DB, logger *zerolog.Logger) *InstitutionRepository {
	return &InstitutionRepository{
		BaseRepository: BaseRepository{
			Queries: models.New(db),
			Logger:  logger,
		},
		db: db,
	}
}

func (ir *InstitutionRepository) CreateInstitution(ctx context.Context, institution dto.CreateInstitution) (*models.Institution, error) {
	tx, err := ir.db.Begin()
	if err != nil {
		return nil, err
	}
	defer tx.Rollback()

	qtx := ir.BaseRepository.Queries.WithTx(tx)

	var i models.CreateInstitutionParams
	i.ID = uuid.New().String()
	i.Name = institution.Name
	i.Acronym = sql.NullString{String: strings.ToUpper(institution.Acronym), Valid: true}
	i.Latitude = institution.Latitude
	i.Longitude = institution.Longitude
	i.City = institution.City
	i.Slug = utils.GenerateSlug(institution.Name)

	ci, err := qtx.CreateInstitution(ctx, i)
	if err != nil {
		return nil, err
	}

	searchEntry := models.CreateSearchEntryParams{
		EntityID:   ci.ID,
		EntityType: "institution",
		Entity:     ci.Name,
		SearchText: fmt.Sprintf("%s, %s, %s", ci.Name, ci.City, ci.Acronym.String),
		Slug:       ci.Slug,
		Address:    ci.City,
	}

	_, err = qtx.CreateSearchEntry(ctx, searchEntry)
	if err != nil {
		return nil, err
	}

	placeSearchEntry := models.CreatePlaceSearchEntryParams{
		PlaceID:   ci.ID,
		PlaceType: "institution",
		Name:      fmt.Sprintf("%s, %s", ci.Name, ci.City),
	}

	if _, err := qtx.CreatePlaceSearchEntry(ctx, placeSearchEntry); err != nil {
		return nil, err
	}

	if err := tx.Commit(); err != nil {
		return nil, err
	}

	return &ci, nil
}

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
	h.PrimaryPhotoUrl = sql.NullString{String: hostel.PrimaryPhotoURL, Valid: true}
	h.Description = sql.NullString{String: hostel.Description, Valid: true}
	h.Slug = utils.GenerateSlug(hostel.Name)

	hr.Logger.Debug().Str("hostel slug", h.Slug).Msg("generated hostel slug")

	ch, err := qtx.CreateHostel(ctx, h)
	if err != nil {
		return nil, err
	}

	searchEntry := models.CreateSearchEntryParams{
		EntityID:   ch.ID,
		EntityType: "hostel",
		Entity:     ch.Name,
		SearchText: fmt.Sprintf("%s, %s, %s", h.Name, h.Address.String, h.City.String),
		Slug:       h.Slug,
		Address:    ch.Address.String,
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

func (hr *InstitutionRepository) GetInstitution(ctx context.Context, slug string) (*models.Institution, error) {
	i, err := hr.BaseRepository.Queries.GetInstitutionBySlug(ctx, slug)
	if err != nil {
		return nil, err
	}

	return &i, nil
}

func (hr *InstitutionRepository) GetAllInstitutions(ctx context.Context) ([]models.Institution, error) {
	institutions, err := hr.BaseRepository.Queries.GetAllInstitutions(ctx)
	if err != nil {
		return nil, err
	}

	return institutions, nil
}

type NeighborhoodRepository struct {
	BaseRepository
	db *sql.DB
}

func NewNeighborhoodRepository(db *sql.DB, logger *zerolog.Logger) *NeighborhoodRepository {
	return &NeighborhoodRepository{
		BaseRepository: BaseRepository{
			Queries: models.New(db),
			Logger:  logger,
		},
		db: db,
	}
}

func (nr *NeighborhoodRepository) CreateNeighborhood(ctx context.Context, neighborhood dto.CreateNeighborhood) (*models.Neighborhood, error) {
	tx, err := nr.db.Begin()
	if err != nil {
		return nil, err
	}
	defer tx.Rollback()

	qtx := nr.BaseRepository.Queries.WithTx(tx)

	var n models.CreateNeighborhoodParams
	n.ID = uuid.NewString()
	n.Name = neighborhood.Name
	n.InstitutionID = neighborhood.InstitutionId

	cn, err := qtx.CreateNeighborhood(ctx, n)
	if err != nil {
		return nil, err
	}

	searchEntry := models.CreateSearchEntryParams{
		EntityID:   cn.ID,
		Entity:     neighborhood.Name,
		EntityType: "neighborhood",
		SearchText: neighborhood.Name,
	}

	if _, err := qtx.CreateSearchEntry(ctx, searchEntry); err != nil {
		return nil, err
	}

	placeSearchEntry := models.CreatePlaceSearchEntryParams{
		PlaceID:   cn.ID,
		PlaceType: "neighborhood",
		Name:      cn.Name,
	}

	if _, err := qtx.CreatePlaceSearchEntry(ctx, placeSearchEntry); err != nil {
		return nil, err
	}

	if err := tx.Commit(); err != nil {
		return nil, err
	}

	return &cn, nil
}

func (nr *NeighborhoodRepository) GetAllNeighborhoods(ctx context.Context) ([]models.Neighborhood, error) {
	neighborhoods, err := nr.BaseRepository.Queries.GetAllNeighborhoods(ctx)
	if err != nil {
		return nil, err
	}

	return neighborhoods, nil
}
