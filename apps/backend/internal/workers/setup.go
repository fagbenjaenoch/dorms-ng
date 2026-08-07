package workerpool

import (
	"context"
	"errors"
	"time"

	"github.com/fagbenjaenoch/dorms-ng/internal/config"
	"github.com/fagbenjaenoch/dorms-ng/internal/secrets"
	infisical "github.com/infisical/go-sdk"
	"github.com/nats-io/nats.go"
	"github.com/nats-io/nats.go/jetstream"
	"github.com/rs/zerolog"
)

func connectNATS(ctx context.Context, logger *zerolog.Logger, config *config.Config) (*nats.Conn, error) {
	secretsClient := secrets.GetSecretClient()
	if secretsClient == nil {
		return nil, errors.New("secrets client is nil")
	}

	natsUserJWT, err := secretsClient.Secrets().Retrieve(infisical.RetrieveSecretOptions{
		SecretKey:   "NATS_USER_JWT",
		Environment: config.Primary.Env,
		ProjectID:   config.Infisical.ProjectID,
		SecretPath:  config.Infisical.NATSSecretPath,
	})
	if err != nil {
		return nil, errors.New("failed to retrieve nats credentials: " + err.Error())
	}

	natsUserSeed, err := secretsClient.Secrets().Retrieve(infisical.RetrieveSecretOptions{
		SecretKey:   "NATS_USER_SEED",
		Environment: config.Primary.Env,
		ProjectID:   config.Infisical.ProjectID,
		SecretPath:  config.Infisical.NATSSecretPath,
	})
	if err != nil {
		logger.Fatal().Err(err).Msg("failed to create or update consumer")
		return nil, errors.New("failed to retrieve nats credentials: " + err.Error())
	}

	nc, _ := nats.Connect(nats.DefaultURL,
		nats.UserJWTAndSeed(natsUserJWT.SecretValue, natsUserSeed.SecretValue),
		nats.MaxReconnects(-1),
		nats.ReconnectWait(2*time.Second),
		nats.DisconnectErrHandler(func(_ *nats.Conn, err error) {
			logger.Error().Err(err).Msg("nats disconnected")
		}),
		nats.ReconnectHandler(func(_ *nats.Conn) {
			logger.Info().Msg("nats reconnected")
		}),
	)
	return nc, nil
}

func setupJetStream(nc *nats.Conn, logger *zerolog.Logger) (jetstream.JetStream, error) {
	js, err := jetstream.New(nc)
	if err != nil {
		return nil, errors.New("failed to create jetstream: " + err.Error())
	}
	return js, nil
}

type NATSJetStream struct {
	nc *nats.Conn
	js jetstream.JetStream
}

func SetupNATSJetStream(ctx context.Context, logger *zerolog.Logger, config *config.Config) (*NATSJetStream, error) {
	nc, err := connectNATS(ctx, logger, config)
	if err != nil {
		return nil, err
	}

	js, err := setupJetStream(nc, logger)
	if err != nil {
		return nil, err
	}
	return &NATSJetStream{nc: nc, js: js}, nil
}

func (ns *NATSJetStream) CreateConsumer(ctx context.Context, logger *zerolog.Logger, stream, consumerName string) (jetstream.Consumer, error) {
	consumer, err := ns.js.CreateOrUpdateConsumer(ctx, stream, jetstream.ConsumerConfig{
		Name:      consumerName,
		AckPolicy: jetstream.AckExplicitPolicy,
	})
	if err != nil {
		return nil, err
	}

	return consumer, nil
}
