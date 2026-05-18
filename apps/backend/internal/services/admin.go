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

var adminTracer = otel.Tracer("admin_service")

type AdminService struct {
	institutionRepo  *repositories.InstitutionRepository
	hostelRepo       *repositories.HostelRepository
	neighborhoodRepo *repositories.NeighborhoodRepository
	Logger           *zerolog.Logger
}

func NewAdminService(db *sql.DB, logger *zerolog.Logger) *AdminService {
	return &AdminService{
		institutionRepo:  repositories.NewInstitutionRepository(db, logger),
		hostelRepo:       repositories.NewHostelRepository(db, logger),
		neighborhoodRepo: repositories.NewNeighborhoodRepository(db, logger),
		Logger:           logger,
	}
}

func (s AdminService) CreateNeighborhood(ctx context.Context, neighborhood dto.CreateNeighborhood) (dto.StructuredResponse, error) {
	ctx, span := adminTracer.Start(ctx, "CreateNeighborhood")
	defer span.End()

	n, err := s.neighborhoodRepo.CreateNeighborhood(ctx, neighborhood)
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

func (s AdminService) GetAllNeighborhoods(ctx context.Context) (dto.StructuredResponse, error) {
	ctx, span := adminTracer.Start(ctx, "GetAllNeighborhoods")
	defer span.End()

	neighborhoods, err := s.neighborhoodRepo.GetAllNeighborhoods(ctx)
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
