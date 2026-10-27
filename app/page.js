import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen grid place-items-center p-6">
      <section className="card w-full max-w-xl bg-base-100 border border-base-300 shadow-sm">
        <div className="card-body">
          <p className="text-sm font-semibold text-[#00695c]">Nirbhor / নির্ভর</p>
          <h1 className="card-title text-3xl">Verified Trust Portal</h1>
          <p className="text-base-content/70">Frontend foundation is ready.</p>
          <div className="card-actions mt-4">
            <Link className="btn bg-[#00695c] text-white" href="/admin/dashboard">Open Admin Demo</Link>
            <Link className="btn btn-outline" href="/register">Register</Link>
          </div>
        </div>
      </section>
    </main>
  );
}