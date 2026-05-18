package repositories

import (
	"context"
	"database/sql"
	"fmt"

	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/database/models"
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/dto"
	"github.com/google/uuid"
	"github.com/rs/zerolog"
)

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
	n.Institution = neighborhood.Institution
	n.InstitutionID = neighborhood.InstitutionId

	cn, err := qtx.CreateNeighborhood(ctx, n)
	if err != nil {
		return nil, err
	}

	searchEntry := models.CreateSearchEntryParams{
		EntityID:   cn.ID,
		Entity:     cn.Name,
		EntityType: "neighborhood",
		SearchText: fmt.Sprintf("%s, %s", cn.Name, cn.Institution),
		Address:    cn.Institution,
	}

	nr.Logger.Debug().Str("institution", cn.Institution).Msg("creating neighborhood search entry")

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
