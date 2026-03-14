package utils

import (
	"context"
	"encoding/json"
	"net/http"
	"os"

	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/dto"
)

type contextKey string

const (
	ValidatedPayloadKey contextKey = "validated_payload"
)

func IsProduction() bool {
	return os.Getenv("ENV") == "production"
}

func ReturnJSONResponse(w http.ResponseWriter, response dto.StructuredResponse) {
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

func DecodeJSONBody(w http.ResponseWriter, r *http.Request, body any) error {
	if err := json.NewDecoder(r.Body).Decode(body); err != nil {
		ReturnJSONResponse(w, dto.StructuredResponse{
			Success: false,
			Status:  http.StatusBadRequest,
			Message: err.Error(),
		})
		return err
	}
	defer r.Body.Close()

	return nil
}

func GetValidatedPayloadFromRequest[T any](ctx context.Context) T {
	return ctx.Value(ValidatedPayloadKey).(T)
}
