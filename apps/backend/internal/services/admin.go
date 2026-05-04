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
	institutionRepo   *repositories.InstitutionRepository
	hostelRepo        *repositories.HostelRepository
	neighbourhoodRepo *repositories.NeighborhoodRepository
	Logger            *zerolog.Logger
}

func NewAdminService(db *sql.DB, logger *zerolog.Logger) *AdminService {
	return &AdminService{
		institutionRepo:   repositories.NewInstitutionRepository(db, logger),
		hostelRepo:        repositories.NewHostelRepository(db, logger),
		neighbourhoodRepo: repositories.NewNeighborhoodRepository(db, logger),
		Logger:            logger,
	}
}

func (s AdminService) CreateHostel(ctx context.Context, hostel dto.CreateHostel) (dto.StructuredResponse, error) {
	ctx, span := adminTracer.Start(ctx, "CreateHostel")
	defer span.End()

	h, err := s.hostelRepo.CreateHostel(ctx, hostel)
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
		Payload: dto.CreateHostel{
			Name:            h.Name,
			Address:         h.Address.String,
			Latitude:        h.Latitude,
			Longitude:       h.Longitude,
			PrimaryPhotoURL: h.PrimaryPhotoUrl.String,
		},
	}, nil
}

func (s AdminService) CreateInstitution(ctx context.Context, institution dto.CreateInstitution) (dto.StructuredResponse, error) {
	ctx, span := adminTracer.Start(ctx, "CreateInstitution")
	defer span.End()

	i, err := s.institutionRepo.CreateInstitution(ctx, institution)
	if err != nil {
		return dto.StructuredResponse{
			Success: false,
			Status:  http.StatusInternalServerError,
			Message: "failed to create institution",
			Payload: nil,
		}, err
	}

	return dto.StructuredResponse{
		Success: true,
		Status:  http.StatusCreated,
		Message: "Institution created successfully",
		Payload: dto.CreateInstitution{
			Name:      i.Name,
			Acronym:   i.Acronym.String,
			Latitude:  i.Latitude,
			Longitude: i.Longitude,
			City:      i.City,
		},
	}, nil
}
