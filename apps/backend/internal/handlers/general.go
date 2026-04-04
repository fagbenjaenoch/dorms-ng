package handlers

import (
	"net/http"

	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/dto"
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/server"
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/utils"
	"github.com/go-chi/chi/v5"
)

const SearchParam = "q"

type GeneralHandler struct {
	BaseHandler
}

func NewGeneralHandler(s *server.Server) *GeneralHandler {
	return &GeneralHandler{
		BaseHandler: BaseHandler{
			server: s,
		},
	}
}

func (gh *GeneralHandler) Search(w http.ResponseWriter, r *http.Request) {
	q := chi.URLParam(r, SearchParam)

	gh.server.Logger.Debug().Str("query param", q).Send()

	utils.WriteJSON(w, dto.StructuredResponse{
		Success: true,
		Status:  http.StatusNoContent,
	})
}
