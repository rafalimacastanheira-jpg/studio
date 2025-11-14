export function Footer() {
  return (
    <footer className="border-t border-border/40">
      <div className="container flex h-16 items-center justify-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} LimaStream • Projeto académico
        </p>
      </div>
    </footer>
  );
}
