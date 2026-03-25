package auth_test

import (
	"testing"
	"time"

	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/auth"
)

func TestJWTSigning(t *testing.T) {
	testSecret := "mysecret"

	tests := []struct {
		Email    string
		FullName string
	}{
		{
			Email:    "user-123@example.com",
			FullName: "User 1",
		},
		{
			Email:    "user-1234@example.com",
			FullName: "User 2",
		},
		{
			Email:    "user-12345@example.com",
			FullName: "User 3",
		},
	}

	for _, tc := range tests {
		t.Run(tc.FullName, func(t *testing.T) {
			params := auth.GenerateJWTParams{
				Email:      tc.Email,
				FullName:   tc.FullName,
				AppName:    "hostel-marketplace-app",
				Secret:     testSecret,
				Expiration: time.Duration(time.Now().Add(time.Minute * 30).Unix()),
			}
			jwtString, err := auth.GenerateJWT(params)
			if err != nil {
				t.Errorf("failed to generate jwt, %s", err)
			}

			decodedJwt, err := auth.ParseJWT(jwtString, testSecret)
			if err != nil {
				t.Errorf("failed to parse jwt, %s", err)
			}

			if decodedJwt.FullName != tc.FullName || decodedJwt.Subject != tc.Email {
				t.Errorf("jwt token is invalid, %s, %s", tc.Email, tc.FullName)
			}
		})
	}

}
