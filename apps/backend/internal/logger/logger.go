package logger

import (
	"io"
	"os"

	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/config"
	"github.com/rs/zerolog"
	"go.opentelemetry.io/contrib/bridges/otelzerolog"
)

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

	// otel hook
	otelHook := otelzerolog.NewHook(cfg.Observability.ServiceName)

	logger := zerolog.New(writer).
		With().
		Timestamp().
		Str("service", cfg.Observability.ServiceName).
		Str("environment", cfg.Primary.Env).
		Logger().
		Hook(otelHook)
	return logger
}
