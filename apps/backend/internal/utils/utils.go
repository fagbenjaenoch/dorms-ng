package utils

import (
	"crypto/sha1"
	"encoding/base64"
	pkgError "errors"
	"fmt"
	"net/http"
	"os"
	"strings"

	"github.com/go-playground/validator/v10"
)

type contextKey string

const (
	ValidatedPayloadKey contextKey = "validated_payload"
	JWTClaimsKey        contextKey = "jwt_claims"
	PasswordProviderKey string     = "password"
)

func IsProduction() bool {
	return os.Getenv("ENV") == "production"
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

func GeneratePresignedURLKey(entityName, entityType string) string {
	nameHash := GenerateHash(entityName)
	return fmt.Sprintf("%s/%s/%s", strings.ToLower(entityType), strings.ToLower(strings.ReplaceAll(entityName, " ", "-")), nameHash)
}

func GenerateSlug(stringInput ...string) string {
	var slug string
	for _, s := range stringInput {
		slug += strings.ToLower(strings.ReplaceAll(s, " ", "-")) + "-"
	}
	return strings.TrimRight(slug, "-")
}

func GenerateHash(input string) string {
	h := sha1.New()
	h.Write([]byte(input))
	return base64.RawURLEncoding.Strict().EncodeToString(h.Sum(nil))
}

func SkipTelemetry(r *http.Request) bool {
	if r.URL.Path == "/health" || r.URL.Path == "/metrics" {
		return false
	}

	if strings.HasPrefix(r.URL.Path, "/docs/") {
		return false
	}

	return true
}
