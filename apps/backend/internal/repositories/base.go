package repositories

import (
	"database/sql"

	"github.com/rs/zerolog"
)

type BaseRepository struct {
	DB     *sql.DB
	Logger *zerolog.Logger
}
