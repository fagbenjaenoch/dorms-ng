package config

import (
	"os"
	"strings"

	"github.com/go-playground/validator/v10"
	_ "github.com/joho/godotenv/autoload"
	"github.com/knadh/koanf/providers/env"
	"github.com/knadh/koanf/v2"
	"github.com/rs/zerolog"
)

type Config struct {
	Primary Primary `koanf:"primary" validate:"required"`
	Server  Server  `koanf:"server" validate:"required"`
	Logging Logging `koanf:"logging" validate:"required"`
}

type Primary struct {
	Env         string `koanf:"env" validate:"required"`
	ServiceName string `koanf:"servicename" validate:"required"`
}

type Server struct {
	Port               string   `koanf:"port" validate:"required"`
	ReadTimeout        int      `koanf:"read_timeout" validate:"required"`
	WriteTimeout       int      `koanf:"write_timeout" validate:"required"`
	IdleTimeout        int      `koanf:"idle_timeout" validate:"required"`
	CORSAllowedOrigins []string `koanf:"cors_allowed_origins" validate:"required"`
}

type Logging struct {
	Format string `koanf:"format" validate:"required"`
}

func LoadConfig() (*Config, error) {
	logger := zerolog.New(zerolog.ConsoleWriter{Out: os.Stdout}).With().Timestamp().Logger()

	k := koanf.New(".")

	err := k.Load(env.Provider("APP_", ".", func(s string) string {
		return strings.ToLower(strings.TrimPrefix(s, "APP_"))
	}), nil)
	if err != nil {
		logger.Fatal().Err(err).Msg("failed to load config")
	}

	var cfg Config
	if err := k.Unmarshal("", &cfg); err != nil {
		logger.Fatal().Err(err).Msg("failed to unmarshal config")
	}

	validator := validator.New()
	if err := validator.Struct(cfg); err != nil {
		logger.Fatal().Err(err).Msg("failed to validate config")
	}

	return &cfg, nil
}
