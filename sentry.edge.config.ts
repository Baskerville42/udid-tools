// This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";
import {
  scrubBreadcrumb,
  scrubSentryEvent,
  SENTRY_DSN,
  traceSampleRate,
} from "@/lib/observability/sentry";

Sentry.init({
  dsn: SENTRY_DSN,
  enabled: Boolean(SENTRY_DSN),
  environment: process.env.VERCEL_ENV ?? process.env.NODE_ENV,
  release: process.env.VERCEL_GIT_COMMIT_SHA,
  tracesSampler: traceSampleRate,
  enableLogs: true,
  sendDefaultPii: false,
  beforeBreadcrumb: scrubBreadcrumb,
  beforeSend: scrubSentryEvent,
  beforeSendTransaction: scrubSentryEvent,
});
