"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [language, setLanguage] = useState("English");

  const signIn = (event: FormEvent) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError(
        "Enter your email address and password to continue."
      );
      return;
    }

    // Go to dashboard
    router.push("/dashboard");
  };

  const openDemoDashboard = () => {
    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen bg-[#f7f8f7] text-[#071f3d]">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <PortalHeader
        language={language}
        setLanguage={setLanguage}
      />


      {/* =====================================================
          MAIN LOGIN AREA
      ====================================================== */}

      <div className="min-h-[calc(100vh-82px)] px-4 py-8 sm:px-8 lg:flex lg:items-center lg:px-12">

        <div className="mx-auto grid w-full max-w-[1400px] overflow-hidden rounded-xl border border-[#d8e0e4] bg-white shadow-[0_16px_42px_rgba(4,37,66,.12)] lg:grid-cols-[1.08fr_.92fr]">


          {/* =================================================
              LEFT BRANDING PANEL
          ================================================= */}

          <section className="relative overflow-hidden bg-[#032b4f] px-8 py-12 text-white sm:px-14 lg:min-h-[650px] lg:py-16">

            {/* Decorative circles */}

            <div className="absolute -right-24 -top-28 h-[360px] w-[360px] rounded-full border-[42px] border-[#f28b20]/90" />

            <div className="absolute -bottom-40 -left-28 h-[310px] w-[310px] rounded-full border-[35px] border-[#168548]/80" />


            <div className="relative z-10 flex h-full flex-col justify-center">

              {/* BIG LOGO */}

              <Image
                src="/labeliq-logo.png"
                alt="Labeliq logo"
                width={250}
                height={250}
                priority
                className="h-[190px] w-[190px] rounded-full bg-white object-cover p-1 shadow-2xl sm:h-[225px] sm:w-[225px]"
              />


              {/* PORTAL LABEL */}

              <p className="mt-9 text-xl font-semibold tracking-[.22em] text-[#ffae55]">
                LABELIQ PORTAL
              </p>


              {/* MAIN HEADING */}

              <h1 className="mt-4 max-w-[600px] text-4xl font-bold leading-[1.15] sm:text-5xl">

                Smarter labels.
                <br />

                <span className="text-[#62d590]">
                  Clearer decisions.
                </span>

              </h1>


              {/* DESCRIPTION */}

              <p className="mt-6 max-w-[560px] text-lg leading-8 text-[#d4e3ed]">

                Your single, secure workspace for regulatory compliance,
                product intelligence and actionable reporting.

              </p>


              {/* FEATURES */}

              <div className="mt-10 flex flex-wrap gap-3 text-sm font-semibold">

                <span className="rounded-full border border-white/25 bg-white/10 px-4 py-2">
                  ✓ Compliance intelligence
                </span>

                <span className="rounded-full border border-white/25 bg-white/10 px-4 py-2">
                  ✓ Secure access
                </span>

                <span className="rounded-full border border-white/25 bg-white/10 px-4 py-2">
                  ✓ Live reporting
                </span>

              </div>

            </div>

          </section>


          {/* =================================================
              LOGIN FORM
          ================================================= */}

          <section className="flex items-center px-7 py-12 sm:px-14 lg:px-16">

            <div className="w-full">

              <p className="text-sm font-bold tracking-[.16em] text-[#08783f]">
                AUTHORIZED USER ACCESS
              </p>


              <h2 className="mt-3 text-4xl font-bold tracking-tight text-[#071f3d]">
                Welcome back
              </h2>


              <p className="mt-3 text-lg leading-7 text-slate-600">
                Sign in to access your Labeliq intelligence portal.
              </p>


              {/* FORM */}

              <form
                onSubmit={signIn}
                className="mt-9 space-y-6"
              >

                {/* EMAIL */}

                <div>

                  <label className="mb-2 block text-base font-bold">
                    Email address
                  </label>

                  <input
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    type="email"
                    placeholder="name@company.com"
                    className="w-full rounded-md border-2 border-slate-300 px-4 py-3.5 text-base outline-none transition focus:border-[#08783f] focus:ring-4 focus:ring-[#08783f]/10"
                  />

                </div>


                {/* PASSWORD */}

                <div>

                  <div className="mb-2 flex items-center justify-between">

                    <label className="text-base font-bold">
                      Password
                    </label>

                    <button
                      type="button"
                      className="text-sm font-bold text-[#08783f] hover:underline"
                    >
                      Forgot password?
                    </button>

                  </div>


                  <div className="relative">

                    <input
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                      type={show ? "text" : "password"}
                      placeholder="Enter your password"
                      className="w-full rounded-md border-2 border-slate-300 px-4 py-3.5 pr-20 text-base outline-none transition focus:border-[#08783f] focus:ring-4 focus:ring-[#08783f]/10"
                    />

                    <button
                      type="button"
                      onClick={() => setShow(!show)}
                      className="absolute right-4 top-3.5 text-sm font-bold text-[#08783f]"
                    >
                      {show ? "HIDE" : "SHOW"}
                    </button>

                  </div>

                </div>


                {/* ERROR */}

                {error && (
                  <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                    {error}
                  </div>
                )}


                {/* SIGN IN */}

                <button
                  type="submit"
                  className="w-full rounded-md bg-[#08783f] py-4 text-base font-bold text-white shadow-lg shadow-[#08783f]/20 transition hover:bg-[#056333]"
                >
                  Sign in to dashboard →
                </button>

              </form>


              {/* DIVIDER */}

              <div className="my-7 flex items-center gap-3 text-sm text-slate-400">

                <span className="h-px flex-1 bg-slate-200" />

                OR

                <span className="h-px flex-1 bg-slate-200" />

              </div>


              {/* DEMO BUTTON */}

              <button
                onClick={openDemoDashboard}
                className="w-full rounded-md border-2 border-[#0b385f] py-3.5 text-base font-bold text-[#0b385f] transition hover:bg-[#edf5f1]"
              >
                Explore demo dashboard →
              </button>


              {/* REGISTER */}

              <p className="mt-8 text-center text-base text-slate-600">

                New to Labeliq?{" "}

                <Link
                  href="/register"
                  className="font-bold text-[#08783f] underline underline-offset-4"
                >
                  Register your organization
                </Link>

              </p>

            </div>

          </section>

        </div>

      </div>


      {/* =====================================================
          FOOTER
      ====================================================== */}

      <footer className="border-t border-slate-200 bg-white py-4 text-center text-sm text-slate-500">
        © 2026 Labeliq. Insights. Intelligence. Growth.
      </footer>

    </main>
  );
}


