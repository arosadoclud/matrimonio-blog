import { NextResponse } from "next/server";

/**
 * Validate email format
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Sanitize input to prevent XSS
 */
function sanitizeInput(input: string): string {
  return input
    .trim()
    .slice(0, 500) // Limit length
    .replace(/[<>]/g, ""); // Remove potential HTML tags
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, lead_magnet } = body;

    // Validate email
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "El email es requerido." },
        { status: 400 }
      );
    }

    const sanitizedEmail = sanitizeInput(email);

    if (!isValidEmail(sanitizedEmail)) {
      return NextResponse.json(
        { error: "Por favor, ingresa un email válido." },
        { status: 400 }
      );
    }

    // Get the newsletter endpoint from environment
    const endpoint = process.env.NEXT_PUBLIC_NEWSLETTER_ENDPOINT;

    if (!endpoint) {
      // If no endpoint configured, simulate success for development
      console.log("Newsletter subscription (dev mode):", {
        email: sanitizedEmail,
        lead_magnet: lead_magnet || "unknown",
        timestamp: new Date().toISOString(),
      });

      return NextResponse.json(
        { success: true, message: "Suscripción registrada (modo desarrollo)." },
        { status: 200 }
      );
    }

    // Send to actual newsletter provider
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: sanitizedEmail,
        lead_magnet: lead_magnet || "7 dias de oracion por la restauracion de tu matrimonio",
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Newsletter API error:", errorData);

      return NextResponse.json(
        { error: "No pudimos procesar tu suscripción. Intenta de nuevo." },
        { status: response.status }
      );
    }

    return NextResponse.json(
      { success: true, message: "¡Gracias por suscribirte!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Newsletter subscription error:", error);

    return NextResponse.json(
      { error: "Error interno del servidor. Intenta de nuevo más tarde." },
      { status: 500 }
    );
  }
}