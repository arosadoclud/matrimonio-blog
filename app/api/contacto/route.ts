import { NextResponse } from "next/server";

/**
 * Validate email format
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate name (at least 2 characters)
 */
function isValidName(name: string): boolean {
  return name.trim().length >= 2 && name.trim().length <= 100;
}

/**
 * Validate message (at least 10 characters)
 */
function isValidMessage(message: string): boolean {
  return message.trim().length >= 10 && message.trim().length <= 5000;
}

/**
 * Sanitize input to prevent XSS
 */
function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, "")
    .slice(0, 5000);
}

/**
 * Validate contact form data
 */
function validateContactForm(data: {
  name?: string;
  email?: string;
  reason?: string;
  message?: string;
}): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.name || !isValidName(data.name)) {
    errors.push("El nombre debe tener entre 2 y 100 caracteres.");
  }

  if (!data.email || !isValidEmail(data.email)) {
    errors.push("Por favor, ingresa un email válido.");
  }

  const validReasons = ["Consulta general", "Recurso recomendado", "Colaboración", "Testimonio"];
  if (!data.reason || !validReasons.includes(data.reason)) {
    errors.push("Selecciona un motivo de contacto válido.");
  }

  if (!data.message || !isValidMessage(data.message)) {
    errors.push("El mensaje debe tener entre 10 y 5000 caracteres.");
  }

  return { valid: errors.length === 0, errors };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, reason, message } = body;

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(name || ""),
      email: sanitizeInput(email || ""),
      reason: sanitizeInput(reason || ""),
      message: sanitizeInput(message || ""),
    };

    // Validate
    const validation = validateContactForm(sanitizedData);

    if (!validation.valid) {
      return NextResponse.json(
        { error: "Por favor, corrige los siguientes errores:", errors: validation.errors },
        { status: 400 }
      );
    }

    // Get the contact endpoint from environment (could be email service, CRM, etc.)
    const endpoint = process.env.CONTACT_ENDPOINT;

    if (!endpoint) {
      // If no endpoint configured, simulate success for development
      console.log("Contact form submission (dev mode):", {
        name: sanitizedData.name,
        email: sanitizedData.email,
        reason: sanitizedData.reason,
        messageLength: sanitizedData.message.length,
        timestamp: new Date().toISOString(),
      });

      return NextResponse.json(
        {
          success: true,
          message: "Mensaje recibido (modo desarrollo). Te contactaremos pronto.",
        },
        { status: 200 }
      );
    }

    // Send to actual contact service
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: sanitizedData.name,
        email: sanitizedData.email,
        reason: sanitizedData.reason,
        message: sanitizedData.message,
        source: "contact_form",
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Contact API error:", errorData);

      return NextResponse.json(
        { error: "No pudimos enviar tu mensaje. Intenta de nuevo." },
        { status: response.status }
      );
    }

    return NextResponse.json(
      { success: true, message: "¡Mensaje enviado! Te contactaremos pronto." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);

    return NextResponse.json(
      { error: "Error interno del servidor. Intenta de nuevo más tarde." },
      { status: 500 }
    );
  }
}