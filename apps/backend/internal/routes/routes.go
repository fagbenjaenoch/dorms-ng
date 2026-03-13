package routes

import (
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/handlers"
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/middleware"
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/server"
	"github.com/go-chi/chi/v5"
	chiMiddleware "github.com/go-chi/chi/v5/middleware"
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
	r.Use(chiMiddleware.RealIP)
	r.Use(middleware.RequestLogger(s.Logger))
	r.Use(corsMiddleware.Handler)
	r.Use(chiMiddleware.Recoverer)

	healthHandler := handlers.NewHealthHandler(s)
	r.Get("/health", healthHandler.CheckHealth)

	v1Router := chi.NewRouter()

	userHandler := handlers.NewUserHandler(s)

	v1Router.Get("/users", userHandler.GetUser)
	v1Router.Post("/users", userHandler.CreateUser)

	r.Mount("/api/v1", v1Router)
	return r
}
