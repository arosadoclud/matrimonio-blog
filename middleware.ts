import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Simple in-memory rate limiting store
// For production, consider using Vercel KV, Redis, or Upstash
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Rate limit configuration
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10; // 10 requests per minute for form submissions

/**
 * Get client identifier (IP or a fingerprint)
 * In serverless, X-Forwarded-For might not be reliable
 * This is a simplified implementation
 */
function getClientIdentifier(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "anonymous";
  const userAgent = request.headers.get("user-agent") || "unknown";
  return `${ip}-${userAgent.slice(0, 50)}`;
}

/**
 * Check if request should be rate limited
 * Applies to form submission endpoints
 */
function shouldRateLimit(identifier: string): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(identifier);

  if (!record || now > record.resetTime) {
    // Create new record or reset expired one
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  // Increment count
  record.count += 1;
  rateLimitStore.set(identifier, record);
  return false;
}

/**
 * Clean up expired entries periodically
 * In production, use a more robust solution
 */
function cleanupExpiredEntries(): void {
  const now = Date.now();
  for (const [key, value] of rateLimitStore.entries()) {
    if (now > value.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}

// Run cleanup every 5 minutes
setInterval(cleanupExpiredEntries, 5 * 60 * 1000);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Apply rate limiting only to form submission endpoints
  const formEndpoints = ["/contacto", "/newsletter", "/api/"];
  const isFormEndpoint = formEndpoints.some((endpoint) => pathname.startsWith(endpoint));

  if (isFormEndpoint && request.method === "POST") {
    const identifier = getClientIdentifier(request);

    if (shouldRateLimit(identifier)) {
      return NextResponse.json(
        {
          error: "Demasiadas solicitudes. Por favor, espera un momento antes de intentar de nuevo.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(Math.ceil(RATE_LIMIT_WINDOW_MS / 1000)),
            "X-RateLimit-Limit": String(MAX_REQUESTS_PER_WINDOW),
            "X-RateLimit-Remaining": "0",
          },
        }
      );
    }
  }

  // Continue with the request
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except static files and images
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};