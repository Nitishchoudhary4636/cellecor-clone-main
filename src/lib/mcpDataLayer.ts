type MCPPayload = Record<string, unknown>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function toAbsoluteUrl(url: string): string {
  if (!url) return url;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (typeof window === "undefined") return url;
  return `${window.location.origin}${url.startsWith("/") ? "" : "/"}${url}`;
}

// Keep only one MCP object at the top so getDataLayerValue reads current page data first.
export function setMCPData(payload: MCPPayload) {
  if (typeof window === "undefined") return;

  const current = Array.isArray(window.dataLayer) ? window.dataLayer : [];
  const nonMcp = current.filter((entry) => !(entry && typeof entry === "object" && "MCP" in entry));

  window.dataLayer = [{ MCP: payload }, ...nonMcp];
}
