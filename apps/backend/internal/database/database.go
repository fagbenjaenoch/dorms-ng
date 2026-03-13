package database

import (
	"database/sql"

	"github.com/XSAM/otelsql"
	_ "github.com/mattn/go-sqlite3"
	"github.com/rs/zerolog"
	"go.opentelemetry.io/otel/metric"
	semconv "go.opentelemetry.io/otel/semconv/v1.37.0"
)

func New(logger *zerolog.Logger) (*sql.DB, metric.Registration, error) {
	db, err := otelsql.Open("sqlite3", "./internal/database/data.db", otelsql.WithAttributes(
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
