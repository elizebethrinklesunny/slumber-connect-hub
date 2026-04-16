export function Footer() {
  return (
    <footer className="border-t bg-card py-8">
      <div className="mx-auto max-w-7xl px-4 text-center text-sm text-muted-foreground">
        <p className="font-display text-lg font-bold text-foreground">DreamRest</p>
        <p className="mt-2">Premium mattresses for the perfect sleep.</p>
        <p className="mt-4">© {new Date().getFullYear()} DreamRest. All rights reserved.</p>
      </div>
    </footer>
  );
}
