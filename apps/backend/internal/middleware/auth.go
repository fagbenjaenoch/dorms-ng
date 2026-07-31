package middleware

import (
	"context"
	"errors"
	"net/http"
	"strings"

	"github.com/fagbenjaenoch/dorms-ng/internal/auth"
	"github.com/fagbenjaenoch/dorms-ng/internal/config"
	"github.com/fagbenjaenoch/dorms-ng/internal/dto"
	"github.com/fagbenjaenoch/dorms-ng/internal/utils"
	"go.opentelemetry.io/otel/attribute"
)

func RequireAuth(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		tracerCtx, span := tracer.Start(r.Context(), "auth")
		defer span.End()

		authHeader := r.Header.Get("Authorization")
		if authHeader == "" || !strings.HasPrefix(authHeader, "Bearer") {
			msg := "missing or invalid authorization header"
			span.RecordError(errors.New(msg))
			utils.WriteJSON(w, dto.StructuredResponse{
				Success: false,
				Status:  http.StatusUnauthorized,
				Message: msg,
			})

			return
		}

		tokenString := strings.TrimPrefix(authHeader, "Bearer ")
		token, err := auth.ParseJWT(tokenString, config.GetGlobalConfig().Auth.JWTSecret)
		if err != nil {
			span.RecordError(err)
			utils.WriteJSON(w, dto.StructuredResponse{
				Success: false,
				Status:  http.StatusUnauthorized,
				Message: "invalid auth token",
			})

			return
		}

		span.SetAttributes(attribute.String("user", token.Subject))

		ctx := context.WithValue(tracerCtx, utils.JWTClaimsKey, token)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
