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
	slug := chi.URLParam(r, "slug")

	h.server.Logger.Debug().Msgf("get hostel: %s", slug)

	res, err := h.AdminService.GetHostel(r.Context(), slug)
	if err != nil {
		msg := "failed to get hostel"
		h.server.Logger.Err(err).Msg(msg)
		utils.WriteJSON(w, res)
		return
	}

	utils.WriteJSON(w, res)
}

func (h *AdminHandler) SearchHostels(w http.ResponseWriter, r *http.Request) {
	typ := r.URL.Query().Get(utils.TypeParam.String())
	id := r.URL.Query().Get(utils.IdParam.String())

	h.server.Logger.Debug().Str("typ", typ).Str("id", id).Msg("search hostels")

	res, err := h.AdminService.SearchHostels(r.Context(), typ, id)
	if err != nil {
		msg := "failed to search hostels"
		h.server.Logger.Err(err).Msg(msg)
		utils.WriteJSON(w, res)
		return
	}

	utils.WriteJSON(w, res)
}

func (h *AdminHandler) GetInstitution(w http.ResponseWriter, r *http.Request) {
	slug := chi.URLParam(r, "slug")

	h.server.Logger.Debug().Msgf("get institution: %s", slug)

	res, err := h.AdminService.GetInstitution(r.Context(), slug)
	if err != nil {
		msg := "failed to get institution"
		h.server.Logger.Err(err).Msg(msg)
		utils.WriteJSON(w, res)
		return
	}

	utils.WriteJSON(w, res)
}

func (h *AdminHandler) GetAllInstitutions(w http.ResponseWriter, r *http.Request) {
	res, err := h.AdminService.GetAllInstitutions(r.Context())
	if err != nil {
		msg := "failed to get all institutions"
		h.server.Logger.Err(err).Msg(msg)
		utils.WriteJSON(w, res)
		return
	}

	utils.WriteJSON(w, res)
}

func (h *AdminHandler) CreateNeighborhood(w http.ResponseWriter, r *http.Request) {
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

	res, err := h.AdminService.CreateNeighborhood(r.Context(), neighborhood)
	if err != nil {
		msg := "failed to create neighborhood"
		h.server.Logger.Err(err).Msg(msg)
		utils.WriteJSON(w, res)
		return
	}

	utils.WriteJSON(w, res)
}

func (h *AdminHandler) GetAllNeighborhoods(w http.ResponseWriter, r *http.Request) {
	res, err := h.AdminService.GetAllNeighborhoods(r.Context())
	if err != nil {
		msg := "failed to get all neighborhoods"
		h.server.Logger.Err(err).Msg(msg)
		utils.WriteJSON(w, res)
		return
	}

	utils.WriteJSON(w, res)
}
