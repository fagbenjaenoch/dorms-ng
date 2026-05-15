package routes

import (
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/dto"
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/handlers"
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/middleware"
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/server"
	"github.com/go-chi/chi/v5"
)

func RegisterV1Routes(s *server.Server) *chi.Mux {
	v1Router := chi.NewRouter()

	// user routes
	userHandler := handlers.NewUserHandler(s)

	v1Router.With(middleware.ValidateRequestPayload[dto.CreateUserWithPassword]).Post("/signup", userHandler.Signup)
	v1Router.With(middleware.ValidateRequestPayload[dto.LoginUser]).Post("/login", userHandler.LoginUser)
	v1Router.With(middleware.RequireAuth).Get("/profile", userHandler.GetUserProfile)

	// admin routes
	adminHandler := handlers.NewAdminHandler(s)

	// hostel routes
	v1Router.Get("/hostels/{slug}", adminHandler.GetHostel)
	v1Router.With(middleware.ValidateRequestPayload[dto.CreateHostel]).Post("/hostels", adminHandler.CreateHostel)
	v1Router.Get("/hostels/search", adminHandler.SearchHostels)

	// institution routes
	v1Router.Get("/institutions", adminHandler.GetAllInstitutions)
	v1Router.Get("/institutions/{slug}", adminHandler.GetInstitution)
	v1Router.With(middleware.ValidateRequestPayload[dto.CreateInstitution]).Post("/institutions", adminHandler.CreateInstitution)

	// neighborhood routes
	v1Router.Get("/neighborhoods", adminHandler.GetAllNeighborhoods)
	v1Router.With(middleware.ValidateRequestPayload[dto.CreateNeighborhood]).Post("/neighborhoods", adminHandler.CreateNeighborhood)

	// upload route
	uploadHandler := handlers.NewUploadHandler(s)
	v1Router.With(middleware.ValidateRequestPayload[dto.PresignedURLRequest]).Post("/presigned-url", uploadHandler.GetPresignedURL)

	// general routes
	generalHandler := handlers.NewGeneralHandler(s)

	v1Router.Get("/search", generalHandler.Search)
	v1Router.Get("/search/places", generalHandler.SearchPlaces)

	return v1Router
}
