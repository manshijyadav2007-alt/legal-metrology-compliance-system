"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { ChevronDown, CheckCircle2 } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [language, setLanguage] = useState("English");
  const [languageOpen, setLanguageOpen] = useState(false);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    if (data.get("password") !== data.get("confirm")) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[#f7f8f7] text-[#071f3d]">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <header className="relative flex h-[86px] items-center justify-between border-b border-slate-200 bg-white px-5 sm:px-10">

        <Link
          href="/login"
          className="flex items-center gap-4"
        >
          <Image
            src="/labeliq-logo.png"
            alt="Labeliq"
            width={64}
            height={64}
            className="h-16 w-16 rounded-full object-cover"
          />

          <div>
            <p className="text-[28px] font-bold leading-none">
              Label<span className="text-[#168548]">iq</span>
            </p>

            <p className="mt-1 text-[11px] font-bold tracking-[.13em] text-slate-500">
              COMPLIANCE INTELLIGENCE PORTAL
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-4">

          {/* LANGUAGE */}

          <div className="relative hidden sm:block">

            <button
              onClick={() =>
                setLanguageOpen(!languageOpen)
              }
              className="flex h-11 items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 text-sm font-bold text-[#071f3d] transition hover:bg-slate-50"
            >
              {language}
              <ChevronDown size={16} />
            </button>

            {languageOpen && (
              <div className="absolute right-0 top-13 z-50 w-44 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl">

                {[
                  "English",
                  "हिंदी",
                  "मराठी",
                  "বাংলা",
                  "தமிழ்",
                  "తెలుగు",
                  "ગુજરાતી",
                  "ಕನ್ನಡ",
                  "മലയാളം",
                  "ਪੰਜਾਬੀ",
                ].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setLanguage(lang);
                      setLanguageOpen(false);
                    }}
                    className="block w-full px-4 py-3 text-left text-sm font-medium hover:bg-[#eef8f2]"
                  >
                    {lang}
                  </button>
                ))}

              </div>
            )}

          </div>

          {/* LOGIN */}

          <Link
            href="/login"
            className="text-base font-bold text-[#08783f] hover:underline"
          >
            Already registered? Sign in
          </Link>

        </div>

        {/* TRICOLOR STRIP */}

        <div className="absolute bottom-0 left-0 h-1 w-1/2 bg-[#f28b20]" />
        <div className="absolute bottom-0 right-0 h-1 w-1/2 bg-[#168548]" />

      </header>

      {/* =====================================================
          MAIN
      ====================================================== */}

      <div className="mx-auto grid max-w-[1400px] gap-8 px-5 py-10 lg:grid-cols-[.8fr_1.2fr] lg:px-10">

        {/* =================================================
            LEFT PANEL
        ================================================== */}

        <aside className="relative overflow-hidden rounded-xl bg-[#032b4f] p-10 text-white shadow-[0_16px_42px_rgba(4,37,66,.12)] sm:p-12">

          {/* Decorative circles */}

          <div className="absolute -right-24 -top-24 h-[280px] w-[280px] rounded-full border-[35px] border-[#f28b20]/70" />

          <div className="absolute -bottom-32 -left-28 h-[300px] w-[300px] rounded-full border-[35px] border-[#168548]/70" />

          <div className="relative z-10">

            <Image
              src="/labeliq-logo.png"
              alt="Labeliq"
              width={150}
              height={150}
              className="h-[150px] w-[150px] rounded-full bg-white object-cover p-1 shadow-2xl"
            />

            <p className="mt-9 text-sm font-bold tracking-[.18em] text-[#f6a02c]">
              START YOUR JOURNEY
            </p>

            <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
              Create your
              <br />
              Labeliq workspace.
            </h1>

            <p className="mt-6 max-w-[500px] text-lg leading-8 text-[#c9dce9]">
              Register your organization to unlock a clear,
              secure view of your compliance intelligence.
            </p>

            {/* STEPS */}

            <ol className="mt-10 space-y-6">

              <Step
                n="1"
                text="Tell us about your organization"
              />

              <Step
                n="2"
                text="Set up your secure account"
              />

              <Step
                n="3"
                text="Open your dashboard"
              />

            </ol>

            {/* BENEFITS */}

            <div className="mt-10 space-y-3">

              {[
                "Compliance intelligence",
                "Secure organization workspace",
                "AI-powered reporting",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-sm font-semibold text-[#d6e5ee]"
                >
                  <CheckCircle2
                    size={18}
                    className="text-[#62d590]"
                  />
                  {item}
                </div>
              ))}

            </div>

          </div>

        </aside>

        {/* =================================================
            RIGHT FORM
        ================================================== */}

        <section className="rounded-xl border border-slate-200 bg-white p-7 shadow-[0_16px_42px_rgba(4,37,66,.08)] sm:p-10 lg:p-12">

          <p className="text-sm font-bold tracking-[.16em] text-[#08783f]">
            ORGANIZATION REGISTRATION
          </p>

          <h2 className="mt-3 text-4xl font-bold tracking-tight text-[#071f3d]">
            Create your account
          </h2>

          <p className="mt-3 text-lg leading-7 text-slate-500">
            Complete the form below to create your working
            Labeliq demo workspace.
          </p>

          {/* =================================================
              SUCCESS
          ================================================== */}

          {submitted ? (

            <div className="mt-9 rounded-xl border border-[#bfe6cd] bg-[#effaf3] p-8">

              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#08783f] text-white">
                <CheckCircle2 size={30} />
              </div>

              <p className="mt-5 text-2xl font-bold text-[#08783f]">
                Account created successfully!
              </p>

              <p className="mt-2 text-base leading-6 text-slate-600">
                Your Labeliq demo workspace is ready.
              </p>

              <button
                onClick={() =>
                  router.replace("/dashboard")
                }
                className="mt-7 rounded-lg bg-[#08783f] px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-[#08783f]/20 transition hover:bg-[#056333]"
              >
                Open dashboard →
              </button>

            </div>

          ) : (

            /* =================================================
               FORM
            ================================================== */

            <form
              onSubmit={submit}
              className="mt-9 grid gap-6 sm:grid-cols-2"
            >

              {/* FIRST NAME */}

              <Input
                label="First name"
                name="firstName"
              />

              {/* LAST NAME */}

              <Input
                label="Last name"
                name="lastName"
              />

              {/* ORGANIZATION */}

              <Input
                label="Organization name"
                name="company"
                full
              />

              {/* EMAIL */}

              <Input
                label="Work email"
                name="email"
                type="email"
                full
              />

              {/* PHONE */}

              <Input
                label="Phone number"
                name="phone"
                type="tel"
              />

              {/* ORGANIZATION TYPE */}

              <div>

                <label className="mb-2 block text-base font-bold text-[#102944]">
                  Organization type
                </label>

                <select
                  name="type"
                  className="w-full rounded-lg border-2 border-slate-300 bg-white px-4 py-3.5 text-base outline-none transition focus:border-[#08783f] focus:ring-4 focus:ring-[#08783f]/10"
                >
                  <option>
                    Manufacturer
                  </option>

                  <option>
                    Importer
                  </option>

                  <option>
                    Retailer
                  </option>

                  <option>
                    Consultant
                  </option>

                  <option>
                    Distributor
                  </option>

                </select>

              </div>

              {/* PASSWORD */}

              <Input
                label="Password"
                name="password"
                type="password"
              />

              {/* CONFIRM PASSWORD */}

              <Input
                label="Confirm password"
                name="confirm"
                type="password"
              />

              {/* ERROR */}

              {error && (

                <p className="sm:col-span-2 rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
                  {error}
                </p>

              )}

              {/* TERMS */}

              <label className="flex items-start gap-3 text-sm leading-6 text-slate-600 sm:col-span-2">

                <input
                  required
                  type="checkbox"
                  className="mt-1 h-4 w-4 accent-[#08783f]"
                />

                <span>
                  I agree to the{" "}
                  <button
                    type="button"
                    className="font-bold text-[#08783f] hover:underline"
                  >
                    Terms of Use
                  </button>{" "}
                  and{" "}
                  <button
                    type="button"
                    className="font-bold text-[#08783f] hover:underline"
                  >
                    Privacy Policy
                  </button>
                  .
                </span>

              </label>

              {/* SUBMIT */}

              <button
                type="submit"
                className="sm:col-span-2 rounded-lg bg-[#08783f] py-4 text-base font-bold text-white shadow-lg shadow-[#08783f]/20 transition hover:bg-[#056333]"
              >
                Create Labeliq account
              </button>

            </form>

          )}

          {/* BOTTOM */}

          <div className="mt-8 border-t border-slate-200 pt-7 text-center">

            <p className="text-base text-slate-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-bold text-[#08783f] underline underline-offset-4"
              >
                Sign in
              </Link>
            </p>

          </div>

        </section>

      </div>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <footer className="border-t border-slate-200 bg-white py-5 text-center text-sm text-slate-500">
        © 2026 Labeliq. Insights. Intelligence. Growth.
      </footer>

    </main>
  );
}


/* =========================================================
   INPUT COMPONENT
========================================================= */

function Input({
  label,
  name,
  type = "text",
  full = false,
}: {
  label: string;
  name: string;
  type?: string;
  full?: boolean;
}) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>

      <label className="mb-2 block text-base font-bold text-[#102944]">
        {label}
      </label>

      <input
        required
        name={name}
        type={type}
        className="w-full rounded-lg border-2 border-slate-300 px-4 py-3.5 text-base outline-none transition focus:border-[#08783f] focus:ring-4 focus:ring-[#08783f]/10"
      />

    </div>
  );
}


/* =========================================================
   STEP COMPONENT
========================================================= */

function Step({
  n,
  text,
}: {
  n: string;
  text: string;
}) {
  return (
    <li className="flex items-center gap-4">

      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#08783f] text-base font-bold text-white shadow-lg">
        {n}
      </span>

      <span className="text-base font-semibold text-[#d6e5ee]">
        {text}
      </span>

    </li>
  );
}