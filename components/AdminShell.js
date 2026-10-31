import Sidebar from "./Sidebar";

export default function AdminShell({
  children,
  role = "admin",
}) {
  const isSuperAdmin = role === "super_admin";

  return (
    <main
      className={`min-h-screen p-3 sm:p-5 ${
        isSuperAdmin ? "bg-[#E8EAF0]" : "bg-[#EEF1F2]"
      }`}
    >
      <div
        className={`mx-auto flex min-h-[calc(100vh-24px)] max-w-[1600px] overflow-hidden rounded-2xl border-[5px] bg-white shadow-xl sm:min-h-[calc(100vh-40px)] ${
          isSuperAdmin
            ? "border-[#7064FF] bg-[#0F172A]"
            : "border-[#A3ABB5]"
        }`}
      >
        <Sidebar role={role} />

        <section
          className={`min-w-0 flex-1 ${
            isSuperAdmin ? "bg-[#0F172A] text-white" : "bg-[#FBFAF7]"
          }`}
        >
          {children}
        </section>
      </div>
    </main>
  );
}