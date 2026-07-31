package routes

import (
	"fmt"
	"net/http"
	"time"

	"github.com/fagbenjaenoch/dorms-ng/internal/handlers"
	"github.com/fagbenjaenoch/dorms-ng/internal/middleware"
	"github.com/fagbenjaenoch/dorms-ng/internal/server"
	"github.com/fagbenjaenoch/dorms-ng/internal/utils"
	"github.com/go-chi/chi/v5"
	chiMiddleware "github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/httprate"
	"github.com/riandyrn/otelchi"
	"github.com/rs/cors"
)

func New(s *server.Server) *chi.Mux {
	r := chi.NewRouter()

	corsMiddleware := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"*"},
		AllowCredentials: true,
		MaxAge:           300,
	})

	// global middleware
	r.Use(chiMiddleware.RequestID)
	r.Use(chiMiddleware.RealIP)
	r.Use(middleware.RequestLogger(s.Logger))
	r.Use(corsMiddleware.Handler)
	r.Use(httprate.LimitByIP(100, 1*time.Minute))
	r.Use(chiMiddleware.Recoverer)

	// initialize observability middleware
	r.Use(otelchi.Middleware(
		s.Config.Observability.AppName,
		otelchi.WithChiRoutes(r),
		otelchi.WithFilter(utils.SkipTelemetry),
	),
	)

	// main business
	healthHandler := handlers.NewHealthHandler(s)
	r.Get("/health", healthHandler.CheckHealth)

	v1Router := RegisterV1Routes(s)
	r.Mount("/api/v1", v1Router)

	// Walk the router to log all routes
	PrintRoutes(r)

	return r
}

func PrintRoutes(r *chi.Mux) {
	walkFunc := func(method string, route string, handler http.Handler, middlewares ...func(http.Handler) http.Handler) error {
		fmt.Printf("Method: %-7s Route: %s\n", method, route)
		return nil
	}

	if err := chi.Walk(r, walkFunc); err != nil {
		fmt.Printf("Logging err: %s\n", err.Error())
	}
}
