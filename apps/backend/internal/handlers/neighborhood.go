package handlers

import (
	"net/http"

	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/dto"
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/server"
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/services"
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/utils"
)

type NeighborhoodHandler struct {
	BaseHandler
	service *services.NeighborhoodService
}

func NewNeighborhoodHandler(s *server.Server) NeighborhoodHandler {
	return NeighborhoodHandler{
		BaseHandler: BaseHandler{
			server: s,
		},
		service: services.NewNeighborhoodService(s.DB, s.Logger),
	}
}

func (h *NeighborhoodHandler) CreateNeighborhood(w http.ResponseWriter, r *http.Request) {
	neighborhood, err := utils.GetValidatedPayloadFromRequest[dto.CreateNeighborhood](r.Context())
	if err != nil {
		msg := "failed to process request body"
		h.server.Logger.Err(err).Msg(msg)
		utils.WriteJSON(w, dto.StructuredResponse{
			Success: false,
			Status:  http.StatusInternalServerError,
			Message: msg,
			Payload: nil,
		})
		return
	}

	res, err := h.service.CreateNeighborhood(r.Context(), neighborhood)
	if err != nil {
		msg := "failed to create neighborhood"
		h.server.Logger.Err(err).Msg(msg)
		utils.WriteJSON(w, res)
		return
	}

	utils.WriteJSON(w, res)
}

func (h *NeighborhoodHandler) GetAllNeighborhoods(w http.ResponseWriter, r *http.Request) {
	res, err := h.service.GetAllNeighborhoods(r.Context())
	if err != nil {
		msg := "failed to get all neighborhoods"
		h.server.Logger.Err(err).Msg(msg)
		utils.WriteJSON(w, res)
		return
	}

	utils.WriteJSON(w, res)
}
