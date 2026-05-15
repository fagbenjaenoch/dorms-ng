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

var globalConfig *Config

type Config struct {
	Primary       Primary       `koanf:"primary" validate:"required"`
	Server        Server        `koanf:"server" validate:"required"`
	Logging       Logging       `koanf:"logging" validate:"required"`
	Observability Observability `koanf:"observability" validate:"required"`
	Auth          Auth          `koanf:"auth" validate:"required"`
	R2            R2            `koanf:"r2" validate:"required"`
}

type Primary struct {
	Env string `koanf:"env" validate:"required,oneof=dev development staging prod production"`
}

type Server struct {
	Port               string   `koanf:"port" validate:"required"` // TODO: Implement port validation
	ReadTimeout        int      `koanf:"read_timeout" validate:"required"`
	WriteTimeout       int      `koanf:"write_timeout" validate:"required"`
	IdleTimeout        int      `koanf:"idle_timeout" validate:"required"`
	CORSAllowedOrigins []string `koanf:"cors_allowed_origins" validate:"required"`
}

type Logging struct {
	Format string `koanf:"format" validate:"required"`
}

type Observability struct {
	AppName         string `koanf:"app_name" validate:"required"`
	Environment     string `koanf:"environment" validate:"required,oneof=dev development staging prod production"`
	Endpoint        string `koanf:"endpoint" validate:"required,url"`
	LoggingEndpoint string `koanf:"logging_endpoint" validate:"required,url"`
}

type Auth struct {
	JWTSecret string `koanf:"jwt_secret" validate:"required"`
}

type R2 struct {
	AccessKeyId     string `koanf:"access_key_id" validate:"required"`
	SecretAccessKey string `koanf:"secret_access_key" validate:"required"`
	SecretKey       string `koanf:"secret_key" validate:"required"`
	Bucket          string `koanf:"bucket" validate:"required"`
	Endpoint        string `koanf:"endpoint" validate:"required,url"`
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

	globalConfig = &cfg

	return &cfg, nil
}

func GetGlobalConfig() *Config {
	return globalConfig
}
