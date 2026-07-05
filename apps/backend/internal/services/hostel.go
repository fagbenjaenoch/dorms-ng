package services

import (
	"context"
	"database/sql"
	"errors"
	"net/http"

	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/database/models"
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/dto"
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/middleware"
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/repositories"
	"github.com/rs/zerolog"
	"go.opentelemetry.io/otel"
)

var hostelTracer = otel.Tracer("hostel_service")

type HostelService struct {
	repo   *repositories.HostelRepository
	Logger *zerolog.Logger
}

func NewHostelService(db *sql.DB, logger *zerolog.Logger) *HostelService {
	return &HostelService{
		repo:   repositories.NewHostelRepository(db, logger),
		Logger: logger,
	}
}

func (s HostelService) CreateHostel(ctx context.Context, hostel dto.CreateHostel) (dto.StructuredResponse, error) {
	ctx, span := hostelTracer.Start(ctx, "CreateHostel")
	defer span.End()

	hostelExists, err := s.repo.CheckHostelExists(ctx, hostel.Name)
	if err != nil {
		return dto.StructuredResponse{
			Success: false,
			Status:  http.StatusInternalServerError,
			Message: "failed to check hostel exists",
			Payload: nil,
		}, err
	}

	if hostelExists {
		return dto.StructuredResponse{
			Success: false,
			Status:  http.StatusConflict,
			Message: "hostel already exists",
			Payload: nil,
		}, nil
	}

	h, err := s.repo.CreateHostel(ctx, hostel)
	if err != nil {
		return dto.StructuredResponse{
			Success: false,
			Status:  http.StatusInternalServerError,
			Message: "failed to create hostel",
			Payload: nil,
		}, err
	}

	return dto.StructuredResponse{
		Success: true,
		Status:  http.StatusCreated,
		Message: "Hostel created successfully",
		Payload: dto.Hostel{
			Name:                h.Name,
			City:                h.City.String,
			Description:         h.Description.String,
			Address:             h.Address.String,
			Latitude:            h.Latitude,
			Longitude:           h.Longitude,
			PhotoURLs:           h.PhotoUrls.String,
			Slug:                h.Slug,
			EstimatedPriceRange: h.EstimatedPriceRange.Float64,
			IsVerified:          h.IsVerifiedByAdmin.Bool,
		},
	}, nil
}

func (s HostelService) GetHostel(ctx context.Context, slug string) (dto.StructuredResponse, error) {
	ctx, span := hostelTracer.Start(ctx, "GetHostel")
	defer span.End()

	h, err := s.repo.GetHostel(ctx, slug)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return dto.StructuredResponse{
				Success: false,
				Status:  http.StatusNotFound,
				Message: "could not find hostel",
				Payload: nil,
			}, err
		}

		return dto.StructuredResponse{
			Success: false,
			Status:  http.StatusInternalServerError,
			Message: "failed to get hostel",
			Payload: nil,
		}, err
	}

	return dto.StructuredResponse{
		Success: true,
		Status:  http.StatusOK,
		Message: "Hostel retrieved successfully",
		Payload: dto.Hostel{
			Name:                h.Name,
			City:                h.City.String,
			Description:         h.Description.String,
			Address:             h.Address.String,
			Latitude:            h.Latitude,
			Longitude:           h.Longitude,
			PhotoURLs:           h.PhotoUrls.String,
			EstimatedPriceRange: h.EstimatedPriceRange.Float64,
		},
	}, nil
}

func (s HostelService) SearchHostels(ctx context.Context, searchType, id string, filters *middleware.HostelFilterParams, paginationParams *middleware.PaginationParams) (dto.StructuredResponse, error) {
	var res []models.Hostel
	var err error

	switch searchType {
	case "institution":
		s.Logger.Debug().Msg("Searching hostels by institution")
		res, err = s.repo.Queries.GetHostelsByInstitution(ctx, models.GetHostelsByInstitutionParams{
			Limit:         int32(paginationParams.Limit),
			Offset:        int32(paginationParams.Offset),
			MinPrice:      sql.NullFloat64{Float64: float64(filters.MinPrice), Valid: true},
			MaxPrice:      sql.NullFloat64{Float64: float64(filters.MaxPrice), Valid: true},
			InstitutionID: id,
		})
		if err != nil {
			return dto.StructuredResponse{
				Message: "could not find hostels",
				Status:  http.StatusNotFound,
			}, err
		}

	case "neighborhood":
		s.Logger.Debug().Msg("Searching hostels by neighborhood")
		res, err = s.repo.Queries.GetHostelsByNeighborhood(ctx, models.GetHostelsByNeighborhoodParams{
			Limit:          int32(paginationParams.Limit),
			Offset:         int32(paginationParams.Offset),
			MinPrice:       sql.NullFloat64{Float64: float64(filters.MinPrice), Valid: true},
			MaxPrice:       sql.NullFloat64{Float64: float64(filters.MaxPrice), Valid: true},
			NeighborhoodID: sql.NullString{String: id, Valid: true},
		})
		if err != nil {
			return dto.StructuredResponse{
				Message: "could not find hostels",
				Status:  http.StatusNotFound,
			}, err
		}

	default:
		return dto.StructuredResponse{
			Status:  http.StatusBadRequest,
			Message: "invalid search type",
		}, nil
	}

	var hostels []dto.Hostel

	for _, v := range res {
		hostels = append(hostels, dto.Hostel{
			Name:                v.Name,
			Address:             v.Address.String,
			Description:         v.Description.String,
			City:                v.City.String,
			Neighborhood:        v.Neighborhood.String,
			EstimatedPriceRange: v.EstimatedPriceRange.Float64,
			Longitude:           v.Longitude,
			Latitude:            v.Latitude,
			Slug:                v.Slug,
			PhotoURLs:           v.PhotoUrls.String,
			IsVerified:          v.IsVerifiedByAdmin.Bool,
		})
	}

	return dto.StructuredResponse{
		Success: true,
		Status:  http.StatusOK,
		Message: "successfully searched hostels",
		Payload: hostels,
	}, nil
}
