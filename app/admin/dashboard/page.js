import AdminShell from "../../../components/AdminShell";
import PageHeader from "../../../components/PageHeader";

export default function AdminDashboardPage() {
  return (
    <AdminShell role="admin">
      <div className="p-5 sm:p-8">
        <PageHeader
          eyebrow="Admin / প্রশাসন"
          title="Dashboard / ড্যাশবোর্ড"
          subtitle="Manage verifications, reports, users and platform analytics."
        />

        <section className="mt-6 rounded-xl border border-[#D8DFDD] bg-white p-6">
          <h2 className="text-base font-semibold">
            Nirbhor Admin Portal
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Shared layout is ready. Dashboard content will be added in the next commits.
          </p>
        </section>
      </div>
    </AdminShell>
  );
}