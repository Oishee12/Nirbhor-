import AdminShell from "../../../components/AdminShell";
import PageHeader from "../../../components/PageHeader";

export default function SuperAdminDashboardPage() {
  return (
    <AdminShell role="super_admin">
      <div className="p-5 sm:p-8">
        <PageHeader
          eyebrow="Super Admin / Access Control"
          title="Super Admin Overview"
          subtitle="Manage platform administration, governance and access."
        />

        <section className="mt-6 rounded-xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-base font-semibold">
            Nirbhor Super Admin Portal
          </h2>

          <p className="mt-2 text-sm text-slate-300">
            Standard admin navigation and Super Admin navigation are available here.
          </p>
        </section>
      </div>
    </AdminShell>
  );
}