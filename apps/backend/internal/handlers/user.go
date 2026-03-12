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

func (uh *UserHandler) CreateUser(w http.ResponseWriter, r *http.Request) {
	var u dto.CreateUserDto
	uh.DecodeJSONBody(w, r, &u)

	uh.server.Logger.Debug().Str("email", u.Email)
	res := uh.UserService.CreateUser(r.Context(), u)

	uh.server.Logger.Info().Msg("successfully created user")
	uh.ReturnJSONResponse(w, res)
}

func (uh *UserHandler) GetUser(w http.ResponseWriter, r *http.Request) {
	var u dto.GetUserDto
	uh.DecodeJSONBody(w, r, &u)

	uh.server.Logger.Debug().Str("email", u.Email)
	res := uh.UserService.GetUserByEmail(r.Context(), u.Email)

	uh.server.Logger.Info().Msg("successfully fetched all users")
	uh.ReturnJSONResponse(w, res)
}
