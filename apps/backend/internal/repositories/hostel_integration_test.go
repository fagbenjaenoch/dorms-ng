//go:build integration

package repositories_test

import (
	"context"
	"testing"

	"github.com/fagbenjaenoch/dorms-ng/internal/database/models"
	"github.com/fagbenjaenoch/dorms-ng/internal/dto"
	"github.com/fagbenjaenoch/dorms-ng/internal/repositories"
	"github.com/fagbenjaenoch/dorms-ng/internal/testutils"
)

func TestHostelRepository_Create(t *testing.T) {
	setup := testutils.SetupTestContainer(t)
	defer setup.Cleanup()

	logger := testutils.NewTestLogger(t)

	queries := models.New(setup.DB)
	repo := repositories.NewHostelRepository(setup.DB, logger)

	institution, err := queries.CreateInstitution(context.Background(), models.CreateInstitutionParams{
		Name:  "Test University",
		State: "Lagos",
	})
	if err != nil {
		t.Errorf("expected nil, got %s", err)
	}

	neighborhood, err := queries.CreateNeighborhood(context.Background(), models.CreateNeighborhoodParams{
		Name:          "Main campus",
		State:         "Lagos",
		InstitutionID: institution.ID,
		Institution:   institution.Name,
	})
	if err != nil {
		t.Errorf("expected nil, got %s", err)
	}

	hostel, err := repo.CreateHostel(context.Background(), dto.CreateHostel{
		Name:           "Test Hostel",
		Description:    "A nice hostel",
		NeighborhoodID: neighborhood.ID,
		Neighborhood:   neighborhood.Name,
	})
	if err != nil {
		t.Errorf("expected nil, got %s", err)
	}

	if hostel.ID == "" {
		t.Error("expected a valid hostel id")
	}

	if hostel.Name != "Test Hostel" {
		t.Errorf("expected 'Test Hostel', got %s", hostel.Name)
	}
}
