package services

import (
	"context"
	"database/sql"
	"net/http"

	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/dto"
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/repositories"
	"github.com/rs/zerolog"
)

type SearchService struct {
	searchRepo repositories.SearchRepository
	Logger     *zerolog.Logger
}

func NewSearchService(db *sql.DB, logger *zerolog.Logger) SearchService {
	return SearchService{
		searchRepo: *repositories.NewSearchRepository(db, logger),
		Logger:     logger,
	}
}

func (ss *SearchService) Search(ctx context.Context, searchQuery string) (dto.StructuredResponse, error) {
	res, err := ss.searchRepo.Search(ctx, searchQuery)
	if err != nil {
		return dto.StructuredResponse{
			Status: http.StatusNotFound,
		}, err
	}

	return dto.StructuredResponse{
		Success: true,
		Status:  http.StatusOK,
		Payload: res,
	}, nil
}
