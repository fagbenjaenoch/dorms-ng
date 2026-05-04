package services

import (
	"context"
	"fmt"
	"net/http"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/config"
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/dto"
	"github.com/rs/zerolog"
	"go.opentelemetry.io/otel"
)

var UploadTracer = otel.Tracer("upload")

type UploadService struct {
	UploadClient *s3.Client
	Logger       *zerolog.Logger
}

func NewUploadService(uploadClient *s3.Client, logger *zerolog.Logger) UploadService {
	return UploadService{
		UploadClient: uploadClient,
		Logger:       logger,
	}
}

func (s *UploadService) GetPresignedURL(ctx context.Context, key string) (dto.StructuredResponse, error) {
	tracerCtx, span := UploadTracer.Start(ctx, "GetPresignedURL")
	defer span.End()

	s.Logger.Debug().Str("key", key).Msg("generating presigned url")

	presignClient := s3.NewPresignClient(s.UploadClient)

	presignResult, err := presignClient.PresignPutObject(tracerCtx, &s3.PutObjectInput{
		Bucket: &config.GetGlobalConfig().R2.Bucket,
		Key:    aws.String(key),
	})
	if err != nil {
		s.Logger.Err(err).Msg("failed to generate presigned url")
		span.RecordError(err)
		span.SetStatus(http.StatusInternalServerError, "presign url generation failed")
		return dto.StructuredResponse{
			Success: false,
			Message: "failed to generate presigned url",
			Status:  http.StatusInternalServerError,
			Payload: nil,
		}, err
	}

	return dto.StructuredResponse{
		Success: true,
		Message: "successfully generated presigned url",
		Status:  http.StatusOK,
		Payload: struct {
			UploadURL string `json:"url"`
			PublicURL string `json:"publicUrl"`
		}{
			UploadURL: presignResult.URL,
			PublicURL: fmt.Sprintf("https://%s/%s", config.GetGlobalConfig().R2.Bucket, key),
		},
	}, nil
}
