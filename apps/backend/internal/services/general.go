package services

import (
	"context"
	"database/sql"
	"net/http"

	"github.com/fagbenjaenoch/dorms-ng/internal/dto"
	"github.com/fagbenjaenoch/dorms-ng/internal/repositories"
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

	searchResults := make([]dto.SearchResult, len(*res))

	for i, entry := range *res {
		searchResults[i].EntityID = entry.EntityID
		searchResults[i].EntityType = entry.EntityType
		searchResults[i].Entity = entry.Entity
		searchResults[i].Slug = entry.Slug
		searchResults[i].Address = entry.Address.String
	}

	return dto.StructuredResponse{
		Success: true,
		Status:  http.StatusOK,
		Message: "successfully searched query",
		Payload: searchResults,
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
