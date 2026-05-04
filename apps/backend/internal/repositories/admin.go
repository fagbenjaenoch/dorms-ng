package repositories

import (
	"context"
	"database/sql"
	"fmt"
	"strings"

	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/database/models"
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/dto"
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

	ci, err := qtx.CreateInstitution(ctx, i)
	if err != nil {
		return nil, err
	}

	searchEntry := models.CreateSearchEntryParams{
		EntityID:   ci.ID,
		EntityType: "institution",
		Entity:     ci.Name,
		SearchText: fmt.Sprintf("%s, %s, %s", ci.Name, ci.City, ci.Acronym.String),
	}

	_, err = qtx.CreateSearchEntry(ctx, searchEntry)
	if err != nil {
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
	h.Address = sql.NullString{String: hostel.Address, Valid: true}
	h.Latitude = hostel.Latitude
	h.Longitude = hostel.Longitude
	h.PrimaryPhotoUrl = sql.NullString{String: hostel.PrimaryPhotoURL, Valid: true}

	ch, err := qtx.CreateHostel(ctx, h)
	if err != nil {
		return nil, err
	}

	searchEntry := models.CreateSearchEntryParams{
		EntityID:   ch.ID,
		EntityType: "hostel",
		Entity:     ch.Name,
		SearchText: fmt.Sprintf("%s, %s, %s", h.Name, h.Address.String, h.City.String),
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
