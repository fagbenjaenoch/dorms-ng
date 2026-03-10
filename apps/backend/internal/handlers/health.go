package handlers

import (
	"net/http"
	"time"

	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/dto"
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/server"
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/utils"
)

type HealthHandler struct {
	Handler
}

func NewHealthHandler(s *server.Server) *HealthHandler {
	return &HealthHandler{
		Handler: NewHandler(s),
	}
}

type HealthCheckPayload struct {
	Timestamp   string            `json:"timestamp"`
	Environment string            `json:"environment"`
	Checks      map[string]string `json:"checks"`
}

func (h *HealthHandler) CheckHealth(w http.ResponseWriter, r *http.Request) {
	h.server.Logger.Info().Msg("health check")

	checks := make(map[string]string)

	if err := h.server.DB.Ping(); err != nil {
		checks["database"] = "unhealthy"
	} else {
		checks["database"] = "ok"
	}

	response := dto.HttpResponse{
		Success: true,
		Status:  200,
		Message: "server is healthy",
		Payload: HealthCheckPayload{
			Timestamp:   time.Now().UTC().String(),
			Environment: h.server.Config.Primary.Env,
			Checks:      checks,
		},
	}

	utils.SendJSONReponse(w, response)
}
