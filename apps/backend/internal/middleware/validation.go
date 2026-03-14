package middleware

import (
	"context"
	"net/http"

	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/dto"
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/utils"
	"github.com/go-playground/validator/v10"
)

var validate = validator.New()

func ValidateRequestPayload[T any](next http.Handler) http.Handler {

	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		var payload T
		if err := utils.DecodeJSONBody(w, r, &payload); err != nil {
			return
		}

		if err := validate.Struct(payload); err != nil {
			utils.ReturnJSONResponse(w, dto.StructuredResponse{
				Success: false,
				Status:  http.StatusUnprocessableEntity,
				Message: "Invalid request payload",
				Payload: err,
			})
			return
		}

		ctx := context.WithValue(r.Context(), utils.ValidatedPayloadKey, payload)
		r = r.WithContext(ctx)

		next.ServeHTTP(w, r)
	})
}
