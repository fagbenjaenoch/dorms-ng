package services

import (
	"context"
	"database/sql"
	"errors"
	"net/http"

	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/database/models"
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
		Payload: dto.Hostel{
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

func (s AdminService) GetAllInstitutions(ctx context.Context) (dto.StructuredResponse, error) {
	ctx, span := adminTracer.Start(ctx, "GetAllInstitutions")
	defer span.End()

	institutions, err := s.institutionRepo.GetAllInstitutions(ctx)
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
		Payload: dto.Hostel{
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

func (s AdminService) SearchHostels(ctx context.Context, searchType, id string) (dto.StructuredResponse, error) {
	var res []models.Hostel
	var err error

	switch searchType {
	case "institution":
		s.Logger.Debug().Msg("Searching hostels by institution")
		res, err = s.hostelRepo.Queries.GetHostelsByInstitution(ctx, id)
		if err != nil {
			return dto.StructuredResponse{
				Message: "could not find hostels",
				Status:  http.StatusNotFound,
			}, err
		}

	case "neighborhood":
		s.Logger.Debug().Msg("Searching hostels by neighborhood")
		q := sql.NullString{String: id, Valid: true}
		res, err = s.hostelRepo.Queries.GetHostelsByNeighborhood(ctx, q)
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
			PrimaryPhotoURL:     v.PrimaryPhotoUrl.String,
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
