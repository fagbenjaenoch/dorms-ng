package handlers

import (
	"net/http"

	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/dto"
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/middleware"
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/server"
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/services"
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/utils"
	"github.com/go-chi/chi/v5"
)

type HostelHandler struct {
	BaseHandler
	service *services.HostelService
}

func NewHostelHandler(s *server.Server) HostelHandler {
	return HostelHandler{
		BaseHandler: BaseHandler{
			server: s,
		},
		service: services.NewHostelService(s.DB, s.Logger),
	}
}

func (h *HostelHandler) CreateHostel(w http.ResponseWriter, r *http.Request) {
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

	res, err := h.service.CreateHostel(r.Context(), hostel)
	if err != nil {
		msg := "failed to create hostel"
		h.server.Logger.Err(err).Msg(msg)
		utils.WriteJSON(w, res)
		return
	}

	utils.WriteJSON(w, res)
}

func (h *HostelHandler) GetHostel(w http.ResponseWriter, r *http.Request) {
	slug := chi.URLParam(r, "slug")

	h.server.Logger.Debug().Msgf("get hostel: %s", slug)

	res, err := h.service.GetHostel(r.Context(), slug)
	if err != nil {
		msg := "failed to get hostel"
		h.server.Logger.Err(err).Msg(msg)
		utils.WriteJSON(w, res)
		return
	}

	utils.WriteJSON(w, res)
}

func (h *HostelHandler) SearchHostels(w http.ResponseWriter, r *http.Request) {
	typ := r.URL.Query().Get(utils.AreaTypeParam.String())
	id := r.URL.Query().Get(utils.AreaParam.String())
	pagination := middleware.GetPaginationParams(r.Context())

	h.server.Logger.Debug().
		Str("typ", typ).
		Str("id", id).
		Int("page", pagination.Page).
		Str("sortBy", hostelFilters.SortBy).
		Int("minPrice", hostelFilters.MinPrice).
		Int("maxPrice", hostelFilters.MaxPrice).
		Msg("searching hostels")

	res, err := h.service.SearchHostels(r.Context(), typ, id, hostelFilters, pagination)
	if err != nil {
		msg := "failed to search hostels"
		h.server.Logger.Err(err).Msg(msg)
		utils.WriteJSON(w, res)
		return
	}

	utils.WriteJSON(w, res)
}
