package handlers

import (
	"net/http"

	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/dto"
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/server"
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/services"
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/storage"
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/utils"
)

type UploadHandler struct {
	BaseHandler
	UploadService services.UploadService
}

func NewUploadHandler(s *server.Server) *UploadHandler {
	r2 := storage.GetR2Client()

	return &UploadHandler{
		BaseHandler:   BaseHandler{server: s},
		UploadService: services.NewUploadService(r2, s.Logger),
	}
}

func (h *UploadHandler) GetPresignedURL(w http.ResponseWriter, r *http.Request) {
	req, err := utils.GetValidatedPayloadFromRequest[dto.PresignedURLRequest](r.Context())
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

	key := utils.GeneratePresignedURLKey(req.EntityName, req.EntityType, req.FileName)

	res, err := h.UploadService.GetPresignedURL(r.Context(), key)
	if err != nil {
		msg := "failed to get presigned url"
		h.server.Logger.Err(err).Msg(msg)
		utils.WriteJSON(w, res)
		return
	}

	utils.WriteJSON(w, res)
}
