// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
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
  integrations: [Sentry.httpIntegration({ maxIncomingRequestBodySize: "none" })],
  tracesSampler: traceSampleRate,
  enableLogs: true,
  sendDefaultPii: false,
  beforeBreadcrumb: scrubBreadcrumb,
  beforeSend: scrubSentryEvent,
  beforeSendTransaction: scrubSentryEvent,
});
