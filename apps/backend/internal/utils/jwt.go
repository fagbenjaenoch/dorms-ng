package utils

import (
	"errors"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

type JWTClaims struct {
	jwt.RegisteredClaims
	FullName string `json:"full_name"`
}

type GenerateJWTParams struct {
	UserId     string
	FullName   string
	Secret     string
	AppName    string
	Expiration time.Duration
}

func GenerateJWT(params GenerateJWTParams) (string, error) {
	claims := &JWTClaims{
		RegisteredClaims: jwt.RegisteredClaims{
			Subject:   params.UserId,
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(params.Expiration)),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
			Issuer:    params.AppName,
		},
		FullName: params.FullName,
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString([]byte(params.Secret))
	if err != nil {
		return "", err
	}

	return tokenString, nil
}

func ParseJWT(tokenString string, secret string) (*JWTClaims, error) {
	t, err := jwt.ParseWithClaims(tokenString, &JWTClaims{}, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("invalid signing method")
		}
		return []byte(secret), nil
	})

	if err != nil {
		return nil, err
	}

	c, ok := t.Claims.(*JWTClaims)
	if !ok {
		return nil, errors.New("invalid jwt claims")
	}

	return c, nil
}
