package repositories

import (
	"context"
	"database/sql"

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
	i.Acronym = sql.NullString{String: institution.Acronym, Valid: true}
	i.Latitude = institution.Latitude
	i.Longitude = institution.Longitude

	ci, err := qtx.CreateInstitution(ctx, i)
	if err != nil {
		return nil, err
	}

	return &ci, tx.Commit()
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

	ch, err := qtx.CreateHostel(ctx, h)
	if err != nil {
		return nil, err
	}

	searchEntry := models.CreateSearchEntryParams{
		EntityID:   ch.ID,
		EntityType: "hostel",
		SearchText: ch.Name,
	}

	_, err = qtx.CreateSearchEntry(ctx, searchEntry)
	if err != nil {
		return nil, err
	}

	return &ch, tx.Commit()
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
	n.ID = uuid.New().String()
	n.Name = neighborhood.Name
	n.AvgPriceSelfCon = sql.NullInt64{Int64: int64(neighborhood.AvgPriceSelfCon), Valid: true}
	n.AvgPrice1bed = sql.NullInt64{Int64: int64(neighborhood.AvgPrice1bed), Valid: true}
	n.PowerRatingInsight = sql.NullString{String: neighborhood.PowerRatingInsight, Valid: true}
	n.Latitude = neighborhood.Latitude
	n.Longitude = neighborhood.Longitude

	cn, err := qtx.CreateNeighborhood(ctx, n)
	if err != nil {
		return nil, err
	}

	searchEntry := models.CreateSearchEntryParams{
		EntityID:   cn.ID,
		EntityType: "neighborhood",
		SearchText: cn.Name,
	}

	_, err = qtx.CreateSearchEntry(ctx, searchEntry)
	if err != nil {
		return nil, err
	}

	return &cn, tx.Commit()
}
