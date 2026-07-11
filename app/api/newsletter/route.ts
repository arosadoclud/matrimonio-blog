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
  const siteLabel = siteUrl.replace(/^https?:\/\//, "");
  return `
  <div style="background:#FFF7E8; padding:32px 16px; font-family: Arial, Helvetica, sans-serif;">
    <div style="max-width:560px; margin:0 auto; background:#FFFDF8; border:1px solid rgba(212,175,55,0.45); border-radius:8px; overflow:hidden;">
      <div style="background:#5A0F18; padding:20px 32px; text-align:center;">
        <p style="margin:0; font-size:12px; font-weight:bold; letter-spacing:0.18em; text-transform:uppercase; color:#D4AF37;">
          Restaura tu Matrimonio
        </p>
      </div>
      <div style="padding:36px 32px 32px;">
        <h1 style="margin:0 0 20px; font-family: Georgia, 'Times New Roman', serif; font-size:26px; font-weight:bold; color:#5A0F18; text-align:center;">
          Tu guía ha llegado
        </h1>
        <p style="margin:0 0 16px; font-size:15px; line-height:24px; color:#2D2D2D;">
          Gracias por confiar en Restaura tu Matrimonio. Aquí tienes tu guía
          <strong>&ldquo;7 días de oración por la restauración de tu matrimonio&rdquo;</strong>,
          adjunta en este correo en formato PDF.
        </p>
        <div style="margin:24px 0; padding:20px 24px; background:#FFF7E8; border:1px solid rgba(212,175,55,0.45); border-radius:8px;">
          <p style="margin:0; font-family: Georgia, 'Times New Roman', serif; font-size:19px; font-weight:bold; line-height:1.4; color:#5A0F18;">
            &ldquo;Cordón de tres dobleces no se rompe pronto.&rdquo;
          </p>
          <p style="margin:10px 0 0; font-size:12px; font-weight:bold; letter-spacing:0.14em; text-transform:uppercase; color:#8a6a18;">
            Eclesiastés 4:12
          </p>
        </div>
        <p style="margin:0 0 8px; font-size:15px; line-height:24px; color:#2D2D2D;">
          Si prefieres descargarla directamente, puedes hacerlo aquí:
        </p>
        <table role="presentation" cellpadding="0" cellspacing="0" style="margin:20px auto;">
          <tr>
            <td style="border-radius:999px; background:#5A0F18;">
              <a href="${pdfUrl}" style="display:inline-block; padding:14px 32px; font-size:15px; font-weight:bold; color:#FFF7E8; text-decoration:none; border-radius:999px;">
                Descargar guía en PDF
              </a>
            </td>
          </tr>
        </table>
        <p style="margin:20px 0 0; font-size:14px; line-height:22px; color:#4A3728;">
          Te recomendamos guardar este correo para que puedas volver a la guía
          cada día durante tu semana de oración.
        </p>
        <p style="margin:28px 0 0; font-size:15px; line-height:24px; color:#2D2D2D;">
          Con cariño y esperanza,<br />
          <strong style="color:#5A0F18; font-family: Georgia, 'Times New Roman', serif;">Restaura tu Matrimonio</strong>
        </p>
      </div>
      <div style="border-top:1px solid rgba(212,175,55,0.45); padding:20px 32px;">
        <p style="margin:0; font-size:12px; line-height:18px; color:#6B5B4E;">
          Recibes este correo porque solicitaste esta guía en ${siteLabel}.
          Puedes cancelar tu suscripción a futuras comunicaciones respondiendo a este correo
          con la palabra "cancelar".
        </p>
      </div>
    </div>
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
