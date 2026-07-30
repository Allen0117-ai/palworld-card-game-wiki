/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";

interface Env {
  ASSETS?: Fetcher;
  DB: D1Database;
  IMAGES?: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

async function fetchImageAsset(path: string, request: Request, assets?: Fetcher): Promise<Response> {
  const assetRequest = new Request(new URL(path, request.url));
  const response = assets ? await assets.fetch(assetRequest) : await fetch(assetRequest);

  if (!response.ok || !path.toLowerCase().endsWith(".webp")) {
    return response;
  }

  const contentType = response.headers.get("Content-Type")?.split(";")[0].trim().toLowerCase();
  if (contentType === "image/webp") {
    return response;
  }

  const headers = new Headers(response.headers);
  headers.set("Content-Type", "image/webp");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      const imageBinding = env.IMAGES;
      const transformImage = imageBinding
        ? async (body: ReadableStream, { width, format, quality }: { width: number; format: string; quality: number }) => {
            const result = await imageBinding.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
            return result.response();
          }
        : undefined;

      return handleImageOptimization(request, {
        fetchAsset: (path) => fetchImageAsset(path, request, env.ASSETS),
        transformImage,
      }, allowedWidths);
    }

    return handler.fetch(request, env, ctx);
  },
};

export default worker;
