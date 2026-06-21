const SENSITIVE_KEY_PATTERN =
  /^(authorization|cookie|set-cookie|body|request_body|response_body|query_string|udid|imei|meid|serial)$/i;

type SentryLikeEvent = {
  breadcrumbs?: Array<{ data?: Record<string, unknown>; message?: string }>;
  request?: {
    cookies?: unknown;
    data?: unknown;
    headers?: Record<string, string>;
    query_string?: unknown;
    url?: string;
  };
  transaction?: string;
};

export const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN ?? process.env.SENTRY_DSN;

export function stripUrlDetails(value: string): string {
  try {
    const url = new URL(value, "https://www.udid.tools");
    return url.origin === "https://www.udid.tools" && !value.startsWith("http")
      ? url.pathname
      : `${url.origin}${url.pathname}`;
  } catch {
    return value.split(/[?#]/, 1)[0];
  }
}

function scrubRecord(record: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(record).map(([key, value]) => {
      if (SENSITIVE_KEY_PATTERN.test(key)) return [key, "[Filtered]"];
      if (typeof value === "string" && /(url|referrer|href)$/i.test(key)) {
        return [key, stripUrlDetails(value)];
      }
      return [key, value];
    })
  );
}

export function scrubSentryEvent<T extends SentryLikeEvent>(event: T): T {
  if (event.request) {
    delete event.request.cookies;
    delete event.request.data;
    delete event.request.query_string;
    if (event.request.url) event.request.url = stripUrlDetails(event.request.url);
    if (event.request.headers)
      event.request.headers = scrubRecord(event.request.headers) as Record<string, string>;
  }

  if (event.transaction) event.transaction = stripUrlDetails(event.transaction);
  event.breadcrumbs = event.breadcrumbs?.map((breadcrumb) => ({
    ...breadcrumb,
    data: breadcrumb.data ? scrubRecord(breadcrumb.data) : breadcrumb.data,
  }));

  return event;
}

export function scrubBreadcrumb<T extends { data?: Record<string, unknown> }>(breadcrumb: T): T {
  if (breadcrumb.data) breadcrumb.data = scrubRecord(breadcrumb.data);
  return breadcrumb;
}

export function traceSampleRate({
  inheritOrSampleWith,
  location,
  name,
  normalizedRequest,
}: {
  inheritOrSampleWith: (fallbackSampleRate: number) => number;
  location?: { pathname?: string };
  name: string;
  normalizedRequest?: { url?: string };
}): number {
  const path = location?.pathname ?? normalizedRequest?.url ?? name;
  if (path.includes("/success")) return 0;
  if (path.includes("/api/retrieve") || path.includes("/api/register.signed.mobileconfig")) {
    return inheritOrSampleWith(1);
  }
  return inheritOrSampleWith(process.env.NODE_ENV === "production" ? 0.25 : 1);
}
