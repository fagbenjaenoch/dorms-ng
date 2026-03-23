package handlers

import (
	"net/http"

	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/dto"
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/server"
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/services"
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/utils"
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

func (uh *UserHandler) Signup(w http.ResponseWriter, r *http.Request) {
	u, err := utils.GetValidatedPayloadFromRequest[dto.CreateUserWithPasswordDto](r.Context())
	if err != nil {
		msg := "failed to process request body"
		uh.server.Logger.Err(err).Msg(msg)
		uh.WriteJSON(w, dto.StructuredResponse{
			Success: false,
			Status:  http.StatusInternalServerError,
			Message: msg,
			Payload: nil,
		})
		return
	}

	uh.server.Logger.Debug().Str("email", u.Email)
	res, err := uh.UserService.Signup(r.Context(), u)
	if err != nil {
		msg := "failed to create user"
		uh.server.Logger.Err(err).Msg(msg)
		uh.WriteJSON(w, res)
		return
	}

	uh.server.Logger.Info().Msg("successfully created user")
	uh.WriteJSON(w, res)
}

func (uh *UserHandler) LoginUser(w http.ResponseWriter, r *http.Request) {
	u, err := utils.GetValidatedPayloadFromRequest[dto.LoginUserDto](r.Context())
	if err != nil {
		msg := "failed to process request body"
		uh.server.Logger.Err(err).Msg(msg)
		uh.WriteJSON(w, dto.StructuredResponse{
			Success: false,
			Status:  http.StatusUnprocessableEntity,
			Message: msg,
			Payload: nil,
		})
		return
	}

	res, err := uh.UserService.Login(r.Context(), u)
	if err != nil {
		msg := "failed to login user"
		uh.server.Logger.Err(err).Msg(msg)
		uh.WriteJSON(w, res)
		return
	}

	uh.server.Logger.Info().Msg("successfully logged in user")
	uh.WriteJSON(w, res)
}

func (uh *UserHandler) GetUserProfile(w http.ResponseWriter, r *http.Request) {
	claims := r.Context().Value(utils.JWTClaimsKey).(*utils.JWTClaims)
	email := claims.Subject

	uh.server.Logger.Debug().Str("email", email).Send()
	res, err := uh.UserService.GetUserByEmail(r.Context(), email)
	if err != nil {
		uh.WriteJSON(w, res)
		return
	}

	uh.server.Logger.Info().Msg("successfully fetched user profile")
	uh.WriteJSON(w, res)
}
