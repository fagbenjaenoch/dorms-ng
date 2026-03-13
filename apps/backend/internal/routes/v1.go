package routes

import (
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/handlers"
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/server"
	"github.com/go-chi/chi/v5"
)

func RegisterV1Routes(s *server.Server) *chi.Mux {
	v1Router := chi.NewRouter()

	userHandler := handlers.NewUserHandler(s)

	v1Router.Get("/users", userHandler.GetUser)
	v1Router.Post("/users", userHandler.CreateUser)

	return v1Router
}
