package logger

import (
	"io"
	"os"

	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/config"
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/utils"
	"github.com/rs/zerolog"
	"go.opentelemetry.io/contrib/bridges/otelzerolog"
)

var globalLogger zerolog.Logger

func New(cfg *config.Config) zerolog.Logger {
	var writer io.Writer
	writer = os.Stdout //default writer

	logFormat := cfg.Logging.Format
	if logFormat == "console" {
		writer = zerolog.ConsoleWriter{
			Out:        os.Stdout,
			TimeFormat: "2006-01-02 15:04:05",
			FieldsOrder: []string{ // for request logging
				"remote_addr",
				"method",
				"path",
				"duration",
				"environment",
				"service",
			},
		}
	}

	if utils.IsProduction() {
		// otel hook
		otelHook := otelzerolog.NewHook(cfg.Observability.AppName)

		logger := zerolog.New(writer).
			With().
			Timestamp().
			Str("service", cfg.Observability.AppName).
			Str("environment", cfg.Primary.Env).
			Logger().
			Hook(otelHook)

		globalLogger = logger
	} else {
		logger := zerolog.New(writer).
			With().
			Timestamp().
			Str("service", cfg.Observability.AppName).
			Str("environment", cfg.Primary.Env).
			Logger()

		globalLogger = logger
	}

	return globalLogger
}

func GetGlobalLogger() *zerolog.Logger {
	return &globalLogger
}
