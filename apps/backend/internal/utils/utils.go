package utils

import (
	"encoding/json"
	"net/http"

	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/dto"
)

func ReturnJSONReponse(w http.ResponseWriter, response dto.HttpResponse) {
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