/* ============================================================
   HEADER
============================================================ */

function PortalHeader({
  language,
  setLanguage,
}: {
  language: string;
  setLanguage: (language: string) => void;
}) {
  return (

    <header className="relative flex h-[90px] items-center justify-between border-b border-slate-200 bg-white px-5 sm:px-10">

      {/* BRAND */}

      <div className="flex items-center gap-4">

        {/* Bigger Logo */}

        <Image
          src="/labeliq-logo.png"
          alt="Labeliq"
          width={68}
          height={68}
          priority
          className="h-[62px] w-[62px] rounded-full object-cover"
        />


        {/* Bigger Text */}

        <div>

          <p className="text-3xl font-bold leading-none">

            Label
            <span className="text-[#168548]">
              iq
            </span>

          </p>

          <p className="mt-2 text-xs font-bold tracking-[.13em] text-slate-500">

            COMPLIANCE INTELLIGENCE PORTAL

          </p>

        </div>

      </div>


      {/* RIGHT SIDE */}

      <div className="hidden items-center gap-5 sm:flex">

        <span className="text-sm font-semibold text-slate-600">
          Help & Support
        </span>


        <span className="h-7 w-px bg-slate-200" />


        {/* LANGUAGE SELECTOR */}

        <div className="relative">

          <select
            value={language}
            onChange={(e) =>
              setLanguage(e.target.value)
            }
            className="cursor-pointer appearance-none rounded-md border border-[#08783f] bg-white py-2 pl-3 pr-8 text-sm font-semibold text-[#08783f] outline-none focus:ring-2 focus:ring-[#08783f]/20"
          >

            <option>English</option>
            <option>हिन्दी</option>
            <option>বাংলা</option>
            <option>मराठी</option>
            <option>தமிழ்</option>
            <option>తెలుగు</option>
            <option>ગુજરાતી</option>
            <option>ಕನ್ನಡ</option>
            <option>മലയാളം</option>
            <option>ਪੰਜਾਬੀ</option>

          </select>

          <span className="pointer-events-none absolute right-2 top-2.5 text-xs text-[#08783f]">
            ▼
          </span>

        </div>

      </div>


      {/* TRICOLOR LINE */}

      <div className="absolute bottom-0 left-0 h-1 w-1/3 bg-[#f28b20]" />

      <div className="absolute bottom-0 left-1/3 h-1 w-1/3 bg-white" />

      <div className="absolute bottom-0 right-0 h-1 w-1/3 bg-[#168548]" />

    </header>
  );
}