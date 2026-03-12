package handlers

import (
	"net/http"

	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/dto"
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/server"
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/services"
)

type UserHandler struct {
	BaseHandler
	UserService services.UserService
}

func NewUserHandler(s *server.Server) UserHandler {
	return UserHandler{
		BaseHandler: BaseHandler{
			server: s,
		},
		UserService: services.NewUserService(s.DB, s.Logger),
	}
}

func (uh *UserHandler) GetAllUsers(w http.ResponseWriter, r *http.Request) {
	uh.UserService.GetAllUsers(r.Context())
	uh.server.Logger.Info().Msg("successfully fetched all users")
	uh.ReturnJSONResponse(w, dto.StructuredResponse{
		Success: true,
		Status:  200,
		Message: "found users",
		Payload: []string{"John", "Isaac"},
	})
}
