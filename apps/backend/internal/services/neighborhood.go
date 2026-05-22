package services

import (
	"context"
	"database/sql"
	"net/http"

	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/dto"
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/repositories"
	"github.com/rs/zerolog"
	"go.opentelemetry.io/otel"
)

var neighborhoodTracer = otel.Tracer("neighborhood_service")

type NeighborhoodService struct {
	repo   *repositories.NeighborhoodRepository
	Logger *zerolog.Logger
}

func NewNeighborhoodService(db *sql.DB, logger *zerolog.Logger) *NeighborhoodService {
	return &NeighborhoodService{
		repo:   repositories.NewNeighborhoodRepository(db, logger),
		Logger: logger,
	}
}

func (s NeighborhoodService) CreateNeighborhood(ctx context.Context, neighborhood dto.CreateNeighborhood) (dto.StructuredResponse, error) {
	ctx, span := neighborhoodTracer.Start(ctx, "CreateNeighborhood")
	defer span.End()

	neighborhoodExists, err := s.repo.CheckNeighborhoodExists(ctx, neighborhood)
	if err != nil {
		return dto.StructuredResponse{
			Success: false,
			Status:  http.StatusInternalServerError,
			Message: "failed to check neighborhood exists",
			Payload: nil,
		}, err
	}

	if neighborhoodExists {
		return dto.StructuredResponse{
			Success: false,
			Status:  http.StatusConflict,
			Message: "neighborhood already exists",
			Payload: nil,
		}, nil
	}

	n, err := s.repo.CreateNeighborhood(ctx, neighborhood)
	if err != nil {
		return dto.StructuredResponse{
			Success: false,
			Status:  http.StatusInternalServerError,
			Message: "failed to create neighborhood",
			Payload: nil,
		}, err
	}

	return dto.StructuredResponse{
		Success: true,
		Status:  http.StatusOK,
		Message: "Neighborhood created successfully",
		Payload: dto.Neighborhood{
			Name: n.Name,
		},
	}, nil
}

func (s NeighborhoodService) GetAllNeighborhoods(ctx context.Context) (dto.StructuredResponse, error) {
	ctx, span := neighborhoodTracer.Start(ctx, "GetAllNeighborhoods")
	defer span.End()

	neighborhoods, err := s.repo.GetAllNeighborhoods(ctx)
	if err != nil {
		return dto.StructuredResponse{
			Success: false,
			Status:  http.StatusInternalServerError,
			Message: "failed to get all neighborhoods",
			Payload: nil,
		}, err
	}

	var np []dto.NeighborhoodPayload
	for _, n := range neighborhoods {
		np = append(np, dto.NeighborhoodPayload{
			ID:   n.ID,
			Name: n.Name,
		})
	}

	return dto.StructuredResponse{
		Success: true,
		Status:  http.StatusOK,
		Message: "Neighborhoods retrieved successfully",
		Payload: np,
	}, nil
}
