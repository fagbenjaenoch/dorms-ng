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

	// hostel routes
	hostelHandler := handlers.NewHostelHandler(s)
	v1Router.Get("/hostels/{slug}", hostelHandler.GetHostel)
	v1Router.With(middleware.ValidateRequestPayload[dto.CreateHostel]).Post("/hostels", hostelHandler.CreateHostel)
	v1Router.With(middleware.HostelFilter, middleware.Pagination).Get("/hostels/search", hostelHandler.SearchHostels)

	// institution routes
	institutionHandler := handlers.NewInstitutionHandler(s)
	v1Router.Get("/institutions", institutionHandler.GetAllInstitutions)
	v1Router.Get("/institutions/{slug}", institutionHandler.GetInstitution)
	v1Router.With(middleware.ValidateRequestPayload[dto.CreateInstitution]).Post("/institutions", institutionHandler.CreateInstitution)

	// neighborhood routes
	neighborhoodHandler := handlers.NewNeighborhoodHandler(s)
	v1Router.Get("/neighborhoods", neighborhoodHandler.GetAllNeighborhoods)
	v1Router.With(middleware.ValidateRequestPayload[dto.CreateNeighborhood]).Post("/neighborhoods", neighborhoodHandler.CreateNeighborhood)

	// upload route
	uploadHandler := handlers.NewUploadHandler(s)
	v1Router.With(middleware.ValidateRequestPayload[dto.PresignedURLRequest]).Post("/presigned-url", uploadHandler.GetPresignedURL)

	// general routes
	generalHandler := handlers.NewGeneralHandler(s)

	v1Router.Get("/search", generalHandler.Search)
	v1Router.Get("/search/places", generalHandler.SearchPlaces)

	return v1Router
}
