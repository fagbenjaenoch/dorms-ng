package services

import (
	"context"
	"database/sql"
	"errors"
	"net/http"

	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/dto"
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/repositories"
	"github.com/rs/zerolog"
	"go.opentelemetry.io/otel"
)

var adminTracer = otel.Tracer("admin_service")

type AdminService struct {
	institutionRepo *repositories.InstitutionRepository
	hostelRepo      *repositories.HostelRepository
	Logger          *zerolog.Logger
}

func NewAdminService(db *sql.DB, logger *zerolog.Logger) *AdminService {
	return &AdminService{
		institutionRepo: repositories.NewInstitutionRepository(db, logger),
		hostelRepo:      repositories.NewHostelRepository(db, logger),
		Logger:          logger,
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
		Payload: dto.CreateHostelResponsePayload{
			Name:            h.Name,
			City:            h.City.String,
			Description:     h.Description.String,
			Address:         h.Address.String,
			Latitude:        h.Latitude,
			Longitude:       h.Longitude,
			PrimaryPhotoURL: h.PrimaryPhotoUrl.String,
			Slug:            h.Slug,
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

func (s AdminService) GetHostel(ctx context.Context, slug string) (dto.StructuredResponse, error) {
	ctx, span := adminTracer.Start(ctx, "GetHostel")
	defer span.End()

	h, err := s.hostelRepo.GetHostel(ctx, slug)
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
		Payload: dto.CreateHostel{
			Name:            h.Name,
			City:            h.City.String,
			Description:     h.Description.String,
			Address:         h.Address.String,
			Latitude:        h.Latitude,
			Longitude:       h.Longitude,
			PrimaryPhotoURL: h.PrimaryPhotoUrl.String,
		},
	}, nil
}

func (s AdminService) GetInstitution(ctx context.Context, slug string) (dto.StructuredResponse, error) {
	ctx, span := adminTracer.Start(ctx, "GetInstitution")
	defer span.End()

	i, err := s.institutionRepo.GetInstitution(ctx, slug)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return dto.StructuredResponse{
				Success: false,
				Status:  http.StatusNotFound,
				Message: "could not find institution",
				Payload: nil,
			}, err
		}

		return dto.StructuredResponse{
			Success: false,
			Status:  http.StatusInternalServerError,
			Message: "failed to get institution",
			Payload: nil,
		}, err
	}

	return dto.StructuredResponse{
		Success: true,
		Status:  http.StatusOK,
		Message: "Institution retrieved successfully",
		Payload: dto.CreateInstitution{
			Name:      i.Name,
			Acronym:   i.Acronym.String,
			City:      i.City,
			Latitude:  i.Latitude,
			Longitude: i.Longitude,
		},
	}, nil
}
