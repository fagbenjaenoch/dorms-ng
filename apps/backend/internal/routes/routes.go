package routes

import (
	"net/http"

	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/handlers"
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/server"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func New(s *server.Server) *mux.Router {
	router := mux.NewRouter()

	healthHandler := handlers.NewHealthHandler(s)
	router.HandleFunc("/health", healthHandler.CheckHealth).Methods(http.MethodGet)

	corsMiddleware := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"*"},
		AllowCredentials: true,
		MaxAge:           300,
	})

	router.Use(corsMiddleware.Handler)
	return router
}
