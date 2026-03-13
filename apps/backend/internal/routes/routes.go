package routes

import (
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/handlers"
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/server"
	"github.com/go-chi/chi/v5"
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

	r.Use(corsMiddleware.Handler)

	healthHandler := handlers.NewHealthHandler(s)
	r.Get("/health", healthHandler.CheckHealth)

	v1Router := chi.NewRouter()

	userHandler := handlers.NewUserHandler(s)

	v1Router.Get("/users", userHandler.GetUser)
	v1Router.Post("/users", userHandler.CreateUser)

	r.Mount("/api/v1", v1Router)
	return r
}
