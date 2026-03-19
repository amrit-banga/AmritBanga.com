export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-center text-sm text-muted-foreground">
          © {year} Amrit Banga. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
