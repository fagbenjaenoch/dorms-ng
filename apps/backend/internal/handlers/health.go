package handlers

import (
	"net/http"
	"time"

	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/dto"
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/server"
)

type HealthHandler struct {
	BaseHandler
}

func NewHealthHandler(s *server.Server) *HealthHandler {
	return &HealthHandler{
		BaseHandler: BaseHandler{
			server: s,
		},
	}
}

type HealthCheckPayload struct {
	Timestamp   string            `json:"timestamp"`
	Environment string            `json:"environment"`
	Checks      map[string]string `json:"checks"`
}

func (hh *HealthHandler) CheckHealth(w http.ResponseWriter, r *http.Request) {
	checks := make(map[string]string)

	if err := hh.server.DB.Ping(); err != nil {
		checks["database"] = "unhealthy"
	} else {
		checks["database"] = "ok"
	}

	response := dto.StructuredResponse{
		Success: true,
		Status:  200,
		Message: "server is healthy",
		Payload: HealthCheckPayload{
			Timestamp:   time.Now().UTC().String(),
			Environment: hh.server.Config.Primary.Env,
			Checks:      checks,
		},
	}

	hh.ReturnJSONResponse(w, response)
}
