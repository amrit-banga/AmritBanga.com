"use client";

/**
 * ContactForm — Client Component.
 * Uses React 19's useActionState (replaces useFormState) + server action.
 * Shows Sonner toast on success/error.
 */
import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { submitContactForm, type ContactFormState } from "./actions";

const initialState: ContactFormState = { status: "idle" };

/* ── Submit button with pending state ───────────────────────────────────── */
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Sending…
        </>
      ) : (
        <>
          <Send className="h-4 w-4" />
          Send Message
        </>
      )}
    </Button>
  );
}

/* ── Main form ───────────────────────────────────────────────────────────── */
export function ContactForm() {
  const [state, formAction] = useActionState(submitContactForm, initialState);

  // Show toast when server action responds
  useEffect(() => {
    if (state.status === "success") {
      toast.success("Message sent!", {
        description: "Thanks for reaching out — I'll get back to you soon.",
      });
    } else if (state.status === "error") {
      toast.error("Something went wrong", {
        description: state.message,
      });
    }
  }, [state]);

  return (
    <form action={formAction} className="space-y-5" noValidate>
      {/* Name */}
      <div className="space-y-1.5">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Jane Smith"
          autoComplete="name"
          required
          minLength={2}
          aria-required="true"
        />
      </div>

      {/* Email */}
      <div className="space-y-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="jane@example.com"
          autoComplete="email"
          required
          aria-required="true"
        />
      </div>

      {/* Message */}
      <div className="space-y-1.5">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell me about your project, question, or just say hi…"
          required
          minLength={10}
          rows={6}
          aria-required="true"
        />
      </div>

      {/* Inline error (server-side validation) */}
      {state.status === "error" && (
        <p
          role="alert"
          className="text-sm text-destructive flex items-center gap-1.5"
        >
          {state.message}
        </p>
      )}

      {/* Success message */}
      {state.status === "success" && (
        <p
          role="status"
          className="text-sm text-emerald-600 dark:text-emerald-400 font-medium"
        >
          ✓ Message sent! I'll get back to you soon.
        </p>
      )}

      <SubmitButton />
    </form>
  );
}
