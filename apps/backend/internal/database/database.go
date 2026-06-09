package database

import (
	"database/sql"

	"github.com/XSAM/otelsql"
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/config"
	_ "github.com/mattn/go-sqlite3"
	"github.com/rs/zerolog"
	"go.opentelemetry.io/otel/metric"
	semconv "go.opentelemetry.io/otel/semconv/v1.37.0"
)

func New(config *config.Config, logger *zerolog.Logger) (*sql.DB, metric.Registration, error) {
	db, err := otelsql.Open("sqlite3", config.DB.URI, otelsql.WithAttributes(
		semconv.DBSystemNameSQLite,
		semconv.DBNamespace("data.db"),
	),
	)
	if err != nil {
		return nil, nil, err
	}

	reg, err := otelsql.RegisterDBStatsMetrics(db, otelsql.WithAttributes(
		semconv.DBSystemNameSQLite,
		semconv.DBNamespace("data.db"),
	))
	if err != nil {
		return nil, nil, err
	}

	if err := db.Ping(); err != nil {
		return nil, reg, err
	}
	logger.Info().Msg("database setup successfully")

	return db, reg, nil
}

func Close(db *sql.DB) error {
	return db.Close()
}
