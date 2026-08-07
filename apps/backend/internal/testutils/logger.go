package testutils

import (
	"os"
	"testing"

	"github.com/rs/zerolog"
)

func NewTestLogger(t *testing.T) *zerolog.Logger {
	logger := zerolog.New(os.Stdout).With().Timestamp().Logger()
	return &logger
}
