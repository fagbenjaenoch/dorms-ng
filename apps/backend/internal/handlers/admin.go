package handlers

import (
	"net/http"

	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/dto"
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/server"
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/services"
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/utils"
)

type AdminHandler struct {
	BaseHandler
	AdminService *services.AdminService
}

func NewAdminHandler(s *server.Server) AdminHandler {
	return AdminHandler{
		BaseHandler: BaseHandler{
			server: s,
		},
		AdminService: services.NewAdminService(s.DB, s.Logger),
	}
}

func (h *AdminHandler) CreateInstitution(w http.ResponseWriter, r *http.Request) {
	institution, err := utils.GetValidatedPayloadFromRequest[dto.CreateInstitution](r.Context())
	if err != nil {
		msg := "failed to process request body"
		h.server.Logger.Err(err).Msg(msg)
		h.WriteJSON(w, dto.StructuredResponse{
			Success: false,
			Status:  http.StatusInternalServerError,
			Message: msg,
			Payload: nil,
		})
		return
	}

	res, err := h.AdminService.CreateInstitution(r.Context(), institution)
	if err != nil {
		msg := "failed to create institution"
		h.server.Logger.Err(err).Msg(msg)
		utils.WriteJSON(w, res)
		return
	}

	h.WriteJSON(w, res)
}

func (h *AdminHandler) CreateHostel(w http.ResponseWriter, r *http.Request) {
	hostel, err := utils.GetValidatedPayloadFromRequest[dto.CreateHostel](r.Context())
	if err != nil {
		msg := "failed to process request body"
		h.server.Logger.Err(err).Msg(msg)
		h.WriteJSON(w, dto.StructuredResponse{
			Success: false,
			Status:  http.StatusInternalServerError,
			Message: msg,
			Payload: nil,
		})
		return
	}

	res, err := h.AdminService.CreateHostel(r.Context(), hostel)
	if err != nil {
		msg := "failed to create hostel"
		h.server.Logger.Err(err).Msg(msg)
		utils.WriteJSON(w, res)
		return
	}

	h.WriteJSON(w, res)
}

func (h *AdminHandler) CreateNeighborhood(w http.ResponseWriter, r *http.Request) {
	neighborhood, err := utils.GetValidatedPayloadFromRequest[dto.CreateNeighborhood](r.Context())
	if err != nil {
		msg := "failed to process request body"
		h.server.Logger.Err(err).Msg(msg)
		h.WriteJSON(w, dto.StructuredResponse{
			Success: false,
			Status:  http.StatusInternalServerError,
			Message: msg,
			Payload: nil,
		})
		return
	}

	res, err := h.AdminService.CreateNeighborhood(r.Context(), neighborhood)
	if err != nil {
		msg := "failed to create neighborhood"
		h.server.Logger.Err(err).Msg(msg)
		utils.WriteJSON(w, res)
		return
	}

	h.WriteJSON(w, res)
}
