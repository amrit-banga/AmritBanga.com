/**
 * Contact page.
 * Uses a Next.js Server Action for form submission + Sonner for toasts.
 * The form itself is a Client Component (needs useActionState + useEffect).
 */
import type { Metadata } from "next";
import { ContactForm } from "./contact-form";
import { Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Amrit Banga — send a message or reach out on X.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight mb-3">
          Get in Touch
        </h1>
        <p className="text-muted-foreground">
          Have a project in mind, a question, or just want to say hi? Fill out
          the form and I&apos;ll get back to you as soon as possible.
        </p>
      </header>

      {/* Alternate contact options */}
      <div className="flex flex-wrap gap-4 mb-10">
        <a
          href="mailto:your@email.com"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <Mail className="h-4 w-4" />
          your@email.com
        </a>
      </div>

      {/* Form (Client Component) */}
      <ContactForm />
    </div>
  );
}
