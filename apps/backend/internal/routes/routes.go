package routes

import (
	"net/http"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func New() *mux.Router {
	router := mux.NewRouter()

	router.HandleFunc("/health").Methods(http.MethodGet)

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
