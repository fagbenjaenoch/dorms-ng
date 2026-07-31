package repositories

import (
	"context"
	"database/sql"

	"github.com/fagbenjaenoch/dorms-ng/internal/database/models"
	"github.com/rs/zerolog"
)

type SearchRepository struct {
	BaseRepository
}

func NewSearchRepository(db *sql.DB, logger *zerolog.Logger) *SearchRepository {
	return &SearchRepository{
		BaseRepository: BaseRepository{
			Queries: models.New(db),
			Logger:  logger,
		},
	}
}

func (sr *SearchRepository) Search(ctx context.Context, searchQuery string) (*[]models.GetSearchEntryRow, error) {
	res, err := sr.Queries.GetSearchEntry(ctx, searchQuery)
	if err != nil {
		return nil, err
	}

	return &res, nil
}

func (sr *SearchRepository) SearchPlaces(ctx context.Context, searchQuery string) (*[]models.GetPlaceSearchEntryRow, error) {
	res, err := sr.Queries.GetPlaceSearchEntry(ctx, sql.NullString{String: searchQuery, Valid: true})
	if err != nil {
		return nil, err
	}

	return &res, nil
}
