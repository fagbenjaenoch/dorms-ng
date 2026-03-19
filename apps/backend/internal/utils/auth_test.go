package utils_test

import (
	"testing"

	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/utils"
	"golang.org/x/crypto/argon2"
)

func TestPasswordHashing(t *testing.T) {
	tests := []string{"testPassword1", "testPassword2", "testPassword3"}
	for _, tc := range tests {
		t.Run(tc, func(t *testing.T) {
			hashedPassword := utils.CreatePasswordHash(tc)

			argonParams, salt, h, err := utils.DecodeHash(hashedPassword)
			if err != nil {
				t.Fatal(err)
			}
			hash := argon2.IDKey([]byte(tc), []byte(salt), argonParams.Iterations, argonParams.Memory, argonParams.Parallelism, argonParams.KeyLength)
			t.Logf("Input: %x, Hash: %x", hash, h)

			if !utils.ComparePassword(tc, hashedPassword) {
				t.Errorf("Password and hash don't match: %s", tc)
			}
		})
	}
}
