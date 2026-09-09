"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Search,
  Bell,
  UserCircle,
  ChevronDown,
  RefreshCw,
  ClipboardCheck,
  CheckCircle2,
  XCircle,
  TriangleAlert,
  ScanLine,
  FileText,
  History,
  Plus,
  Settings,
  CircleHelp,
  Home,
  Package,
  Database,
  Eye,
  ArrowUpRight,
} from "lucide-react";

/* =========================================================
   EXTERNAL IMAGE URL BUILDER
   URLs are split so the browser receives normal HTTPS URLs.
   ========================================================= */

function imageUrl(host: string, path: string) {
  return ["https:", "", host, path].join("/");
}


/* =========================================================
   PRODUCT IMAGES
   ========================================================= */

const productImages = {
  maggi: [
    imageUrl(
      "ecsmedia.pl",
      "/c/makaron-instant-2-minute-noodles-masala-maggi-70g-b-iext156447763.jpg"
    ),
    imageUrl(
      "m.media-amazon.com",
      "/images/I/71Jw9p5JxjL._SL1500_.jpg"
    ),
  ],

  coffee: [
    imageUrl(
      "kunaic.com",
      "/public/uploads/media/njSPbsQL3XFDKuSiK8Pi-1772636984.webp"
    ),
    imageUrl(
      "m.media-amazon.com",
      "/images/I/71mY7H0nK-L._SL1500_.jpg"
    ),
  ],

  tataTea: [
    imageUrl(
      "image.cdn.shpy.in",
      "/219726/1700465603199_51og3I5sEPLSL1100.jpeg?format=webp&width=600"
    ),
    imageUrl(
      "asset.sastasundar.com",
      "/incom/images/product/Tata-Tea-Gold-1548412451-10036446-1.jpg"
    ),
  ],
};


