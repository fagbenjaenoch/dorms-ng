package repositories

import (
	"github.com/fagbenjaenoch/dorms-ng/internal/database/models"
	"github.com/rs/zerolog"
)

type BaseRepository struct {
	Queries *models.Queries
	Logger  *zerolog.Logger
}
