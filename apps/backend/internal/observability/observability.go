package observability

import (
	"context"
	"time"

	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/server"
	"go.opentelemetry.io/otel"
	"go.opentelemetry.io/otel/exporters/otlp/otlptrace/otlptracehttp"
	"go.opentelemetry.io/otel/propagation"
	"go.opentelemetry.io/otel/sdk/resource"
	sdkTrace "go.opentelemetry.io/otel/sdk/trace"
	semconv "go.opentelemetry.io/otel/semconv/v1.37.0"
)

type Observability struct {
	s *server.Server
}

func NewObservability(s *server.Server) *Observability {
	return &Observability{
		s: s,
	}
}

func (o *Observability) InitTracer() (func(context.Context) error, error) {
	ctx := context.Background()

	exporter, err := otlptracehttp.New(
		ctx,
		otlptracehttp.WithEndpoint(o.s.Config.Observability.Endpoint),
		otlptracehttp.WithCompression(gzip.CompressLevelDefault),
	)
	if err != nil {
		return nil, err
	}

	res, err := resource.New(
		ctx,
		resource.WithAttributes(
			semconv.ServiceNameKey.String(o.s.Config.Observability.ServiceName),
			semconv.DeploymentEnvironmentName(o.s.Config.Observability.Environment),
		),
		resource.WithHost(),
		resource.WithOS(),
		resource.WithProcess(),
	)
	if err != nil {
		return nil, err
	}

	tp := sdkTrace.NewTracerProvider(
		sdkTrace.WithBatcher(exporter,
			sdkTrace.WithMaxQueueSize(2048),          // 2    MB
			sdkTrace.WithMaxExportBatchSize(512),     // 512 spans
			sdkTrace.WithBatchTimeout(5*time.Second), // 5 seconds
		),
		sdkTrace.WithResource(res),
	)

	// set global tracer provider
	otel.SetTracerProvider(tp)

	// set global propagator for context propagation
	otel.SetTextMapPropagator(propagation.NewCompositeTextMapPropagator(
		propagation.TraceContext{},
		propagation.Baggage{},
	))

	o.s.Logger.Info().Msg("opentelemetry initialization successful")

	return tp.Shutdown, nil
}

// func (o *Observability) InitMetrics
