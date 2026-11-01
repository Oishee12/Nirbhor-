export default function AuthLayout({
  title,
  subtitle,
  children,
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F3F5F4] p-4">

      <div className="grid w-full max-w-6xl overflow-hidden rounded-2xl border border-base-300 bg-white shadow-xl lg:grid-cols-2">

        {/* LEFT BRANDING SECTION */}

        <section className="flex flex-col justify-between bg-[#00695C] p-8 text-white sm:p-12">

          <div>

            <div className="mb-12 flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-xl font-bold">
                N
              </div>

              <div>
                <h1 className="text-lg font-bold">
                  Nirbhor
                </h1>

                <p className="text-xs text-teal-100">
                  Verified Trust Portal
                </p>
              </div>

            </div>


            <h2 className="max-w-md text-3xl font-bold leading-tight sm:text-4xl">
              Join the Trusted Skill Network.
            </h2>

            <p className="mt-5 max-w-md text-sm leading-7 text-teal-50/90">
              Connect with thousands of local opportunities
              and build your verified reputation within
              our community.
            </p>

            <p className="mt-4 text-sm leading-7 text-teal-100">
              নির্ভরযোগ্য সেবার নেটওয়ার্কে যোগ দিন এবং
              আপনার পেশাগত পরিচিতি গড়ে তুলুন।
            </p>

          </div>


          {/* BOTTOM INFORMATION */}

          <div className="mt-12 grid grid-cols-2 gap-3">

            <div className="rounded-xl border border-white/10 bg-white/10 p-4">

              <p className="text-lg font-bold">
                50K+
              </p>

              <p className="mt-1 text-xs text-teal-100">
                Active Providers / সক্রিয় সেবাদাতা
              </p>

            </div>


            <div className="rounded-xl border border-white/10 bg-white/10 p-4">

              <p className="text-lg font-bold">
                Verified
              </p>

              <p className="mt-1 text-xs text-teal-100">
                Trusted Portal / বিশ্বস্ত প্ল্যাটফর্ম
              </p>

            </div>

          </div>

        </section>


        {/* RIGHT FORM SECTION */}

        <section className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">

          <div className="mx-auto w-full max-w-md">

            <h2 className="text-2xl font-bold text-slate-900">
              {title}
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              {subtitle}
            </p>

            <div className="mt-8">
              {children}
            </div>

            <p className="mt-8 text-center text-[10px] tracking-wider text-slate-400">
              VERIFIED TRUST PORTAL • NIRBHOR
            </p>

          </div>

        </section>

      </div>

    </main>
  );
}