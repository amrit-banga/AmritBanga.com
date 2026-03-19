"use server";

/**
 * Contact form server action.
 *
 * Currently logs to console — swap the TODO block below with a real
 * email provider (Resend, Nodemailer, etc.) when ready.
 *
 * Returns a discriminated union so the client component can show
 * success/error states without any extra API round-trips.
 */

export type ContactFormState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string };

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // Extract fields
  const name = (formData.get("name") as string | null)?.trim();
  const email = (formData.get("email") as string | null)?.trim();
  const message = (formData.get("message") as string | null)?.trim();

  // ── Validation ───────────────────────────────────────────────────────────
  if (!name || name.length < 2) {
    return { status: "error", message: "Please enter your name." };
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }
  if (!message || message.length < 10) {
    return {
      status: "error",
      message: "Message must be at least 10 characters.",
    };
  }

  // ── TODO: Send email ──────────────────────────────────────────────────────
  // To hook up Resend, install `resend` and replace the console.log below:
  //
  // import { Resend } from "resend";
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // await resend.emails.send({
  //   from: "portfolio@yourdomain.com",
  //   to: process.env.CONTACT_EMAIL!,
  //   subject: `Portfolio contact from ${name}`,
  //   text: `From: ${name} <${email}>\n\n${message}`,
  // });

  console.log("[Contact form submission]", { name, email, message });

  // Simulate a small delay (remove in production)
  await new Promise((resolve) => setTimeout(resolve, 600));

  return { status: "success" };
}
