package utils_test

import (
	"testing"
	"time"

	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/utils"
)

func TestJWTSigning(t *testing.T) {
	testSecret := "mysecret"

	tests := []struct {
		UserId   string
		FullName string
	}{
		{
			UserId:   "user-123",
			FullName: "User 1",
		},
		{
			UserId:   "user-1234",
			FullName: "User 2",
		},
		{
			UserId:   "user-12345",
			FullName: "User 3",
		},
	}

	for _, tc := range tests {
		t.Run(tc.FullName, func(t *testing.T) {
			params := utils.GenerateJWTParams{
				UserId:     tc.UserId,
				FullName:   tc.FullName,
				AppName:    "hostel-marketplace-app",
				Secret:     testSecret,
				Expiration: time.Duration(time.Now().Add(time.Minute * 30).Unix()),
			}
			jwtString, err := utils.GenerateJWT(params)
			if err != nil {
				t.Errorf("failed to generate jwt, %s", err)
			}

			decodedJwt, err := utils.ParseJWT(jwtString, testSecret)
			if err != nil {
				t.Errorf("failed to parse jwt, %s", err)
			}

			if decodedJwt.FullName != tc.FullName || decodedJwt.Subject != tc.UserId {
				t.Errorf("jwt token is invalid, %s, %s", tc.UserId, tc.FullName)
			}
		})
	}

}
