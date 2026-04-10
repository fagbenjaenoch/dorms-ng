package services

import (
	"context"
	"database/sql"
	"errors"
	"net/http"
	"time"

	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/auth"
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/config"
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/dto"
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/repositories"
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/utils"
	"github.com/rs/zerolog"
	"go.opentelemetry.io/otel"
	"go.opentelemetry.io/otel/attribute"
)

var userTracer = otel.Tracer("user_service")

type UserService struct {
	userRepo repositories.UserRepository
	Logger   *zerolog.Logger
}

func NewUserService(db *sql.DB, logger *zerolog.Logger) UserService {
	return UserService{
		userRepo: repositories.NewUserRepository(db, logger),
		Logger:   logger,
	}
}

func (us *UserService) Signup(ctx context.Context, u dto.CreateUserWithPassword) (dto.StructuredResponse, error) {
	tracerCtx, span := userTracer.Start(ctx, "Signup")
	defer span.End()

	userExists, err := us.userRepo.UserExists(tracerCtx, u.Email)
	if err != nil {
		span.RecordError(err)
		span.SetStatus(http.StatusInternalServerError, "check user exists error")
		return dto.StructuredResponse{
			Success: false,
			Status:  http.StatusInternalServerError,
			Message: "could not check user exists",
			Payload: nil,
		}, err
	}

	if userExists {
		span.SetStatus(http.StatusConflict, "user already exists")

		return dto.StructuredResponse{
			Success: false,
			Status:  http.StatusConflict,
			Message: "user already exists",
			Payload: nil,
		}, err
	}

	user, err := us.userRepo.CreateUserWithPassword(tracerCtx, u)
	if err != nil {
		span.RecordError(err)
		span.SetStatus(http.StatusInternalServerError, "create user db error")

		return dto.StructuredResponse{
			Success: false,
			Status:  http.StatusInternalServerError,
			Message: "could not create user",
			Payload: nil,
		}, err
	}

	span.SetStatus(http.StatusCreated, "successfully created user")

	params := auth.GenerateJWTParams{
		Email:      user.Email,
		FullName:   user.FullName,
		AppName:    config.GetGlobalConfig().Observability.AppName,
		Expiration: time.Duration(time.Hour * 100), // arbitrary for now
		Secret:     config.GetGlobalConfig().Auth.JWTSecret,
	}
	tokenString, err := auth.GenerateJWT(params)
	if err != nil {
		span.RecordError(err)
		return dto.StructuredResponse{
			Success: false,
			Status:  http.StatusInternalServerError,
			Message: "could not generate token",
			Payload: nil,
		}, err
	}

	return dto.StructuredResponse{
		Success: true,
		Status:  201,
		Message: "user signed up successfully",
		Payload: dto.CreateUserPayload{
			ID:       user.ID,
			FullName: user.FullName,
			Email:    user.Email,
			Token:    tokenString,
		},
	}, nil
}

func (us *UserService) Login(ctx context.Context, u dto.LoginUser) (dto.StructuredResponse, error) {
	tracerCtx, span := userTracer.Start(ctx, "Login")
	defer span.End()

	uc, err := us.userRepo.GetUserCredentialByProviderId(tracerCtx, u.Email)
	if err != nil {
		span.RecordError(err)
		return dto.StructuredResponse{
			Success: false,
			Status:  http.StatusNotFound,
			Message: "user does not exist",
			Payload: nil,
		}, err
	}

	if match := utils.ComparePassword(u.Password, uc.PasswordHash.String); !match {
		span.RecordError(errors.New("invalid password"))
		return dto.StructuredResponse{
			Success: false,
			Status:  http.StatusUnauthorized,
			Message: "invalid credentials",
			Payload: nil,
		}, errors.New("invalid credentials")
	}

	user, err := us.userRepo.GetUserByEmail(tracerCtx, u.Email)
	if err != nil {
		span.RecordError(err)
		return dto.StructuredResponse{
			Success: false,
			Status:  http.StatusNotFound,
			Message: "could not find user",
			Payload: nil,
		}, err
	}

	span.SetAttributes(attribute.String("user_id", u.Email))
	span.SetStatus(http.StatusOK, "successfully logged in user")

	params := auth.GenerateJWTParams{
		Email:      user.Email,
		FullName:   user.FullName,
		AppName:    config.GetGlobalConfig().Observability.AppName,
		Expiration: time.Duration(time.Hour * 100), // arbitrary for now
		Secret:     config.GetGlobalConfig().Auth.JWTSecret,
	}
	tokenString, err := auth.GenerateJWT(params)
	if err != nil {
		span.RecordError(err)
		return dto.StructuredResponse{
			Success: false,
			Status:  http.StatusInternalServerError,
			Message: "could not generate token",
			Payload: nil,
		}, err
	}

	return dto.StructuredResponse{
		Success: true,
		Status:  200,
		Message: "logged in user successfully",
		Payload: dto.LoginPayload{
			CreateUserPayload: dto.CreateUserPayload{
				ID:       user.ID,
				FullName: user.FullName,
				Email:    user.Email,
				Token:    tokenString,
			},
			Provider: uc.Provider,
		},
	}, nil
}

func (us *UserService) GetUserByEmail(ctx context.Context, email string) (dto.StructuredResponse, error) {
	user, err := us.userRepo.GetUserByEmail(ctx, email)
	if err != nil {
		msg := "could not fetch user"
		us.Logger.Err(err).Msg(msg)
		return dto.StructuredResponse{
			Success: false,
			Status:  http.StatusNotFound,
			Message: msg,
			Payload: nil,
		}, errors.New(msg)
	}

	return dto.StructuredResponse{
		Success: true,
		Status:  200,
		Message: "found user",
		Payload: user,
	}, nil
}
