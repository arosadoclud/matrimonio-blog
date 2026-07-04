import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { NewsletterForm } from "../NewsletterForm";

// Mock fetch globally
global.fetch = vi.fn();

describe("NewsletterForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render the form with email input", () => {
    render(<NewsletterForm />);

    const emailInput = screen.getByLabelText("Email");
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute("type", "email");
  });

  it("should render submit button", () => {
    render(<NewsletterForm />);

    const submitButton = screen.getByRole("button", { name: /recibir guía/i });
    expect(submitButton).toBeInTheDocument();
  });

  it("should show loading state on submit", async () => {
    vi.mocked(fetch).mockImplementation(() => new Promise(() => {})); // Never resolves

    render(<NewsletterForm />);

    const emailInput = screen.getByLabelText("Email");
    const submitButton = screen.getByRole("button", { name: /recibir guía/i });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.click(submitButton);

    expect(screen.getByText(/enviando/i)).toBeInTheDocument();
  });

  it("should show success message on successful submission", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    } as Response);

    render(<NewsletterForm />);

    const emailInput = screen.getByLabelText("Email");
    const submitButton = screen.getByRole("button", { name: /recibir guía/i });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/listo/i)).toBeInTheDocument();
    });
  });

  it("should show error message on failed submission", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ error: "Error occurred" }),
    } as Response);

    render(<NewsletterForm />);

    const emailInput = screen.getByLabelText("Email");
    const submitButton = screen.getByRole("button", { name: /recibir guía/i });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/no pudimos registrar/i)).toBeInTheDocument();
    });
  });

  it("should reset form on success", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    } as Response);

    render(<NewsletterForm />);

    const emailInput = screen.getByLabelText("Email");
    const submitButton = screen.getByRole("button", { name: /recibir guía/i });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect((emailInput as HTMLInputElement).value).toBe("");
    });
  });

  it("should include lead_magnet hidden field", () => {
    render(<NewsletterForm />);

    const hiddenField = screen.getByDisplayValue("7 dias de oracion por la restauracion de tu matrimonio");
    expect(hiddenField).toBeInTheDocument();
  });
});