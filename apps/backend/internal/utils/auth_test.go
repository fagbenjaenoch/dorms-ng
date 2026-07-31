package utils_test

import (
	"testing"

	"github.com/fagbenjaenoch/dorms-ng/internal/utils"
)

func TestPasswordHashing(t *testing.T) {
	tests := []string{"testPassword1", "testPassword2", "testPassword3"}
	for _, tc := range tests {
		t.Run(tc, func(t *testing.T) {
			hashedPassword := utils.CreatePasswordHash(tc)

			if !utils.ComparePassword(tc, hashedPassword) {
				t.Errorf("Password and hash don't match: %s", tc)
			}
		})
	}
}
