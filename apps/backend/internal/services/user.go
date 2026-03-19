package services

import (
	"context"
	"database/sql"
	"errors"
	"net/http"

	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/dto"
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/repositories"
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/utils"
	"github.com/rs/zerolog"
	"go.opentelemetry.io/otel"
	"go.opentelemetry.io/otel/attribute"
)

var tracer = otel.Tracer("user-service")

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

func (us *UserService) Signup(ctx context.Context, u dto.CreateUserWithPasswordDto) (dto.StructuredResponse, error) {
	tracerCtx, span := tracer.Start(ctx, "UserService.Signup")
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

	return dto.StructuredResponse{
		Success: true,
		Status:  201,
		Message: "user signed up successfully",
		Payload: struct {
			ID       string `json:"id"`
			FullName string `json:"full_name"`
			Email    string `json:"email"`
		}{
			ID:       user.ID,
			FullName: user.FullName,
			Email:    user.Email,
		},
	}, nil
}

func (us *UserService) Login(ctx context.Context, u dto.LoginUserDto) (dto.StructuredResponse, error) {
	tracerCtx, span := tracer.Start(ctx, "UserService.Login")
	defer span.End()

	uc, err := us.userRepo.GetUserCredentialByProviderId(tracerCtx, u.Email)
	if err != nil {
		span.RecordError(err)
		return dto.StructuredResponse{
			Success: false,
			Status:  http.StatusNotFound,
			Message: "could not find user",
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

	return dto.StructuredResponse{
		Success: true,
		Status:  200,
		Message: "logged in user successfully",
		Payload: struct {
			ID       string `json:"id"`
			FullName string `json:"full_name"`
			Email    string `json:"email"`
			Provider string `json:"provider"`
		}{
			ID:       user.ID,
			FullName: user.FullName,
			Email:    user.Email,
			Provider: uc.Provider,
		},
	}, nil
}

func (us *UserService) GetUserByEmail(ctx context.Context, email string) dto.StructuredResponse {
	user, err := us.userRepo.GetUserByEmail(ctx, email)
	if err != nil {
		us.Logger.Err(err).Msg("could not fetch user")
		return dto.StructuredResponse{
			Success: false,
			Status:  http.StatusNotFound,
			Message: "could not fetch user",
			Payload: nil,
		}
	}
	return dto.StructuredResponse{
		Success: true,
		Status:  200,
		Message: "found all users",
		Payload: user,
	}
}
