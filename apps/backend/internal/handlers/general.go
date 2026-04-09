package handlers

import (
	"net/http"

	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/server"
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/services"
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/utils"
)

const SearchParam = "search"

type GeneralHandler struct {
	BaseHandler
	SearchService services.SearchService
}

func NewGeneralHandler(s *server.Server) *GeneralHandler {
	return &GeneralHandler{
		BaseHandler: BaseHandler{
			server: s,
		},
		SearchService: services.NewSearchService(s.DB, s.Logger),
	}
}

func (gh *GeneralHandler) Search(w http.ResponseWriter, r *http.Request) {
	q := r.URL.Query().Get(SearchParam)

	res, err := gh.SearchService.Search(r.Context(), q)
	if err != nil {
		utils.WriteJSON(w, res)
		return
	}

	utils.WriteJSON(w, res)
}
