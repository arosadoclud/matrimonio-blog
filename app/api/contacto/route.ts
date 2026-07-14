import { NextResponse } from "next/server";

const BREVO_EMAIL_ENDPOINT = "https://api.brevo.com/v3/smtp/email";

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

function buildNotificationHtml(data: { name: string; email: string; reason: string; message: string }): string {
  const escapedMessage = data.message.replace(/\n/g, "<br>");
  return `
  <div style="font-family: Arial, Helvetica, sans-serif; max-width:560px; margin:0 auto;">
    <h2 style="color:#5A0F18;">Nuevo mensaje de contacto</h2>
    <p><strong>Nombre:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Motivo:</strong> ${data.reason}</p>
    <p><strong>Mensaje:</strong></p>
    <p style="white-space:pre-wrap;">${escapedMessage}</p>
  </div>`;
}

async function sendNotificationEmail(
  data: { name: string; email: string; reason: string; message: string },
  apiKey: string,
  senderEmail: string,
  senderName: string,
  notifyEmail: string
) {
  return fetch(BREVO_EMAIL_ENDPOINT, {
    method: "POST",
    headers: {
      "api-key": apiKey,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sender: { name: senderName, email: senderEmail },
      to: [{ email: notifyEmail }],
      replyTo: { email: data.email, name: data.name },
      subject: `Nuevo contacto: ${data.reason} — ${data.name}`,
      htmlContent: buildNotificationHtml(data),
    }),
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, reason, message } = body;

    const sanitizedData = {
      name: sanitizeInput(name || ""),
      email: sanitizeInput(email || ""),
      reason: sanitizeInput(reason || ""),
      message: sanitizeInput(message || ""),
    };

    const validation = validateContactForm(sanitizedData);

    if (!validation.valid) {
      return NextResponse.json(
        { error: "Por favor, corrige los siguientes errores:", errors: validation.errors },
        { status: 400 }
      );
    }

    const apiKey = process.env.BREVO_API_KEY;
    const senderEmail = process.env.BREVO_SENDER_EMAIL;
    const senderName = process.env.BREVO_SENDER_NAME || "Restaura tu Matrimonio";
    const notifyEmail = process.env.CONTACT_NOTIFY_EMAIL || senderEmail;

    if (!apiKey || !senderEmail || !notifyEmail) {
      if (process.env.NODE_ENV !== "production") {
        console.log("Contact form submission (dev mode, Brevo not configured):", {
          name: sanitizedData.name,
          email: sanitizedData.email,
          reason: sanitizedData.reason,
          messageLength: sanitizedData.message.length,
          timestamp: new Date().toISOString(),
        });
        return NextResponse.json(
          { success: true, message: "Mensaje recibido (modo desarrollo)." },
          { status: 200 }
        );
      }

      console.error("BREVO_API_KEY, BREVO_SENDER_EMAIL o CONTACT_NOTIFY_EMAIL no configurados en producción.");
      return NextResponse.json(
        { error: "El servicio de envío no está disponible en este momento." },
        { status: 503 }
      );
    }

    const emailResponse = await sendNotificationEmail(
      sanitizedData,
      apiKey,
      senderEmail,
      senderName,
      notifyEmail
    );

    if (!emailResponse.ok) {
      const errorData = await emailResponse.json().catch(() => ({}));
      console.error("Contact notification email error:", errorData);
      return NextResponse.json(
        { error: "No pudimos enviar tu mensaje. Intenta de nuevo." },
        { status: 502 }
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
