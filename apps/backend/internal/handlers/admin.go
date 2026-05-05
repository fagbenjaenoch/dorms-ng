package handlers

import (
	"net/http"

	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/dto"
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/server"
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/services"
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/utils"
	"github.com/go-chi/chi/v5"
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
		utils.WriteJSON(w, dto.StructuredResponse{
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

	utils.WriteJSON(w, res)
}

func (h *AdminHandler) CreateHostel(w http.ResponseWriter, r *http.Request) {
	hostel, err := utils.GetValidatedPayloadFromRequest[dto.CreateHostel](r.Context())
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

	res, err := h.AdminService.CreateHostel(r.Context(), hostel)
	if err != nil {
		msg := "failed to create hostel"
		h.server.Logger.Err(err).Msg(msg)
		utils.WriteJSON(w, res)
		return
	}

	utils.WriteJSON(w, res)
}

func (h *AdminHandler) GetHostel(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")

	h.server.Logger.Debug().Msgf("get hostel: %s", id)

	res, err := h.AdminService.GetHostel(r.Context(), id)
	if err != nil {
		msg := "failed to get hostel"
		h.server.Logger.Err(err).Msg(msg)
		utils.WriteJSON(w, res)
		return
	}

	utils.WriteJSON(w, res)
}
