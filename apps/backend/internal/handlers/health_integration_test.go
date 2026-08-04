//go:build integration

package handlers_test

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/fagbenjaenoch/dorms-ng/internal/dto"
	"github.com/fagbenjaenoch/dorms-ng/internal/routes"
	"github.com/fagbenjaenoch/dorms-ng/internal/testutils"
)

func TestHealthCheck_Integration(t *testing.T) {
	setup := testutils.SetupTestContainer(t)
	defer setup.Cleanup()

	// Register routes
	router := routes.New(setup.Server)
	setup.Server.SetupHttpServer(router)

	// Create test request
	req := httptest.NewRequest(http.MethodGet, "/v1/health", nil)
	w := httptest.NewRecorder()

	router.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Error("should return 200")
	}

	var resp dto.StructuredResponse
	err := json.Unmarshal(w.Body.Bytes(), &resp)
	if t != nil {
		t.Errorf("expected nil, got %s", err)
	}

	if resp.Success != true {
		t.Error("the response should be successful")
	}
}
