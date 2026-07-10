import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

export const runtime = "nodejs";

const PDF_PATH = path.join(
  process.cwd(),
  "public",
  "guias",
  "7-dias-de-oracion-restauracion-matrimonial.pdf"
);
const PDF_PUBLIC_URL = "/guias/7-dias-de-oracion-restauracion-matrimonial.pdf";
const PDF_ATTACHMENT_FILENAME =
  "7-dias-de-oracion-por-la-restauracion-de-tu-matrimonio.pdf";

const BREVO_EMAIL_ENDPOINT = "https://api.brevo.com/v3/smtp/email";
const BREVO_CONTACTS_ENDPOINT = "https://api.brevo.com/v3/contacts";

const RATE_LIMIT_WINDOW_MS = 60_000;
const rateLimitStore = new Map<string, number>();

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

function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(key: string): boolean {
  const last = rateLimitStore.get(key);
  const now = Date.now();
  if (last && now - last < RATE_LIMIT_WINDOW_MS) {
    return true;
  }
  rateLimitStore.set(key, now);
  return false;
}

function buildEmailHtml(siteUrl: string): string {
  const pdfUrl = `${siteUrl}${PDF_PUBLIC_URL}`;
  return `
  <div style="font-family: Georgia, 'Times New Roman', serif; max-width: 560px; margin: 0 auto; background: #FAF7F2; padding: 32px 24px; color: #2C1810;">
    <h1 style="font-size: 22px; color: #6B1A27; margin-bottom: 16px;">
      Tu guía ha llegado
    </h1>
    <p style="font-size: 15px; line-height: 24px;">
      Gracias por confiar en Restaura tu Matrimonio. Aquí tienes tu guía
      <strong>"7 días de oración por la restauración de tu matrimonio"</strong>,
      adjunta en este correo en formato PDF.
    </p>
    <p style="font-size: 15px; line-height: 24px;">
      Si prefieres descargarla directamente, puedes hacerlo aquí:
    </p>
    <p style="text-align: center; margin: 24px 0;">
      <a href="${pdfUrl}" style="background: #6B1A27; color: #FFF8F0; padding: 12px 28px; border-radius: 4px; text-decoration: none; font-weight: bold;">
        Descargar guía en PDF
      </a>
    </p>
    <p style="font-size: 14px; line-height: 22px; color: #4A3728;">
      Te recomendamos guardar este correo para que puedas volver a la guía
      cada día durante tu semana de oración.
    </p>
    <p style="font-size: 15px; line-height: 24px; margin-top: 24px;">
      Con cariño y esperanza,<br />
      <strong>Restaura tu Matrimonio</strong>
    </p>
    <hr style="border: none; border-top: 1px solid #E8D9C8; margin: 32px 0 16px;" />
    <p style="font-size: 12px; line-height: 18px; color: #6B5B4E;">
      Recibes este correo porque solicitaste esta guía en restauratumatrimonio-blog.com.
      Puedes cancelar tu suscripción a futuras comunicaciones respondiendo a este correo
      con la palabra "cancelar".
    </p>
  </div>`;
}

async function sendGuideEmail(
  email: string,
  apiKey: string,
  senderEmail: string,
  senderName: string,
  siteUrl: string
) {
  const pdfBuffer = await readFile(PDF_PATH);
  const pdfBase64 = pdfBuffer.toString("base64");

  const response = await fetch(BREVO_EMAIL_ENDPOINT, {
    method: "POST",
    headers: {
      "api-key": apiKey,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sender: { name: senderName, email: senderEmail },
      to: [{ email }],
      subject: "Tu guía: 7 días de oración por tu matrimonio",
      htmlContent: buildEmailHtml(siteUrl),
      attachment: [
        {
          content: pdfBase64,
          name: PDF_ATTACHMENT_FILENAME,
        },
      ],
    }),
  });

  return response;
}

async function upsertContact(email: string, apiKey: string, listId: string | undefined) {
  try {
    const response = await fetch(BREVO_CONTACTS_ENDPOINT, {
      method: "POST",
      headers: {
        "api-key": apiKey,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        updateEnabled: true,
        ...(listId ? { listIds: [Number(listId)] } : {}),
      }),
    });

    // Brevo returns 204 (no body) when updating an existing contact.
    if (!response.ok && response.status !== 204) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Brevo contact upsert error:", errorData);
    }
  } catch (error) {
    console.error("Brevo contact upsert exception:", error);
  }
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  const { email, lead_magnet, website } = body as {
    email?: unknown;
    lead_magnet?: unknown;
    website?: unknown;
  };

  // Honeypot: bots fill hidden fields humans never see. Bail out with a
  // fake success so the bot doesn't learn the field is being checked.
  if (typeof website === "string" && website.trim().length > 0) {
    return NextResponse.json({ success: true }, { status: 200 });
  }

  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "El email es requerido." }, { status: 400 });
  }

  const sanitizedEmail = sanitizeInput(email).toLowerCase();

  if (!isValidEmail(sanitizedEmail)) {
    return NextResponse.json(
      { error: "Por favor, ingresa un email válido." },
      { status: 400 }
    );
  }

  const clientIp = getClientIp(request);
  const rateLimitKey = `${clientIp}:${sanitizedEmail}`;
  if (isRateLimited(rateLimitKey)) {
    return NextResponse.json(
      { error: "Ya recibimos tu solicitud. Revisa tu correo en unos minutos." },
      { status: 429 }
    );
  }

  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const senderName = process.env.BREVO_SENDER_NAME || "Restaura tu Matrimonio";
  const listId = process.env.BREVO_LIST_ID;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://restauratumatrimonio-blog.com";

  if (!apiKey || !senderEmail) {
    if (process.env.NODE_ENV !== "production") {
      console.log("Newsletter subscription (dev mode, no BREVO_API_KEY):", {
        email: sanitizedEmail,
        lead_magnet: lead_magnet || "unknown",
        timestamp: new Date().toISOString(),
      });
      return NextResponse.json({ success: true, developmentMode: true }, { status: 200 });
    }

    console.error("BREVO_API_KEY o BREVO_SENDER_EMAIL no configurados en producción.");
    return NextResponse.json(
      { error: "El servicio de envío no está disponible en este momento." },
      { status: 503 }
    );
  }

  try {
    const emailResponse = await sendGuideEmail(
      sanitizedEmail,
      apiKey,
      senderEmail,
      senderName,
      siteUrl
    );

    if (!emailResponse.ok) {
      const errorData = await emailResponse.json().catch(() => ({}));
      console.error("Brevo send error:", errorData);
      return NextResponse.json(
        { error: "No pudimos enviar la guía en este momento." },
        { status: 502 }
      );
    }

    await upsertContact(sanitizedEmail, apiKey, listId);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "Error interno del servidor. Intenta de nuevo más tarde." },
      { status: 500 }
    );
  }
}
