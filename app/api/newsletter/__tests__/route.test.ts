import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";

vi.mock("fs/promises", () => {
  const readFile = vi.fn();
  return { readFile, default: { readFile } };
});

import { readFile } from "fs/promises";
import { POST } from "../route";

const ORIGINAL_ENV = { ...process.env };

function jsonRequest(body: unknown): Request {
  return new Request("http://localhost/api/newsletter", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/newsletter", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env = { ...ORIGINAL_ENV };
    process.env.BREVO_API_KEY = "xkeysib-test-key";
    process.env.BREVO_SENDER_EMAIL = "guia@restauratumatrimonio-blog.com";
    process.env.BREVO_SENDER_NAME = "Restaura tu Matrimonio";
    vi.mocked(readFile).mockResolvedValue(Buffer.from("%PDF-1.4 fake"));
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 201,
      json: () => Promise.resolve({ messageId: "email_123" }),
    } as Response);
  });

  afterEach(() => {
    process.env = { ...ORIGINAL_ENV };
    vi.unstubAllEnvs();
  });

  it("sends the email and returns success for a valid email", async () => {
    const response = await POST(jsonRequest({ email: "test@example.com" }));
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(fetch).toHaveBeenCalledWith(
      "https://api.brevo.com/v3/smtp/email",
      expect.objectContaining({ method: "POST" })
    );
  });

  it("returns 400 for an invalid email", async () => {
    const response = await POST(jsonRequest({ email: "not-an-email" }));
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBeDefined();
    expect(fetch).not.toHaveBeenCalled();
  });

  it("returns 400 for an invalid JSON body", async () => {
    const request = new Request("http://localhost/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "not json",
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
  });

  it("returns developmentMode:true when BREVO_API_KEY is missing outside production", async () => {
    delete process.env.BREVO_API_KEY;
    vi.stubEnv("NODE_ENV", "development");

    const response = await POST(jsonRequest({ email: "dev-mode@example.com" }));
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.developmentMode).toBe(true);
    expect(fetch).not.toHaveBeenCalled();
  });

  it("returns 503 when BREVO_API_KEY is missing in production", async () => {
    delete process.env.BREVO_API_KEY;
    vi.stubEnv("NODE_ENV", "production");

    const response = await POST(jsonRequest({ email: "prod-no-key@example.com" }));
    expect(response.status).toBe(503);
  });

  it("does not report success when Brevo returns an error", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 400,
      json: () => Promise.resolve({ message: "Invalid sender" }),
    } as Response);

    const response = await POST(jsonRequest({ email: "brevo-error@example.com" }));
    const data = await response.json();

    expect(response.ok).toBe(false);
    expect(data.success).toBeUndefined();
  });

  it("still returns success when the contact upsert fails but the email sent", async () => {
    process.env.BREVO_LIST_ID = "5";
    global.fetch = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        status: 201,
        json: () => Promise.resolve({ messageId: "email_123" }),
      } as Response)
      .mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: () => Promise.resolve({ message: "contact error" }),
      } as Response);

    const response = await POST(jsonRequest({ email: "contact-fail@example.com" }));
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(fetch).toHaveBeenCalledTimes(2);
  });

  it("includes the PDF as a base64 attachment", async () => {
    await POST(jsonRequest({ email: "attachment-check@example.com" }));

    const callArgs = vi.mocked(fetch).mock.calls[0];
    const requestBody = JSON.parse(callArgs[1]!.body as string);

    expect(requestBody.attachment).toHaveLength(1);
    expect(requestBody.attachment[0].content).toBe(
      Buffer.from("%PDF-1.4 fake").toString("base64")
    );
    expect(requestBody.attachment[0].name).toBe(
      "7-dias-de-oracion-por-la-restauracion-de-tu-matrimonio.pdf"
    );
  });

  it("normalizes the email to lowercase and sanitizes it", async () => {
    await POST(jsonRequest({ email: "  Normalize-ME@Example.com  " }));

    const callArgs = vi.mocked(fetch).mock.calls[0];
    const requestBody = JSON.parse(callArgs[1]!.body as string);

    expect(requestBody.to).toEqual([{ email: "normalize-me@example.com" }]);
  });

  it("uses the lead name in the email and Brevo contact", async () => {
    process.env.BREVO_LIST_ID = "5";

    await POST(jsonRequest({ email: "andy@example.com", name: "Andy Robinson" }));

    const emailBody = JSON.parse(vi.mocked(fetch).mock.calls[0][1]!.body as string);
    const contactBody = JSON.parse(vi.mocked(fetch).mock.calls[1][1]!.body as string);
    expect(emailBody.to).toEqual([{ email: "andy@example.com", name: "Andy Robinson" }]);
    expect(contactBody.attributes).toEqual({ FIRSTNAME: "Andy Robinson" });
    expect(contactBody.listIds).toEqual([5]);
  });

  it("silently blocks the request when the honeypot field is filled", async () => {
    const response = await POST(
      jsonRequest({ email: "bot@example.com", website: "https://spam.example" })
    );
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(fetch).not.toHaveBeenCalled();
  });
});
