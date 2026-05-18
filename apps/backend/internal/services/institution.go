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

var institutionTracer = otel.Tracer("institution_service")

type InstitutionService struct {
	repo   *repositories.InstitutionRepository
	Logger *zerolog.Logger
}

func NewInstitutionService(db *sql.DB, logger *zerolog.Logger) *InstitutionService {
	return &InstitutionService{
		repo:   repositories.NewInstitutionRepository(db, logger),
		Logger: logger,
	}
}

func (s InstitutionService) CreateInstitution(ctx context.Context, institution dto.CreateInstitution) (dto.StructuredResponse, error) {
	ctx, span := institutionTracer.Start(ctx, "CreateInstitution")
	defer span.End()

	i, err := s.repo.CreateInstitution(ctx, institution)
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

func (s InstitutionService) GetInstitution(ctx context.Context, slug string) (dto.StructuredResponse, error) {
	ctx, span := institutionTracer.Start(ctx, "GetInstitution")
	defer span.End()

	i, err := s.repo.GetInstitution(ctx, slug)
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

func (s InstitutionService) GetAllInstitutions(ctx context.Context) (dto.StructuredResponse, error) {
	ctx, span := institutionTracer.Start(ctx, "GetAllInstitutions")
	defer span.End()

	institutions, err := s.repo.GetAllInstitutions(ctx)
	if err != nil {
		return dto.StructuredResponse{
			Success: false,
			Status:  http.StatusInternalServerError,
			Message: "failed to get all institutions",
			Payload: nil,
		}, err
	}

	return dto.StructuredResponse{
		Success: true,
		Status:  http.StatusOK,
		Message: "Institutions retrieved successfully",
		Payload: institutions,
	}, nil
}