/* =========================================================
   DASHBOARD
   ========================================================= */

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [language, setLanguage] = useState("English");

  const [fontSize, setFontSize] =
    useState<"A-" | "A" | "A+">("A");

  const scaleClass =
    fontSize === "A+"
      ? "text-scale-large"
      : fontSize === "A-"
      ? "text-scale-small"
      : "";

  return (
    <main
      className={`min-h-screen bg-[#f1f6f8] text-[#102a43] ${scaleClass}`}
    >

      {/* =====================================================
          SIDEBAR
          ===================================================== */}

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />


      {/* =====================================================
          MAIN APPLICATION
          ===================================================== */}

      <div className="min-h-screen">


        {/* ===================================================
            HEADER
            =================================================== */}

        <header className="sticky top-0 z-30 border-b border-[#d7e1e7] bg-white">

          <div className="flex h-[82px] items-center justify-between px-4 sm:px-6 lg:px-8">

            {/* LEFT */}

            <div className="flex items-center gap-4">

              <button
                type="button"
                onClick={() =>
                  setSidebarOpen((value) => !value)
                }
                aria-label="Toggle navigation menu"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[#d5e0e7] bg-white text-[#0b3153] transition hover:bg-[#edf6f1]"
              >

                {sidebarOpen ? (
                  <X size={25} strokeWidth={2} />
                ) : (
                  <Menu size={25} strokeWidth={2} />
                )}

              </button>


              <div className="hidden h-10 w-px bg-[#d9e2e7] sm:block" />


              <div className="hidden sm:block">

                <p className="text-[15px] font-bold text-[#172b3d]">
                  31 Aug 2026, Monday
                </p>

                <p className="mt-1 text-[13px] font-medium text-[#64748b]">
                  07:00 PM
                </p>

              </div>

            </div>


            {/* SEARCH */}

            <div className="mx-6 hidden max-w-[560px] flex-1 lg:flex">

              <div className="flex h-11 w-full items-center rounded-lg border border-[#cbd8e0] bg-white">

                <input
                  type="text"
                  placeholder="Search products, inspections, reports..."
                  className="h-full flex-1 bg-transparent px-4 text-[15px] font-medium outline-none placeholder:text-[#8795a3]"
                />

                <button
                  type="button"
                  className="flex h-full w-12 items-center justify-center border-l border-[#dce5ea] text-[#173b60] hover:bg-[#f4f8fa]"
                >
                  <Search size={21} />
                </button>

              </div>

            </div>


            {/* RIGHT */}

            <div className="flex items-center gap-2 sm:gap-3">


              {/* LANGUAGE */}

              <div className="relative hidden sm:block">

                <select
                  value={language}
                  onChange={(e) =>
                    setLanguage(e.target.value)
                  }
                  className="h-10 cursor-pointer appearance-none rounded-md border border-[#168548] bg-white py-0 pl-3 pr-8 text-[14px] font-bold text-[#08783f] outline-none"
                >

                  <option>English</option>
                  <option>हिन्दी</option>
                  <option>मराठी</option>
                  <option>বাংলা</option>
                  <option>தமிழ்</option>
                  <option>తెలుగు</option>
                  <option>ગુજરાતી</option>
                  <option>ಕನ್ನಡ</option>
                  <option>മലയാളം</option>
                  <option>ਪੰਜਾਬੀ</option>

                </select>


                <ChevronDown
                  size={14}
                  className="pointer-events-none absolute right-2 top-[13px]"
                />

              </div>


              {/* FONT SIZE */}

              <div className="hidden h-10 items-center overflow-hidden rounded-md border border-[#d7e1e7] bg-[#f7fafb] sm:flex">

                {(["A-", "A", "A+"] as const).map(
                  (size, index) => (

                    <button
                      key={size}
                      type="button"
                      onClick={() =>
                        setFontSize(size)
                      }
                      className={`h-full px-3 text-[14px] font-bold ${
                        index === 1
                          ? "border-x border-[#d7e1e7]"
                          : ""
                      } ${
                        fontSize === size
                          ? "bg-[#e8f5ee] text-[#08783f]"
                          : "text-[#475569]"
                      }`}
                    >
                      {size}
                    </button>

                  )
                )}

              </div>


              {/* NOTIFICATIONS */}

              <button
                type="button"
                aria-label="Notifications"
                className="relative flex h-11 w-11 items-center justify-center rounded-lg text-[#173b60] hover:bg-[#f1f6f8]"
              >

                <Bell size={23} />

                <span className="absolute right-0.5 top-0 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#d73535] px-1 text-[10px] font-bold text-white">
                  3
                </span>

              </button>


              {/* PROFILE */}

              <div className="hidden items-center gap-2 md:flex">

                <UserCircle
                  size={42}
                  strokeWidth={1.7}
                  className="text-[#12365a]"
                />

                <div>

                  <p className="text-[12px] font-medium text-[#64748b]">
                    Welcome,
                  </p>

                  <p className="text-[15px] font-bold text-[#172b3d]">
                    Enforcement Officer
                  </p>

                </div>

                <ChevronDown
                  size={18}
                  className="text-[#64748b]"
                />

              </div>

            </div>

          </div>


          {/* TRICOLOR LINE */}

          <div className="flex h-[4px]">

            <div className="w-1/3 bg-[#f28b20]" />
            <div className="w-1/3 bg-white" />
            <div className="w-1/3 bg-[#168548]" />

          </div>

        </header>


        {/* ===================================================
            CONTENT
            =================================================== */}

        <div className="space-y-6 p-4 sm:p-6 lg:p-7">


          {/* PAGE TITLE */}

          <section className="flex items-end justify-between">

            <div>

              <h1 className="text-[34px] font-extrabold tracking-[-0.03em] text-[#102a43] sm:text-[38px]">
                Dashboard
              </h1>

              <p className="mt-1.5 text-[16px] font-medium text-[#52657a]">
                Real-time overview of compliance and
                enforcement activities
              </p>

            </div>


            <div className="hidden items-center gap-3 md:flex">

              <span className="text-[12px] font-medium text-[#64748b]">
                Last Updated:
              </span>

              <span className="text-[13px] font-bold">
                31 Aug 2026, 07:00 PM
              </span>

              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-md border border-[#d6e0e6] bg-white"
              >
                <RefreshCw size={17} />
              </button>

            </div>

          </section>


          {/* =================================================
              STAT CARDS
              ================================================= */}

          <section className="grid grid-cols-2 gap-4 xl:grid-cols-4">

            <StatCard
              icon={<ClipboardCheck size={26} />}
              title="Total Inspections"
              value="1,248"
              change="12.5%"
              subtitle="vs previous period"
              type="navy"
            />

            <StatCard
              icon={<CheckCircle2 size={26} />}
              title="Compliant"
              value="842"
              change="15.3%"
              subtitle="of total inspections"
              type="green"
            />

            <StatCard
              icon={<XCircle size={26} />}
              title="Non-Compliant"
              value="346"
              change="8.7%"
              subtitle="of total inspections"
              type="red"
            />

            <StatCard
              icon={<TriangleAlert size={26} />}
              title="Violations Detected"
              value="512"
              change="10.1%"
              subtitle="across all inspections"
              type="orange"
            />

          </section>


          {/* =================================================
              CHARTS
              ================================================= */}

          <section className="grid gap-5 xl:grid-cols-[1.25fr_.9fr]">


            {/* INSPECTION OVERVIEW */}

            <div className="rounded-xl border border-[#d7e1e7] bg-white p-5 sm:p-6">

              <div className="flex items-start justify-between gap-4">

                <div>

                  <h2 className="text-[21px] font-extrabold text-[#102a43]">
                    Inspection Overview
                  </h2>

                  <p className="mt-1 text-[14px] font-medium text-[#64748b]">
                    Inspection activity for the last 7 days
                  </p>

                </div>


                <select className="rounded-md border border-[#d8e2e8] bg-white px-3 py-2 text-[13px] font-bold text-[#173b60]">

                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                  <option>Last 90 Days</option>

                </select>

              </div>


              <div className="mt-5 flex flex-wrap gap-5">

                <Legend
                  color="bg-[#12365a]"
                  label="Total Inspections"
                />

                <Legend
                  color="bg-[#168548]"
                  label="Compliant"
                />

                <Legend
                  color="bg-[#d24747]"
                  label="Non-Compliant"
                />

              </div>


              <InspectionChart />

            </div>


            {/* VIOLATION OVERVIEW */}

            <div className="rounded-xl border border-[#d7e1e7] bg-white p-5 sm:p-6">

              <div className="flex items-start justify-between gap-4">

                <div>

                  <h2 className="text-[21px] font-extrabold text-[#102a43]">
                    Violation Overview
                  </h2>

                  <p className="mt-1 text-[14px] font-medium text-[#64748b]">
                    Distribution across inspections
                  </p>

                </div>


                <span className="rounded-md bg-[#eef5f8] px-3 py-2 text-[12px] font-bold text-[#173b60]">
                  30 Days
                </span>

              </div>


              <div className="mt-6 flex flex-col items-center gap-7 sm:flex-row">

                <ViolationDonut />


                <div className="w-full flex-1 space-y-4">

                  <ViolationItem
                    color="bg-[#12365a]"
                    label="Missing Declarations"
                    value="198"
                    percentage="38.7%"
                  />

                  <ViolationItem
                    color="bg-[#d24747]"
                    label="Incorrect MRP Declaration"
                    value="132"
                    percentage="25.8%"
                  />

                  <ViolationItem
                    color="bg-[#168548]"
                    label="Font Size / Readability Issues"
                    value="96"
                    percentage="18.8%"
                  />

                  <ViolationItem
                    color="bg-[#9561a8]"
                    label="Improper Net Quantity"
                    value="56"
                    percentage="10.9%"
                  />

                  <ViolationItem
                    color="bg-[#f28b20]"
                    label="Other Violations"
                    value="30"
                    percentage="5.8%"
                  />


                  <div className="flex justify-between border-t border-[#e4eaee] pt-3 text-[14px] font-extrabold">

                    <span>Total Violations</span>
                    <span>512</span>

                  </div>

                </div>

              </div>

            </div>

          </section>


          {/* =================================================
              TABLE + ACTIVITY
              ================================================= */}

          <section className="grid gap-5 xl:grid-cols-[1.55fr_.75fr]">


            {/* RECENT INSPECTIONS */}

            <div className="rounded-xl border border-[#d7e1e7] bg-white p-5 sm:p-6">

              <div className="mb-5 flex items-center justify-between">

                <div>

                  <h2 className="text-[21px] font-extrabold">
                    Recent Inspections
                  </h2>

                  <p className="mt-1 text-[14px] font-medium text-[#64748b]">
                    Latest product compliance inspections
                  </p>

                </div>


                <Link
                  href="/history"
                  className="text-[14px] font-bold text-[#168548] hover:underline"
                >
                  View All →
                </Link>

              </div>


              <div className="overflow-x-auto">

                <table className="w-full min-w-[820px]">

                  <thead>

                    <tr className="border-y border-[#e2e8ed] bg-[#f7fafb]">

                      {[
                        "Inspection ID",
                        "Product",
                        "Date & Time",
                        "Inspector",
                        "Status",
                        "Violations",
                        "Action",
                      ].map((head) => (

                        <th
                          key={head}
                          className="px-3 py-3.5 text-left text-[12px] font-extrabold uppercase tracking-wide text-[#52657a]"
                        >
                          {head}
                        </th>

                      ))}

                    </tr>

                  </thead>


                  <tbody>

                    <InspectionRow
                      id="INS-2026-1248"
                      product="Fortune Sunlite Oil 1L"
                      date="31 Aug 2026, 11:30 AM"
                      inspector="R. Sharma"
                      status="Non-Compliant"
                      violations="2"
                    />

                    <InspectionRow
                      id="INS-2026-1247"
                      product="Tata Salt 1kg"
                      date="31 Aug 2026, 10:15 AM"
                      inspector="P. Verma"
                      status="Compliant"
                      violations="0"
                    />

                    <InspectionRow
                      id="INS-2026-1246"
                      product="Amul Taaza Milk 1L"
                      date="30 Aug 2026, 04:45 PM"
                      inspector="R. Sharma"
                      status="Non-Compliant"
                      violations="1"
                    />

                    <InspectionRow
                      id="INS-2026-1245"
                      product="Colgate Strong Teeth 200g"
                      date="30 Aug 2026, 03:20 PM"
                      inspector="A. Singh"
                      status="Compliant"
                      violations="0"
                    />

                    <InspectionRow
                      id="INS-2026-1244"
                      product="Aashirvaad Atta 5kg"
                      date="30 Aug 2026, 12:10 PM"
                      inspector="P. Verma"
                      status="Non-Compliant"
                      violations="3"
                    />

                  </tbody>

                </table>

              </div>


              <div className="mt-5 text-center">

                <Link
                  href="/history"
                  className="text-[14px] font-bold text-[#168548] hover:underline"
                >
                  View All Inspections →
                </Link>

              </div>

            </div>


            {/* ENFORCEMENT ACTIVITY */}

            <div className="rounded-xl border border-[#d7e1e7] bg-white p-5 sm:p-6">

              <div className="mb-5 flex items-center justify-between">

                <div>

                  <h2 className="text-[21px] font-extrabold">
                    Enforcement Activity
                  </h2>

                  <p className="mt-1 text-[14px] font-medium text-[#64748b]">
                    Latest system activity
                  </p>

                </div>


                <Link
                  href="/history"
                  className="text-[14px] font-bold text-[#168548]"
                >
                  View All
                </Link>

              </div>


              <div className="space-y-6">

                <Activity
                  icon={<ScanLine size={21} />}
                  title="New inspection completed"
                  description="Fortune Sunlite Oil 1L"
                  time="11:30 AM"
                  type="orange"
                />

                <Activity
                  icon={<TriangleAlert size={21} />}
                  title="Violation detected"
                  description="Amul Taaza Milk 1L"
                  time="04:45 PM"
                  type="red"
                />

                <Activity
                  icon={<FileText size={21} />}
                  title="Report generated"
                  description="Colgate Strong Teeth 200g"
                  time="03:25 PM"
                  type="navy"
                />

                <Activity
                  icon={<Database size={21} />}
                  title="Products added"
                  description="5 new products added"
                  time="12:15 PM"
                  type="purple"
                />

              </div>

            </div>

          </section>


          {/* =================================================
              PRODUCT INTELLIGENCE + QUICK ACTIONS
              ================================================= */}

          <section className="grid gap-5 lg:grid-cols-[1.2fr_.8fr]">


            {/* PRODUCT INTELLIGENCE */}

            <div className="rounded-xl border border-[#d7e1e7] bg-white p-5 sm:p-6">

              <div className="mb-5 flex items-center justify-between">

                <div>

                  <h2 className="text-[21px] font-extrabold tracking-[-0.01em] text-[#102a43]">
                    Product Intelligence
                  </h2>

                  <p className="mt-1 text-[14px] font-medium text-[#64748b]">
                    Recently scanned packaged products
                  </p>

                </div>


                <Link
                  href="/scan"
                  className="flex items-center gap-1 text-[14px] font-bold text-[#168548] hover:underline"
                >
                  Scan New
                  <ArrowUpRight size={16} />
                </Link>

              </div>


              <div className="grid gap-4 sm:grid-cols-3">


                {/* MAGGI */}

                <ProductCard
                  images={productImages.maggi}
                  name="MAGGI 2-Minute Masala Noodles"
                  category="Packaged Food"
                  status="Compliant"
                />


                {/* NESCAFÉ */}

                <ProductCard
                  images={productImages.coffee}
                  name="NESCAFÉ Classic"
                  category="Instant Coffee"
                  status="Non-Compliant"
                />


                {/* TATA TEA */}

                <ProductCard
                  images={productImages.tataTea}
                  name="Tata Tea Gold"
                  category="Tea & Beverages"
                  status="Compliant"
                />

              </div>

            </div>


            {/* QUICK ACTIONS */}

            <div className="rounded-xl border border-[#d7e1e7] bg-white p-5 sm:p-6">

              <h2 className="text-[21px] font-extrabold tracking-[-0.01em] text-[#102a43]">
                Quick Actions
              </h2>

              <p className="mt-1 text-[14px] font-medium text-[#64748b]">
                Frequently used tools
              </p>


              <div className="mt-5 grid grid-cols-2 gap-3">

                <QuickAction
                  href="/scan"
                  icon={
                    <ScanLine
                      size={27}
                      strokeWidth={1.9}
                    />
                  }
                  title="Scan Product"
                />

                <QuickAction
                  href="/history"
                  icon={
                    <History
                      size={27}
                      strokeWidth={1.9}
                    />
                  }
                  title="View History"
                />

                <QuickAction
                  href="/reports"
                  icon={
                    <FileText
                      size={27}
                      strokeWidth={1.9}
                    />
                  }
                  title="Reports"
                />

                <QuickAction
                  href="/register"
                  icon={
                    <Plus
                      size={27}
                      strokeWidth={1.9}
                    />
                  }
                  title="Add Product"
                />

              </div>

            </div>

          </section>


          {/* =================================================
              INFORMATION BAR
              ================================================= */}

          <div className="flex items-center justify-center gap-2 rounded-lg border border-[#d6e3e9] bg-[#eaf3f6] px-4 py-3 text-[13px] font-medium text-[#52657a]">

            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[#168548] font-extrabold text-[#168548]">
              i
            </span>

            Dashboard data is updated from verified inspection records.

          </div>

        </div>


        {/* ===================================================
            FOOTER
            =================================================== */}

        <footer className="border-t border-[#d7e1e7] bg-[#082b49] px-5 py-5 text-[13px] font-medium text-white/80">

          <div className="flex flex-col items-center justify-between gap-3 md:flex-row">

            <p>
              © 2026 Labeliq. All Rights Reserved.
            </p>

            <div className="flex flex-wrap justify-center gap-5">

              <span>About Us</span>
              <span>Terms of Use</span>
              <span>Privacy Policy</span>
              <span>Accessibility</span>
              <span>Contact Us</span>

            </div>

            <p>
              Compliance Intelligence Portal
            </p>

          </div>

        </footer>

      </div>


      {/* FONT SCALE */}

      <style jsx global>{`

        .text-scale-large {
          font-size: 108%;
        }

        .text-scale-small {
          font-size: 96%;
        }

      `}</style>

    </main>
  );
}


/* ============================================================
   SIDEBAR
============================================================ */

function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {

  return (
    <>

      {isOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-[#031b2e]/40"
        />
      )}


      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-[285px] flex-col bg-[#062b4a] text-white shadow-2xl transition-transform duration-300 ${
          isOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >

        {/* BRAND */}

        <div className="border-b border-white/10 px-5 py-5">

          <div className="flex items-center gap-3">

            <img
              src="/labeliq-logo.png"
              alt="Labeliq"
              className="h-[68px] w-[68px] rounded-full bg-white object-cover p-1"
            />

            <div>

              <p className="text-[25px] font-extrabold leading-none">
                Label
                <span className="text-[#62d590]">
                  iq
                </span>
              </p>

              <p className="mt-2 text-[10px] font-bold tracking-[.13em] text-white/60">
                COMPLIANCE INTELLIGENCE
              </p>

            </div>

          </div>

        </div>


        {/* NAVIGATION */}

        <nav className="flex-1 overflow-y-auto px-3 py-5">

          <p className="px-4 pb-2 text-[10px] font-bold uppercase tracking-[.16em] text-white/40">
            Main Menu
          </p>


          <SidebarLink
            href="/dashboard"
            icon={<Home size={21} />}
            label="Dashboard"
            active
          />

          <SidebarLink
            href="/scan"
            icon={<ScanLine size={21} />}
            label="Scan Product"
          />

          <SidebarLink
            href="/reports"
            icon={<FileText size={21} />}
            label="Reports"
          />

          <SidebarLink
            href="/history"
            icon={<History size={21} />}
            label="Inspection History"
          />

          <SidebarLink
            href="/register"
            icon={<Package size={21} />}
            label="Add Product"
          />


          <div className="my-5 border-t border-white/10" />


          <p className="px-4 pb-2 text-[10px] font-bold uppercase tracking-[.16em] text-white/40">
            System
          </p>


          <SidebarLink
            href="/settings"
            icon={<Settings size={21} />}
            label="Settings"
          />

          <SidebarLink
            href="/help"
            icon={<CircleHelp size={21} />}
            label="Help & Support"
          />

        </nav>


        {/* CLOSE */}

        <div className="border-t border-white/10 p-4">

          <button
            type="button"
            onClick={onClose}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-[14px] font-bold text-white/75 hover:bg-white/10 hover:text-white"
          >

            <X size={20} />

            Close Menu

          </button>

        </div>

      </aside>

    </>
  );
}


/* ============================================================
   SIDEBAR LINK
============================================================ */

function SidebarLink({
  href,
  icon,
  label,
  active = false,
}: {
  href: string;
  icon: ReactNode;
  label: string;
  active?: boolean;
}) {

  return (
    <Link
      href={href}
      className={`mb-1 flex items-center gap-3 rounded-lg px-4 py-3.5 text-[16px] font-bold transition ${
        active
          ? "bg-[#168548] text-white shadow-md"
          : "text-white/80 hover:bg-white/10 hover:text-white"
      }`}
    >

      <span className="flex h-7 w-7 items-center justify-center">
        {icon}
      </span>

      {label}

    </Link>
  );
}


/* ============================================================
   STAT CARD
============================================================ */

function StatCard({
  icon,
  title,
  value,
  change,
  subtitle,
  type,
}: {
  icon: ReactNode;
  title: string;
  value: string;
  change: string;
  subtitle: string;
  type: "navy" | "green" | "red" | "orange";
}) {

  const styles = {
    navy: "bg-[#e9f0f5] text-[#12365a]",
    green: "bg-[#e7f5ec] text-[#168548]",
    red: "bg-[#fbeaea] text-[#d24747]",
    orange: "bg-[#fff1df] text-[#e98219]",
  };


  return (
    <div className="rounded-xl border border-[#d7e1e7] bg-white p-5 sm:p-6">

      <div className="flex items-start justify-between gap-3">

        <div>

          <p className="text-[13px] font-extrabold uppercase tracking-wide text-[#64748b]">
            {title}
          </p>

          <p className="mt-2 text-[35px] font-extrabold tracking-tight text-[#102a43]">
            {value}
          </p>

        </div>


        <div
          className={`flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full ${styles[type]}`}
        >
          {icon}
        </div>

      </div>


      <p className="mt-3 text-[13px] font-bold text-[#168548]">

        ↑ {change}

        <span className="ml-1 font-medium text-[#64748b]">
          {subtitle}
        </span>

      </p>

    </div>
  );
}


/* ============================================================
   LEGEND
============================================================ */

function Legend({
  color,
  label,
}: {
  color: string;
  label: string;
}) {

  return (
    <div className="flex items-center gap-2">

      <span
        className={`h-2.5 w-2.5 rounded-full ${color}`}
      />

      <span className="text-[13px] font-semibold text-[#64748b]">
        {label}
      </span>

    </div>
  );
}


/* ============================================================
   INSPECTION CHART
============================================================ */

function InspectionChart() {

  return (
    <div className="relative mt-5 h-[245px]">

      <div className="absolute inset-0 flex flex-col justify-between pb-6">

        {[1, 2, 3, 4, 5].map((item) => (

          <div
            key={item}
            className="border-t border-dashed border-[#e4eaee]"
          />

        ))}

      </div>


      <svg
        viewBox="0 0 700 220"
        preserveAspectRatio="none"
        className="relative z-10 h-[215px] w-full"
      >

        <polyline
          points="10,165 120,105 230,125 340,115 450,78 560,108 690,62"
          fill="none"
          stroke="#12365a"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />


        <polyline
          points="10,190 120,180 230,140 340,148 450,112 560,151 690,105"
          fill="none"
          stroke="#168548"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />


        <polyline
          points="10,205 120,195 230,170 340,185 450,172 560,195 690,162"
          fill="none"
          stroke="#d24747"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />


        {[
          [10, 165],
          [120, 105],
          [230, 125],
          [340, 115],
          [450, 78],
          [560, 108],
          [690, 62],
        ].map(([x, y], index) => (

          <circle
            key={index}
            cx={x}
            cy={y}
            r="4.5"
            fill="#12365a"
          />

        ))}

      </svg>


      <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[12px] font-medium text-[#64748b]">

        <span>25 Aug</span>
        <span>26 Aug</span>
        <span>27 Aug</span>
        <span>28 Aug</span>
        <span>29 Aug</span>
        <span>30 Aug</span>
        <span>31 Aug</span>

      </div>

    </div>
  );
}


/* ============================================================
   VIOLATION DONUT
============================================================ */

function ViolationDonut() {

  return (
    <div
      className="relative flex h-[180px] w-[180px] shrink-0 items-center justify-center rounded-full"
      style={{
        background:
          "conic-gradient(#12365a 0deg 139deg, #d24747 139deg 232deg, #168548 232deg 300deg, #9561a8 300deg 339deg, #f28b20 339deg 360deg)",
      }}
    >

      <div className="flex h-[112px] w-[112px] flex-col items-center justify-center rounded-full bg-white">

        <span className="text-[30px] font-extrabold">
          512
        </span>

        <span className="text-[12px] font-semibold text-[#64748b]">
          Total
        </span>

        <span className="text-[12px] text-[#64748b]">
          Violations
        </span>

      </div>

    </div>
  );
}


/* ============================================================
   VIOLATION ITEM
============================================================ */

function ViolationItem({
  color,
  label,
  value,
  percentage,
}: {
  color: string;
  label: string;
  value: string;
  percentage: string;
}) {

  return (
    <div className="flex items-center gap-2">

      <span
        className={`h-2.5 w-2.5 shrink-0 rounded-full ${color}`}
      />

      <span className="min-w-0 flex-1 text-[13px] font-medium text-[#394554]">
        {label}
      </span>

      <span className="text-[13px] font-extrabold">
        {value}
      </span>

      <span className="w-12 text-right text-[11px] text-[#64748b]">
        ({percentage})
      </span>

    </div>
  );
}


/* ============================================================
   INSPECTION ROW
============================================================ */

function InspectionRow({
  id,
  product,
  date,
  inspector,
  status,
  violations,
}: {
  id: string;
  product: string;
  date: string;
  inspector: string;
  status: "Compliant" | "Non-Compliant";
  violations: string;
}) {

  const compliant = status === "Compliant";


  return (
    <tr className="border-b border-[#edf1f3] hover:bg-[#f8fbfc]">

      <td className="px-3 py-4 text-[13px] font-bold text-[#173b60]">
        {id}
      </td>

      <td className="px-3 py-4 text-[13px] font-semibold text-[#394554]">
        {product}
      </td>

      <td className="px-3 py-4 text-[13px] font-medium text-[#64748b]">
        {date}
      </td>

      <td className="px-3 py-4 text-[13px] font-medium text-[#394554]">
        {inspector}
      </td>

      <td className="px-3 py-4">

        <span
          className={`rounded-full px-3 py-1.5 text-[11px] font-bold ${
            compliant
              ? "bg-[#e7f5ec] text-[#168548]"
              : "bg-[#fbeaea] text-[#d24747]"
          }`}
        >
          {status}
        </span>

      </td>

      <td className="px-3 py-4 text-[13px] font-extrabold">
        {violations}
      </td>

      <td className="px-3 py-4">

        <Link
          href="/reports"
          aria-label={`View ${id}`}
          className="flex h-8 w-8 items-center justify-center rounded-md text-[#12365a] hover:bg-[#eaf2f7]"
        >

          <Eye size={18} />

        </Link>

      </td>

    </tr>
  );
}


/* ============================================================
   ACTIVITY
============================================================ */

function Activity({
  icon,
  title,
  description,
  time,
  type,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  time: string;
  type: "orange" | "red" | "navy" | "purple";
}) {

  const colors = {
    orange: "bg-[#fff1df] text-[#e98219]",
    red: "bg-[#fbeaea] text-[#d24747]",
    navy: "bg-[#e9f0f5] text-[#12365a]",
    purple: "bg-[#f2eaf5] text-[#9561a8]",
  };


  return (
    <div className="flex gap-3">

      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${colors[type]}`}
      >
        {icon}
      </div>


      <div className="min-w-0 flex-1">

        <div className="flex items-start justify-between gap-2">

          <div>

            <p className="text-[14px] font-extrabold text-[#303d4b]">
              {title}
            </p>

            <p className="mt-1 text-[13px] font-medium text-[#64748b]">
              {description}
            </p>

          </div>


          <span className="shrink-0 text-[12px] font-medium text-[#64748b]">
            {time}
          </span>

        </div>

      </div>

    </div>
  );
}


/* ============================================================
   PRODUCT CARD
   - Uses external images
   - Automatically tries fallback image if first fails
============================================================ */

function ProductCard({
  images,
  name,
  category,
  status,
}: {
  images: string[];
  name: string;
  category: string;
  status: "Compliant" | "Non-Compliant";
}) {

  const [imageIndex, setImageIndex] = useState(0);

  const compliant = status === "Compliant";

  return (
    <article className="group overflow-hidden rounded-xl border border-[#dce5ea] bg-white transition duration-200 hover:-translate-y-1 hover:border-[#168548] hover:shadow-lg">


      {/* PRODUCT IMAGE */}

      <div className="relative flex h-[170px] items-center justify-center overflow-hidden bg-[#f8fafb] p-3">

        <img
          src={images[imageIndex]}
          alt={name}
          className="h-full w-full object-contain transition duration-300 group-hover:scale-[1.04]"
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => {

            if (imageIndex < images.length - 1) {
              setImageIndex((current) => current + 1);
            }

          }}
        />

      </div>


      {/* DETAILS */}

      <div className="p-4">

        <p className="text-[15px] font-extrabold leading-5 text-[#173b60]">
          {name}
        </p>

        <p className="mt-1.5 text-[13px] font-medium text-[#64748b]">
          {category}
        </p>


        <div className="mt-3 flex items-center justify-between gap-2">

          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold ${
              compliant
                ? "bg-[#e7f5ec] text-[#168548]"
                : "bg-[#fbeaea] text-[#d24747]"
            }`}
          >

            {compliant ? (
              <CheckCircle2 size={13} />
            ) : (
              <TriangleAlert size={13} />
            )}

            {status}

          </span>


          <Link
            href="/reports"
            aria-label={`View ${name}`}
            className="flex h-8 w-8 items-center justify-center rounded-md text-[#12365a] hover:bg-[#eaf2f7]"
          >

            <Eye size={17} />

          </Link>

        </div>

      </div>

    </article>
  );
}


/* ============================================================
   QUICK ACTION
============================================================ */

function QuickAction({
  href,
  icon,
  title,
}: {
  href: string;
  icon: ReactNode;
  title: string;
}) {

  return (
    <Link
      href={href}
      className="flex min-h-[105px] flex-col items-center justify-center gap-3 rounded-lg border border-[#dce5ea] bg-[#f8fafb] text-center transition hover:border-[#168548] hover:bg-[#eef8f2]"
    >

      <span className="text-[#12365a]">
        {icon}
      </span>

      <span className="text-[14px] font-extrabold text-[#173b60]">
        {title}
      </span>

    </Link>
  );
}