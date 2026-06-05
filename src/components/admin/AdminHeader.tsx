import { LogOut, Shield, TableProperties } from "lucide-react";

export default function AdminHeader() {
  return (
    <header className="border-b border-border bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy">
            <Shield className="h-5 w-5 text-accent" />
          </div>
          <div>
            <p className="text-sm font-semibold text-navy">Hire Guard Admin</p>
            <p className="text-xs text-muted">Google Sheets entry panel</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-muted sm:flex">
            <TableProperties className="h-3.5 w-3.5" />
            Internal use only
          </div>
          <a
            href="/api/admin/logout"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium text-navy transition-all hover:border-accent/30"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </a>
        </div>
      </div>
    </header>
  );
}
