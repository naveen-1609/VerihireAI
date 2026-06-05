import type { Metadata } from "next";
import AdminLoginForm from "@/components/admin/AdminLoginForm";

export const metadata: Metadata = {
  title: "Admin Sign In — VeriHire AI",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLoginPage() {
  return (
    <main className="gradient-hero flex min-h-screen items-center px-4 py-16">
      <AdminLoginForm />
    </main>
  );
}
