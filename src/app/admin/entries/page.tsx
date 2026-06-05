import type { Metadata } from "next";
import AdminHeader from "@/components/admin/AdminHeader";
import SheetEntryForm from "@/components/admin/SheetEntryForm";

export const metadata: Metadata = {
  title: "Sheet Entries — VeriHire AI Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminEntriesPage() {
  return (
    <>
      <AdminHeader />
      <main className="min-h-screen bg-surface py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-navy">
              Add contact entry
            </h1>
            <p className="mt-2 max-w-2xl text-muted">
              Use this internal form to add interested leads and contact details.
              Each submission is appended as a new row in your connected Google
              Sheet.
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8">
            <SheetEntryForm />
          </div>
        </div>
      </main>
    </>
  );
}
