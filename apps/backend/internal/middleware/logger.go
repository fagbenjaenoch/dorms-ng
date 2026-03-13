package middleware

import (
	"net/http"
	"time"

	"github.com/rs/zerolog"
)

func RequestLogger(log *zerolog.Logger) func(next http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		f := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			start := time.Now()

			defer func() {
				log.Info().
					Str("remote_addr", r.RemoteAddr).
					Str("method", r.Method).
					Str("path", r.URL.Path).
					Str("duration", time.Since(start).String()).
					Msg("")
			}()

			next.ServeHTTP(w, r)
		})

		return http.HandlerFunc(f)
	}
}
