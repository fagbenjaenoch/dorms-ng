package storage

import (
	"context"
	"log"

	s3Config "github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/credentials"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/config"
)

type R2 struct {
	client      *s3.Client
	initialized bool
}

var r2Client R2

func GetR2Client() *s3.Client {
	if r2Client.initialized {
		return r2Client.client
	}

	appConfig := config.GetGlobalConfig()
	cfg, err := s3Config.LoadDefaultConfig(context.TODO(),
		s3Config.WithCredentialsProvider(credentials.NewStaticCredentialsProvider(appConfig.R2.AccessKeyId, appConfig.R2.SecretAccessKey, "")),
		s3Config.WithRegion("auto"),
	)
	if err != nil {
		log.Fatalf("failed to load R2 config: %v", err)
	}

	client := s3.NewFromConfig(cfg)
	r2Client = R2{client: client, initialized: true}

	return r2Client.client
}
