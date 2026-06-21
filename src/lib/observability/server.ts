import * as Sentry from "@sentry/nextjs";

type ApiResult = {
  durationMs: number;
  errorType?: string;
  requestId?: string | null;
  route: string;
  status: number;
};

export function recordApiResult(result: ApiResult): void {
  const level = result.status >= 500 ? "error" : result.status >= 400 ? "warn" : "info";
  const attributes = {
    duration_ms: result.durationMs,
    error_type: result.errorType,
    request_id: result.requestId ?? undefined,
    route: result.route,
    status_code: result.status,
  };

  console[level](JSON.stringify({ level, message: "api_request_completed", ...attributes }));
  Sentry.logger[level]("api_request_completed", attributes);
  Sentry.metrics.count("udid_tools.api.requests", 1, {
    attributes: { route: result.route, status: String(result.status) },
  });
  Sentry.metrics.distribution("udid_tools.api.duration", result.durationMs, {
    unit: "millisecond",
    attributes: { route: result.route, status: String(result.status) },
  });
}
