"use client";

/**
 * ThemeProvider — wraps next-themes to enable system/dark/light mode.
 * Placed at the root layout so theme is available everywhere.
 * The `attribute="class"` option adds/removes the "dark" class on <html>,
 * which is what our Tailwind v4 @custom-variant dark expects.
 */
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
