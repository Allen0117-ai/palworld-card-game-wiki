type AnalyticsValue = string | number | boolean;

type AnalyticsWindow = Window & {
  clarity?: (command: string, ...args: unknown[]) => void;
  gtag?: (...args: unknown[]) => void;
};

export function trackUserAction(
  eventName: string,
  details: Record<string, AnalyticsValue> = {},
) {
  if (typeof window === "undefined") return;

  const analyticsWindow = window as AnalyticsWindow;
  analyticsWindow.gtag?.("event", eventName, details);
  analyticsWindow.clarity?.("event", eventName);
}
