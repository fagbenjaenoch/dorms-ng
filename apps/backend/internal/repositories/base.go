package repositories

import (
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/database/models"
	"github.com/rs/zerolog"
)

type BaseRepository struct {
	Queries *models.Queries
	Logger  *zerolog.Logger
}
