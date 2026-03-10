package handlers

import (
	"net/http"

	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/dto"
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/utils"
)

func HealthHandler(w http.ResponseWriter, r *http.Request) {
	helloMessage := dto.HttpResponse{
		Success: true,
		Status:  200,
		Message: "server is healthy",
	}

	utils.ReturnJSONReponse(w, helloMessage)
}
