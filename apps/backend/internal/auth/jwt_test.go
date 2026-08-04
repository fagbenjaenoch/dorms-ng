package auth_test

import (
	"testing"
	"time"

	"github.com/fagbenjaenoch/dorms-ng/internal/auth"
)

func TestJWTSigning(t *testing.T) {
	testSecret := "mysecret"

	tc := struct {
		Email    string
		FullName string
	}{

		Email:    "user-123@example.com",
		FullName: "User 1",
	}

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

}

func TestGenerateJWT(t *testing.T) {
	params := auth.GenerateJWTParams{
		Email:      "test@example.com",
		FullName:   "Test User",
		Secret:     "my-secret-key",
		AppName:    "dorms-ng",
		Expiration: 24 * time.Hour,
	}

	token, err := auth.GenerateJWT(params)
	if err != nil {
		t.Errorf("failed to generate jwt, %s", err)
	}
	if token == "" {
		t.Errorf("token output is invalid")
	}
}

func TestParseJWT_Valid(t *testing.T) {
	secret := "my-secret-key"
	params := auth.GenerateJWTParams{
		Email:      "test@example.com",
		FullName:   "Test User",
		Secret:     secret,
		AppName:    "dorms-ng",
		Expiration: 24 * time.Hour,
	}

	token, _ := auth.GenerateJWT(params)
	claims, err := auth.ParseJWT(token, secret)
	if err != nil {
		t.Errorf("failed to parse jwt, %s", err)
	}

	if claims.Subject != params.Email {
		t.Errorf("claims: expected %s, got %s", params.Email, claims.Subject)
	}

	if claims.FullName != params.FullName {
		t.Errorf("claims: expected %s, got %s", params.FullName, claims.FullName)
	}
}

func TestParseJWT_InvalidSecret(t *testing.T) {
	params := auth.GenerateJWTParams{
		Email:    "test@example.com",
		FullName: "Test User",
		Secret:   "correct-secret",
		AppName:  "dorms-ng",
	}
	token, _ := auth.GenerateJWT(params)

	_, err := auth.ParseJWT(token, "wrong-secret")
	if err == nil {
		t.Error("wrong secret should throw error")
	}
}

func TestParseJWT_Expired(t *testing.T) {
	secret := "my-secret-key"
	params := auth.GenerateJWTParams{
		Email:      "test@example.com",
		FullName:   "Test User",
		Secret:     secret,
		AppName:    "dorms-ng",
		Expiration: -1 * time.Hour, // expired
	}

	token, _ := auth.GenerateJWT(params)
	_, err := auth.ParseJWT(token, secret)
	if err == nil {
		t.Error("expired secret should throw error")
	}
}
