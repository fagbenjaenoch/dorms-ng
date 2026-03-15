package utils

import (
	"context"
	"encoding/json"
	pkgError "errors"
	"fmt"
	"net/http"
	"os"
	"strings"

	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/dto"
	"github.com/go-playground/validator/v10"
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

type ValidationError struct {
	Field   string `json:"field"`
	Message string `json:"message"`
}

type ErrorResponse struct {
	Errors []ValidationError `json:"errors"`
}

func FormatValidationErrors(err error) ErrorResponse {
	var errors []ValidationError
	var validationErrors validator.ValidationErrors

	if pkgError.As(err, &validationErrors) {
		for _, e := range validationErrors {
			var message string

			// Create human-readable messages based on the tag
			switch e.Tag() {
			case "required":
				message = fmt.Sprintf("%s is required", strings.ToLower(e.Field()))
			case "email":
				message = fmt.Sprintf("%s must be a valid email", strings.ToLower(e.Field()))
			case "min":
				message = fmt.Sprintf("%s must be at least %s characters", strings.ToLower(e.Field()), e.Param())
			case "max":
				message = fmt.Sprintf("%s must be at most %s characters", strings.ToLower(e.Field()), e.Param())
			case "oneof":
				message = fmt.Sprintf("%s must be one of: %q", strings.ToLower(e.Field()), e.Param())
			default:
				message = fmt.Sprintf("%s is invalid", strings.ToLower(e.Field()))
			}

			errors = append(errors, ValidationError{
				Field:   strings.ToLower(e.Field()),
				Message: message,
			})
		}
	}

	return ErrorResponse{
		Errors: errors,
	}
}
