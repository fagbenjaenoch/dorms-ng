package repositories

import (
	"context"
	"database/sql"

	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/database/models"
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

func (sr *SearchRepository) Search(ctx context.Context, searchQuery string) (*[]models.GlobalSearch, error) {
	res, err := sr.Queries.GetSearchEntry(ctx, searchQuery)
	if err != nil {
		return nil, err
	}

	return &res, nil
}
