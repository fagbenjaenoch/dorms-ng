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
	ss.Logger.Debug().Str("search_query", searchQuery).Msg("Searching all entities by keyword")

	res, err := ss.searchRepo.Search(ctx, searchQuery)
	if err != nil {
		return dto.StructuredResponse{
			Message: "could not find hostels",
			Status:  http.StatusNotFound,
		}, err
	}

	return dto.StructuredResponse{
		Success: true,
		Status:  http.StatusOK,
		Payload: res,
	}, nil
}

func (ss *SearchService) SearchPlaces(ctx context.Context, searchQuery string) (dto.StructuredResponse, error) {
	ss.Logger.Debug().Str("search_query", searchQuery).Msg("Searching places by keyword")

	res, err := ss.searchRepo.SearchPlaces(ctx, searchQuery)
	if err != nil {
		return dto.StructuredResponse{
			Message: "could not find places",
			Status:  http.StatusNotFound,
		}, err
	}

	return dto.StructuredResponse{
		Success: true,
		Status:  http.StatusOK,
		Message: "successfully searched places",
		Payload: res,
	}, nil
}
