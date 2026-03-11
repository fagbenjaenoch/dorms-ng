package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/dto"
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/server"
)

type BaseHandler struct {
	server *server.Server
}

func (h *BaseHandler) ReturnJSONResponse(w http.ResponseWriter, response dto.StructuredResponse) {
	responseJSON, err := json.Marshal(response)

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("Internal Server Error"))
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(response.Status)
	w.Write(responseJSON)
}

func (h *BaseHandler) DecodeJSONBody(w http.ResponseWriter, r *http.Request, body any) {
	if err := json.NewDecoder(r.Body).Decode(body); err != nil {
		h.server.Logger.Err(err).Msg("failed to decode request body")
		h.ReturnJSONResponse(w, dto.StructuredResponse{
			Success: false,
			Status:  http.StatusBadRequest,
			Message: err.Error(),
		})
	}
	defer r.Body.Close()
}
