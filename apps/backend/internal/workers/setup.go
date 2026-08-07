package workers

import (
	"context"

	"github.com/nats-io/nats.go"
	"github.com/nats-io/nats.go/jetstream"
	"github.com/rs/zerolog"
)

func SetupWorkers(logger *zerolog.Logger) {
	nc, _ := nats.Connect(nats.DefaultURL)
	defer nc.Close()

	js, _ := jetstream.New(nc)
	ctx := context.Background()

	cons, err := js.CreateOrUpdateConsumer(ctx, "search", jetstream.ConsumerConfig{
		Durable:   "search-worker",
		AckPolicy: jetstream.AckExplicitPolicy,
	})
	if err != nil {
		logger.Fatal().Err(err).Msg("failed to create or update consumer")
	}

	msgs, err := cons.Fetch(10, jetstream.FetchMaxWait(5e9))
	if err != nil {
		logger.Fatal().Err(err).Msg("failed to fetch messages")
	}

	for msg := range msgs.Messages() {
		logger.Info().Str("subject", msg.Subject()).Str("data", string(msg.Data())).Msg("received message")

		err := msg.Ack()
		if err != nil {
			logger.Error().Err(err).Msg("failed to ack message")
		}
	}
}
