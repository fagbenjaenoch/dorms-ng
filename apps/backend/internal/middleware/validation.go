package middleware

import (
	"context"
	"net/http"

	"github.com/fagbenjaenoch/dorms-ng/internal/dto"
	"github.com/fagbenjaenoch/dorms-ng/internal/utils"
	"github.com/go-playground/validator/v10"
	"go.opentelemetry.io/otel/attribute"
)

var validate = validator.New()

func ValidateRequestPayload[T any](next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		tracerCtx, span := tracer.Start(r.Context(), "validation.validate_request_payload")
		defer span.End()

		var payload T
		if err := utils.DecodeJSONBody(w, r, &payload); err != nil {
			return
		}

		if err := validate.Struct(payload); err != nil {
			errors := utils.FormatValidationErrors(err)
			span.RecordError(err.(validator.ValidationErrors))

			utils.WriteJSON(w, dto.StructuredResponse{
				Success: false,
				Status:  http.StatusUnprocessableEntity,
				Message: "Invalid request payload",
				Payload: errors,
			})
			return
		}

		span.SetAttributes(attribute.Bool("validated", true))

		ctx := context.WithValue(tracerCtx, utils.ValidatedPayloadKey, payload)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
