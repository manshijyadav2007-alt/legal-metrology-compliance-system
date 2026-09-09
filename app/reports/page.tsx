"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";

import {
  Menu,
  X,
  Search,
  Bell,
  CircleHelp,
  UserCircle,
  ChevronDown,
  ChevronRight,
  CalendarDays,
  FileText,
  BarChart3,
  TrendingUp,
  ShieldAlert,
  Building2,
  Sparkles,
  Check,
  Eye,
  Download,
  Mail,
  Clock3,
  Database,
  Package,
  Settings,
  Home,
  ScanLine,
  History,
  SlidersHorizontal,
  Upload,
  Bookmark,
} from "lucide-react";


/* =========================================================
   REPORT TYPES
========================================================= */

const reportTypes = [
  {
    id: "market",
    title: "Market Overview Report",
    description:
      "Comprehensive overview of market trends, price movements, and key insights.",
    icon: <BarChart3 size={23} />,
    tone: "blue",
  },
  {
    id: "price",
    title: "Price Analysis Report",
    description:
      "In-depth analysis of price trends and historical movements.",
    icon: <TrendingUp size={23} />,
    tone: "green",
  },
  {
    id: "supply",
    title: "Supply & Demand Report",
    description:
      "Detailed supply, demand and balance analysis.",
    icon: <BarChart3 size={23} />,
    tone: "orange",
  },
  {
    id: "forecast",
    title: "Forecast Report",
    description:
      "AI-powered price forecast and future outlook.",
    icon: <TrendingUp size={23} />,
    tone: "blue",
  },
  {
    id: "risk",
    title: "Risk & Opportunity Report",
    description:
      "Identify risks, opportunities and market sentiments.",
    icon: <ShieldAlert size={23} />,
    tone: "orange",
  },
  {
    id: "company",
    title: "Company Exposure Report",
    description:
      "Analyze company exposure to commodity price changes.",
    icon: <Building2 size={23} />,
    tone: "purple",
  },
];


/* =========================================================
   COMMODITIES
========================================================= */

const initialCommodities = [
  "Wheat",
  "Rice (Paddy)",
  "Soybean",
  "Cotton",
  "Turmeric",
];


/* =========================================================
   MAIN PAGE
========================================================= */

export default function CreateReportPage() {

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [language, setLanguage] =
    useState("English");

  const [languageOpen, setLanguageOpen] =
    useState(false);

  const [reportType, setReportType] =
    useState("market");

  const [commodities, setCommodities] =
    useState(initialCommodities);

  const [commoditySearch, setCommoditySearch] =
    useState("");

  const [forecast, setForecast] =
    useState(true);

  const [emailReport, setEmailReport] =
    useState(true);

  const [scheduleReport, setScheduleReport] =
    useState(false);

  const [format, setFormat] =
    useState("PDF");

  const [insightDepth, setInsightDepth] =
    useState("Standard");

  const [insightTone, setInsightTone] =
    useState("Neutral");

  const [generated, setGenerated] =
    useState(false);


  /* =======================================================
     REMOVE COMMODITY
  ======================================================= */

  const removeCommodity = (
    name: string
  ) => {
    setCommodities(
      commodities.filter(
        (item) => item !== name
      )
    );
  };


  /* =======================================================
     ADD COMMODITY
  ======================================================= */

  const addCommodity = () => {

    const value =
      commoditySearch.trim();

    if (
      value &&
      !commodities.includes(value)
    ) {
      setCommodities([
        ...commodities,
        value,
      ]);
    }

    setCommoditySearch("");
  };


  return (

    <main className="min-h-screen bg-[#f2f6f8] text-[#102a43]">


      {/* ===================================================
          MOBILE OVERLAY
      =================================================== */}

      {sidebarOpen && (

        <button
          type="button"
          aria-label="Close navigation"
          onClick={() =>
            setSidebarOpen(false)
          }
          className="fixed inset-0 z-40 bg-[#062b4a]/50 lg:hidden"
        />

      )}


      {/* ===================================================
          SIDEBAR
          CLOSED BY DEFAULT
      =================================================== */}

      <aside
        className={`
          fixed left-0 top-0 z-50
          flex h-screen w-[285px]
          flex-col
          bg-[#062b4a]
          text-white
          shadow-2xl
          transition-transform
          duration-300
          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >

        {/* BRAND */}

        <div className="border-b border-white/10 px-5 py-5">

          <div className="flex items-center gap-3">

            <img
              src="/labeliq-logo.png"
              alt="Labeliq"
              className="h-[62px] w-[62px] rounded-full bg-white object-cover p-1"
            />

            <div>

              <p className="text-[25px] font-extrabold leading-none">
                Label
                <span className="text-[#62d590]">
                  iq
                </span>
              </p>

              <p className="mt-2 text-[10px] font-bold tracking-[.12em] text-white/60">
                COMPLIANCE INTELLIGENCE
              </p>

            </div>

          </div>

        </div>


        {/* NAV */}

        <nav className="flex-1 overflow-y-auto px-3 py-5">

          <p className="px-4 pb-2 text-[10px] font-bold uppercase tracking-[.15em] text-white/40">
            Main Menu
          </p>


          <SideItem
            href="/dashboard"
            icon={<Home size={20} />}
            label="Dashboard"
          />

          <SideItem
            href="/scan"
            icon={<ScanLine size={20} />}
            label="Scan Product"
          />

          <SideItem
            href="/reports"
            icon={<FileText size={20} />}
            label="Reports"
            active
          />

          <SideItem
            href="/history"
            icon={<History size={20} />}
            label="History"
          />

          <SideItem
            href="/products"
            icon={<Package size={20} />}
            label="Products"
          />

          <div className="my-5 border-t border-white/10" />

          <p className="px-4 pb-2 text-[10px] font-bold uppercase tracking-[.15em] text-white/40">
            System
          </p>

          <SideItem
            href="/settings"
            icon={<Settings size={20} />}
            label="Settings"
          />

        </nav>


        {/* QUICK ACTION */}

        <div className="border-t border-white/10 p-4">

          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[.15em] text-white/40">
            Quick Actions
          </p>

          <Link
            href="/scan"
            className="flex items-center gap-3 rounded-lg px-3 py-3 text-[14px] font-bold text-white/80 hover:bg-white/10 hover:text-white"
          >
            <ScanLine size={18} />
            Scan Product
          </Link>

          <button
            type="button"
            onClick={() =>
              setSidebarOpen(false)
            }
            className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-3 text-[14px] font-bold text-white/80 hover:bg-white/10 hover:text-white"
          >
            <X size={18} />
            Close Menu
          </button>

        </div>

      </aside>


      {/* ===================================================
          HEADER
      =================================================== */}

      <header className="sticky top-0 z-30 border-b border-[#d7e1e7] bg-white">

        <div className="flex h-[82px] items-center justify-between px-4 sm:px-6 lg:px-8">


          {/* LEFT */}

          <div className="flex items-center gap-4">

            <button
              type="button"
              aria-label="Open navigation"
              onClick={() =>
                setSidebarOpen(
                  (value) => !value
                )
              }
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#ccd9e0] bg-white text-[#12365a] hover:bg-[#edf5f1]"
            >

              {sidebarOpen ? (
                <X size={25} />
              ) : (
                <Menu size={25} />
              )}

            </button>


            <div className="hidden h-10 w-px bg-[#d7e1e7] sm:block" />


            <div className="hidden sm:block">

              <p className="text-[14px] font-bold">
                31 Aug 2026, Monday
              </p>

              <p className="mt-1 text-[12px] text-[#64748b]">
                07:00 PM
              </p>

            </div>

          </div>


          {/* SEARCH */}

          <div className="mx-6 hidden max-w-[530px] flex-1 lg:flex">

            <div className="flex h-11 w-full items-center rounded-lg border border-[#ccd9e0] bg-white">

              <Search
                size={19}
                className="ml-4 text-[#64748b]"
              />

              <input
                placeholder="Search commodities, companies, markets..."
                className="h-full flex-1 bg-transparent px-3 text-[14px] font-medium outline-none"
              />

            </div>

          </div>


          {/* RIGHT */}

          <div className="flex items-center gap-2 sm:gap-3">


            {/* LANGUAGE */}

            <div className="relative">

              <button
                type="button"
                onClick={() =>
                  setLanguageOpen(
                    (value) => !value
                  )
                }
                className="flex h-10 items-center gap-2 rounded-md border border-[#168548] bg-white px-3 text-[13px] font-bold text-[#08783f]"
              >

                <span>
                  {language}
                </span>

                <ChevronDown size={15} />

              </button>


              {languageOpen && (

                <div className="absolute right-0 top-12 z-50 max-h-[330px] w-[180px] overflow-y-auto rounded-lg border border-[#d7e1e7] bg-white p-1 shadow-xl">

                  {[
                    "English",
                    "हिन्दी",
                    "मराठी",
                    "বাংলা",
                    "தமிழ்",
                    "తెలుగు",
                    "ગુજરાતી",
                    "ಕನ್ನಡ",
                    "മലയാളം",
                    "ਪੰਜਾਬੀ",
                  ].map(
                    (lang) => (

                      <button
                        key={lang}
                        type="button"
                        onClick={() => {
                          setLanguage(lang);
                          setLanguageOpen(
                            false
                          );
                        }}
                        className={`w-full rounded-md px-3 py-2.5 text-left text-[13px] font-semibold ${
                          language === lang
                            ? "bg-[#e8f5ee] text-[#08783f]"
                            : "text-[#334155] hover:bg-[#f1f6f8]"
                        }`}
                      >
                        {lang}
                      </button>

                    )
                  )}

                </div>

              )}

            </div>


            {/* HELP */}

            <button
              type="button"
              className="hidden h-10 w-10 items-center justify-center rounded-md text-[#173b60] hover:bg-[#f1f6f8] sm:flex"
            >
              <CircleHelp size={21} />
            </button>


            {/* NOTIFICATION */}

            <button
              type="button"
              className="relative flex h-10 w-10 items-center justify-center rounded-md text-[#173b60]"
            >

              <Bell size={21} />

              <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#d73535] px-1 text-[9px] font-bold text-white">
                3
              </span>

            </button>


            {/* USER */}

            <div className="hidden items-center gap-2 md:flex">

              <UserCircle
                size={41}
                className="text-[#12365a]"
                strokeWidth={1.7}
              />

              <div>

                <p className="text-[11px] text-[#64748b]">
                  Welcome,
                </p>

                <p className="text-[13px] font-extrabold">
                  Enforcement Officer
                </p>

              </div>

              <ChevronDown
                size={16}
                className="text-[#64748b]"
              />

            </div>

          </div>

        </div>


        {/* TRICOLOR */}

        <div className="flex h-[4px]">

          <div className="w-1/3 bg-[#f28b20]" />
          <div className="w-1/3 bg-white" />
          <div className="w-1/3 bg-[#168548]" />

        </div>

      </header>


      {/* ===================================================
          MAIN CONTENT
      =================================================== */}

      <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">


        {/* TITLE */}

        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">

          <div>

            <h1 className="text-[34px] font-extrabold tracking-tight text-[#102a43]">
              Create Custom Report
            </h1>

            <p className="mt-1 text-[16px] font-medium text-[#52657a]">
              Build AI-powered reports and get actionable compliance intelligence.
            </p>

          </div>


          <Link
            href="/reports"
            className="flex h-11 items-center justify-center gap-2 rounded-lg border border-[#aebdca] bg-white px-5 text-[13px] font-bold text-[#173b60] hover:bg-[#f4f8fa]"
          >

            <FileText size={17} />

            View My Reports

          </Link>

        </div>


        {/* =================================================
            MAIN GRID
        ================================================= */}

        <div className="grid gap-5 xl:grid-cols-[410px_minmax(500px,1fr)_330px]">


          {/* =================================================
              LEFT COLUMN
          ================================================= */}

          <div className="space-y-5">


            {/* ===============================================
                REPORT TYPE
            ================================================ */}

            <Card>

              <SectionHeader
                number="1."
                title="SELECT REPORT TYPE"
                description="Choose the type of intelligence report you want to generate."
              />


              <div className="space-y-2.5">

                {reportTypes.map(
                  (item) => {

                    const selected =
                      reportType ===
                      item.id;

                    return (

                      <button
                        key={item.id}
                        type="button"
                        onClick={() =>
                          setReportType(
                            item.id
                          )
                        }
                        className={`flex w-full items-center gap-3 rounded-lg border p-3.5 text-left transition ${
                          selected
                            ? "border-[#5277ad] bg-[#f3f7fd] shadow-sm"
                            : "border-[#e0e7eb] bg-white hover:border-[#b8c9d5] hover:bg-[#f8fafb]"
                        }`}
                      >

                        <IconBox
                          tone={
                            item.tone
                          }
                        >
                          {item.icon}
                        </IconBox>


                        <div className="min-w-0 flex-1">

                          <p className="text-[14px] font-extrabold text-[#24364a]">
                            {item.title}
                          </p>

                          <p className="mt-1 text-[11px] leading-4 text-[#64748b]">
                            {item.description}
                          </p>

                        </div>


                        <span
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                            selected
                              ? "border-[#12365a] bg-[#12365a]"
                              : "border-[#aebbc5]"
                          }`}
                        >

                          {selected && (
                            <span className="h-2 w-2 rounded-full bg-white" />
                          )}

                        </span>

                      </button>

                    );
                  }
                )}

              </div>

            </Card>


            {/* ===============================================
                COMMODITIES
            ================================================ */}

            <Card>

              <SectionHeader
                number="2."
                title="SELECT COMMODITIES / PRODUCTS"
                description="Add commodities or products to include in your report."
              />


              {/* BUTTONS */}

              <div className="flex flex-wrap gap-2">

                <SmallButton
                  active
                  icon={<Package size={15} />}
                >
                  Select Manually
                </SmallButton>

                <SmallButton
                  icon={<Upload size={15} />}
                >
                  Upload List
                </SmallButton>

                <SmallButton
                  icon={<Bookmark size={15} />}
                >
                  Use Watchlist
                </SmallButton>

              </div>


              {/* SEARCH */}

              <div className="mt-4 flex h-10 items-center rounded-lg border border-[#cdd9e0] bg-white">

                <Search
                  size={17}
                  className="ml-3 text-[#71808e]"
                />

                <input
                  value={
                    commoditySearch
                  }
                  onChange={(e) =>
                    setCommoditySearch(
                      e.target.value
                    )
                  }
                  onKeyDown={(e) => {
                    if (
                      e.key ===
                      "Enter"
                    ) {
                      addCommodity();
                    }
                  }}
                  placeholder="Search commodities..."
                  className="h-full flex-1 px-2.5 text-[13px] outline-none"
                />

              </div>


              {/* TAGS */}

              <div className="mt-3 flex flex-wrap gap-2">

                {commodities.map(
                  (item) => (

                    <span
                      key={item}
                      className="flex items-center gap-1.5 rounded-md border border-[#d6e2e8] bg-[#f4f8fa] px-3 py-1.5 text-[11px] font-bold text-[#344c61]"
                    >

                      {item}

                      <button
                        type="button"
                        onClick={() =>
                          removeCommodity(
                            item
                          )
                        }
                        className="text-[#7a8a96] hover:text-[#d23e3e]"
                      >
                        ×
                      </button>

                    </span>

                  )
                )}

              </div>


              <button
                type="button"
                onClick={addCommodity}
                className="mt-4 text-[12px] font-bold text-[#155dcc] hover:underline"
              >
                + Add More Commodities
              </button>

            </Card>

          </div>


          {/* =================================================
              MIDDLE COLUMN
          ================================================= */}

          <div className="space-y-5">


            {/* ===============================================
                PARAMETERS
            ================================================ */}

            <Card>

              <SectionHeader
                number="3."
                title="CONFIGURE REPORT PARAMETERS"
                description="Set parameters and filters for accurate and relevant insights."
              />


              <div className="grid gap-4 sm:grid-cols-2">


                <Field
                  label="Date Range"
                  icon={<CalendarDays size={15} />}
                >
                  <select>
                    <option>
                      01 Aug 2026 - 27 Aug 2026
                    </option>
                    <option>
                      01 Aug 2026 - 31 Aug 2026
                    </option>
                    <option>
                      Last 7 Days
                    </option>
                    <option>
                      Last 30 Days
                    </option>
                  </select>
                </Field>


                <Field label="Comparison Period">
                  <select>
                    <option>
                      Previous Period
                    </option>
                    <option>
                      Previous Month
                    </option>
                    <option>
                      Previous Year
                    </option>
                  </select>
                </Field>


                <Field label="Market / Region">
                  <select>
                    <option>
                      All India
                    </option>
                    <option>
                      North India
                    </option>
                    <option>
                      South India
                    </option>
                    <option>
                      West India
                    </option>
                    <option>
                      East India
                    </option>
                  </select>
                </Field>


                <Field label="Data Frequency">
                  <select>
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                  </select>
                </Field>


                <Field label="Currency / Unit">
                  <select>
                    <option>INR (₹)</option>
                    <option>USD ($)</option>
                  </select>
                </Field>


                <div>

                  <label className="mb-2 block text-[12px] font-bold text-[#52657a]">
                    Include Forecast
                  </label>

                  <div className="flex h-10 items-center gap-3">

                    <button
                      type="button"
                      onClick={() =>
                        setForecast(
                          !forecast
                        )
                      }
                      className={`relative h-6 w-11 rounded-full transition ${
                        forecast
                          ? "bg-[#168548]"
                          : "bg-[#b9c5cc]"
                      }`}
                    >

                      <span
                        className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition ${
                          forecast
                            ? "left-6"
                            : "left-1"
                        }`}
                      />

                    </button>

                    <span className="text-[13px] font-bold">
                      {forecast
                        ? "Yes"
                        : "No"}
                    </span>

                  </div>

                </div>


                <Field label="Report Focus Area">
                  <select>
                    <option>
                      Price, Supply & Demand
                    </option>
                    <option>
                      Price Analysis
                    </option>
                    <option>
                      Supply & Demand
                    </option>
                    <option>
                      Market Risk
                    </option>
                  </select>
                </Field>


                <Field label="Contract Type">
                  <select>
                    <option>
                      Spot & Futures
                    </option>
                    <option>
                      Spot
                    </option>
                    <option>
                      Futures
                    </option>
                  </select>
                </Field>


                <Field label="Data Sources">
                  <select>
                    <option>
                      All Verified Sources
                    </option>
                    <option>
                      Government Sources
                    </option>
                    <option>
                      Market Sources
                    </option>
                  </select>
                </Field>

              </div>

            </Card>


            {/* ===============================================
                AI INTELLIGENCE
            ================================================ */}

            <Card>

              <SectionHeader
                number="4."
                title="AI REPORT INTELLIGENCE"
                description="Choose how AI should analyze and prioritize insights in your report."
              />


              <div className="rounded-xl border border-[#cfe3d8] bg-[#f1f9f4] p-5">

                <div className="grid gap-5 lg:grid-cols-[1fr_180px]">


                  <div>

                    <div className="flex items-start gap-3">

                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#168548] shadow-sm">

                        <Sparkles
                          size={23}
                        />

                      </div>

                      <div>

                        <p className="text-[15px] font-extrabold text-[#173b60]">
                          AI-Powered Analysis
                        </p>

                        <p className="mt-1 text-[12px] leading-5 text-[#52657a]">
                          Our AI will analyze market data,
                          news, global trends and historical
                          patterns to generate intelligent
                          insights and recommendations.
                        </p>

                      </div>

                    </div>


                    <p className="mt-5 text-[12px] font-extrabold">
                      AI will include:
                    </p>


                    <div className="mt-3 grid gap-2 sm:grid-cols-2">

                      {[
                        "Key market highlights",
                        "Price trend analysis",
                        "Supply & demand insights",
                        "Risk factors",
                        "Opportunities",
                        "Outlook & recommendations",
                      ].map(
                        (item) => (

                          <div
                            key={item}
                            className="flex items-center gap-2 text-[11px] font-semibold text-[#40576a]"
                          >

                            <Check
                              size={15}
                              className="shrink-0 text-[#168548]"
                            />

                            {item}

                          </div>

                        )
                      )}

                    </div>

                  </div>


                  {/* AI OPTIONS */}

                  <div className="space-y-4">

                    <SelectField
                      label="AI Insight Depth"
                      value={
                        insightDepth
                      }
                      onChange={
                        setInsightDepth
                      }
                      options={[
                        "Basic",
                        "Standard",
                        "Detailed",
                        "Advanced",
                      ]}
                    />

                    <SelectField
                      label="Insight Tone"
                      value={
                        insightTone
                      }
                      onChange={
                        setInsightTone
                      }
                      options={[
                        "Neutral",
                        "Professional",
                        "Executive",
                        "Technical",
                      ]}
                    />

                  </div>

                </div>

              </div>

            </Card>


            {/* ===============================================
                FORMAT
            ================================================ */}

            <Card>

              <SectionHeader
                number="5."
                title="REPORT FORMAT & DELIVERY"
                description="Choose format and delivery options for your report."
              />


              <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">


                {/* FORMAT */}

                <div>

                  <p className="mb-3 text-[12px] font-extrabold">
                    Report Format
                  </p>

                  <div className="grid grid-cols-4 gap-2">

                    {[
                      {
                        name: "PDF",
                        color:
                          "text-[#d23e3e]",
                      },
                      {
                        name: "PowerPoint",
                        color:
                          "text-[#e98219]",
                      },
                      {
                        name: "Excel",
                        color:
                          "text-[#168548]",
                      },
                      {
                        name: "Word",
                        color:
                          "text-[#155dcc]",
                      },
                    ].map(
                      (item) => (

                        <button
                          type="button"
                          key={item.name}
                          onClick={() =>
                            setFormat(
                              item.name
                            )
                          }
                          className={`flex min-h-[75px] flex-col items-center justify-center gap-2 rounded-lg border text-[10px] font-bold ${
                            format ===
                            item.name
                              ? "border-[#5277ad] bg-[#f3f7fd]"
                              : "border-[#dce4e8] bg-white"
                          }`}
                        >

                          <FileText
                            size={22}
                            className={
                              item.color
                            }
                          />

                          {item.name}

                        </button>

                      )
                    )}

                  </div>

                </div>


                {/* DELIVERY */}

                <div>

                  <p className="mb-3 text-[12px] font-extrabold">
                    Delivery Options
                  </p>


                  <label className="flex items-center gap-2 text-[12px] font-semibold">

                    <input
                      type="checkbox"
                      checked={
                        emailReport
                      }
                      onChange={(e) =>
                        setEmailReport(
                          e.target
                            .checked
                        )
                      }
                      className="h-4 w-4 accent-[#08783f]"
                    />

                    <Mail size={15} />

                    Email Report

                  </label>


                  <input
                    disabled={
                      !emailReport
                    }
                    defaultValue="analytics@labeliq.in"
                    className="mt-2 h-9 w-full rounded-md border border-[#d0dbe1] px-3 text-[11px] outline-none disabled:bg-[#f1f4f5]"
                  />


                  <label className="mt-4 flex items-center gap-2 text-[12px] font-semibold">

                    <input
                      type="checkbox"
                      checked={
                        scheduleReport
                      }
                      onChange={(e) =>
                        setScheduleReport(
                          e.target
                            .checked
                        )
                      }
                      className="h-4 w-4 accent-[#08783f]"
                    />

                    <Clock3 size={15} />

                    Schedule Report

                  </label>

                </div>

              </div>

            </Card>


            {/* ACTIONS */}

            <div className="flex flex-col gap-3 sm:flex-row">

              <button
                type="button"
                onClick={() =>
                  setGenerated(
                    true
                  )
                }
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#102f50] py-4 text-[14px] font-extrabold text-white shadow-lg shadow-[#102f50]/20 transition hover:bg-[#08243d]"
              >

                <Sparkles size={19} />

                {generated
                  ? "Report Generated ✓"
                  : "Generate Report"}

              </button>


              <button
                type="button"
                className="flex flex-1 items-center justify-center gap-2 rounded-lg border-2 border-[#9eafbd] bg-white py-4 text-[14px] font-extrabold text-[#173b60] hover:bg-[#f3f7f9]"
              >

                <Eye size={19} />

                Preview Report

              </button>

            </div>

          </div>


          {/* =================================================
              RIGHT PREVIEW
          ================================================= */}

          <aside className="h-fit rounded-xl border border-[#d7e1e7] bg-white p-4 shadow-sm xl:sticky xl:top-[105px]">

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-[15px] font-extrabold text-[#173b60]">
                  REPORT PREVIEW
                </h2>

                <p className="mt-0.5 text-[10px] text-[#64748b]">
                  Sample
                </p>

              </div>


              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-md text-[#173b60] hover:bg-[#f1f6f8]"
              >

                <Eye size={17} />

              </button>

            </div>


            {/* MOCK REPORT */}

            <div className="mt-4 overflow-hidden rounded-lg border border-[#d7dfe4] bg-white shadow-md">


              {/* MOCK HEADER */}

              <div className="border-b border-[#e2e7ea] p-3">

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-1.5">

                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#edf4f7] text-[#173b60]">

                      <Database
                        size={14}
                      />

                    </div>

                    <div>

                      <p className="text-[6px] font-extrabold text-[#173b60]">
                        LABELIQ
                      </p>

                      <p className="text-[5px] text-[#64748b]">
                        COMPLIANCE INTELLIGENCE
                      </p>

                    </div>

                  </div>


                  <div className="text-right">

                    <p className="text-[5px] font-bold text-[#52657a]">
                      Enforcement Portal
                    </p>

                    <p className="mt-0.5 text-[5px] text-[#94a3af]">
                      31 Aug 2026
                    </p>

                  </div>

                </div>

              </div>


              {/* MOCK TITLE */}

              <div className="p-3">

                <p className="text-[7px] font-extrabold uppercase tracking-wide text-[#173b60]">
                  {reportTypes.find(
                    (item) =>
                      item.id ===
                      reportType
                  )?.title}
                </p>

                <p className="mt-1 text-[5px] text-[#64748b]">
                  01 Aug 2026 - 27 Aug 2026
                </p>


                {/* SUMMARY */}

                <div className="mt-3">

                  <p className="text-[6px] font-extrabold text-[#173b60]">
                    EXECUTIVE SUMMARY
                  </p>

                  <div className="mt-1 space-y-1">

                    <div className="h-1.5 w-full rounded bg-[#edf1f3]" />
                    <div className="h-1.5 w-[92%] rounded bg-[#edf1f3]" />
                    <div className="h-1.5 w-[80%] rounded bg-[#edf1f3]" />

                  </div>

                </div>


                {/* METRICS */}

                <div className="mt-4 grid grid-cols-2 gap-1.5">

                  <PreviewMetric
                    value="₹2,450"
                    label="Avg Price"
                  />

                  <PreviewMetric
                    value="+2.35%"
                    label="Price Change"
                  />

                  <PreviewMetric
                    value="High"
                    label="Risk Level"
                  />

                  <PreviewMetric
                    value="61/100"
                    label="AI Sentiment"
                  />

                </div>


                {/* CHART */}

                <div className="mt-4 rounded border border-[#e4e9ec] p-2">

                  <p className="text-[6px] font-extrabold text-[#173b60]">
                    PRICE TREND — 7 DAYS
                  </p>


                  <div className="relative mt-3 h-[75px]">

                    <div className="absolute inset-x-0 top-1/4 border-t border-dashed border-[#dce3e7]" />

                    <div className="absolute inset-x-0 top-2/4 border-t border-dashed border-[#dce3e7]" />

                    <div className="absolute inset-x-0 top-3/4 border-t border-dashed border-[#dce3e7]" />


                    <svg
                      viewBox="0 0 280 80"
                      className="absolute inset-0 h-full w-full"
                    >

                      <polyline
                        points="5,63 42,48 80,53 118,35 157,41 198,24 238,31 275,13"
                        fill="none"
                        stroke="#168548"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      <polyline
                        points="5,69 42,65 80,68 118,55 157,61 198,50 238,56 275,44"
                        fill="none"
                        stroke="#f28b20"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        opacity=".75"
                      />

                    </svg>

                  </div>

                </div>


                {/* BAR CHART */}

                <div className="mt-3 rounded border border-[#e4e9ec] p-2">

                  <p className="text-[6px] font-extrabold text-[#173b60]">
                    TOP COMMODITIES
                  </p>


                  <div className="mt-3 flex h-[65px] items-end justify-around">

                    <MiniBar
                      height="45%"
                      label="Oil"
                    />

                    <MiniBar
                      height="72%"
                      label="Wheat"
                    />

                    <MiniBar
                      height="58%"
                      label="Rice"
                    />

                    <MiniBar
                      height="82%"
                      label="Cotton"
                    />

                  </div>

                </div>


                {/* HIGHLIGHTS */}

                <div className="mt-3">

                  <p className="text-[6px] font-extrabold text-[#173b60]">
                    KEY HIGHLIGHTS
                  </p>

                  <div className="mt-2 space-y-2">

                    <PreviewLine>
                      Price trends show positive movement.
                    </PreviewLine>

                    <PreviewLine>
                      Supply remains stable across markets.
                    </PreviewLine>

                    <PreviewLine>
                      AI detected moderate market risk.
                    </PreviewLine>

                  </div>

                </div>


                {/* FOOTER */}

                <div className="mt-4 border-t border-[#e7ecef] pt-2">

                  <p className="text-center text-[5px] text-[#94a3af]">
                    AI-generated sample preview • Verified data sources
                  </p>

                </div>

              </div>

            </div>


            {/* REPORT WILL INCLUDE */}

            <div className="mt-5">

              <p className="text-[13px] font-extrabold text-[#173b60]">
                Report will include:
              </p>


              <div className="mt-3 space-y-2">

                {[
                  "Executive Summary",
                  "Commodity-wise Analysis",
                  "Price Trends & Forecast",
                  "Supply & Demand Analysis",
                  "Risk Assessment",
                  "Recommendations",
                ].map(
                  (item) => (

                    <div
                      key={item}
                      className="flex items-center gap-2 text-[11px] font-semibold text-[#52657a]"
                    >

                      <Check
                        size={14}
                        className="text-[#168548]"
                      />

                      {item}

                    </div>

                  )
                )}

              </div>

            </div>


            {/* SECURITY */}

            <div className="mt-5 rounded-lg border border-[#d5e6db] bg-[#f3faf5] p-3">

              <div className="flex gap-3">

                <ShieldAlert
                  size={22}
                  className="shrink-0 text-[#168548]"
                />

                <div>

                  <p className="text-[11px] font-extrabold text-[#173b60]">
                    Secure & Confidential
                  </p>

                  <p className="mt-1 text-[9px] leading-4 text-[#64748b]">
                    All reports are securely processed
                    and accessible only to authorized users.
                  </p>

                </div>

              </div>

            </div>


            {/* DOWNLOAD */}

            <button
              type="button"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-[#ccd9e0] py-3 text-[12px] font-bold text-[#173b60] hover:bg-[#f4f8fa]"
            >

              <Download size={16} />

              Download Sample

            </button>

          </aside>

        </div>

      </div>


      {/* ===================================================
          FOOTER
      =================================================== */}

      <footer className="mt-6 border-t border-[#d7e1e7] bg-[#082b49] px-5 py-5 text-[11px] text-white/80">

        <div className="mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-3 md:flex-row">

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

    </main>
  );
}


/* =========================================================
   SIDEBAR ITEM
========================================================= */

function SideItem({
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
      className={`mb-1 flex items-center gap-3 rounded-lg px-4 py-3.5 text-[14px] font-bold transition ${
        active
          ? "bg-[#168548] text-white shadow-md"
          : "text-white/80 hover:bg-white/10 hover:text-white"
      }`}
    >

      <span className="flex h-6 w-6 items-center justify-center">
        {icon}
      </span>

      {label}

    </Link>

  );
}


/* =========================================================
   CARD
========================================================= */

function Card({
  children,
}: {
  children: ReactNode;
}) {

  return (

    <section className="rounded-xl border border-[#d7e1e7] bg-white p-5 shadow-sm">

      {children}

    </section>

  );
}


/* =========================================================
   SECTION HEADER
========================================================= */

function SectionHeader({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {

  return (

    <div className="mb-5">

      <h2 className="text-[15px] font-extrabold text-[#173b60]">
        {number} {title}
      </h2>

      <p className="mt-1 text-[11px] leading-5 text-[#64748b]">
        {description}
      </p>

    </div>

  );
}


/* =========================================================
   ICON BOX
========================================================= */

function IconBox({
  children,
  tone,
}: {
  children: ReactNode;
  tone: string;
}) {

  const styles: Record<
    string,
    string
  > = {
    blue:
      "bg-[#eaf2fb] text-[#155dcc]",
    green:
      "bg-[#e7f6ed] text-[#168548]",
    orange:
      "bg-[#fff1df] text-[#e98219]",
    purple:
      "bg-[#f1eafb] text-[#8750ba]",
  };


  return (

    <div
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
        styles[tone]
      }`}
    >
      {children}
    </div>

  );
}


/* =========================================================
   SMALL BUTTON
========================================================= */

function SmallButton({
  children,
  active = false,
  icon,
}: {
  children: ReactNode;
  active?: boolean;
  icon?: ReactNode;
}) {

  return (

    <button
      type="button"
      className={`flex items-center gap-1.5 rounded-md border px-3 py-2 text-[11px] font-bold ${
        active
          ? "border-[#5277ad] bg-[#f3f7fd] text-[#173b60]"
          : "border-[#d5dfe5] bg-white text-[#52657a]"
      }`}
    >

      {icon}

      {children}

    </button>

  );
}


/* =========================================================
   FIELD
========================================================= */

function Field({
  label,
  children,
  icon,
}: {
  label: string;
  children: ReactNode;
  icon?: ReactNode;
}) {

  return (

    <div>

      <label className="mb-2 flex items-center gap-1.5 text-[11px] font-bold text-[#52657a]">
        {icon}
        {label}
      </label>

      <div className="relative">

        {children}

        <ChevronDown
          size={14}
          className="pointer-events-none absolute right-3 top-3 text-[#71808e]"
        />

      </div>

    </div>

  );
}


/* =========================================================
   SELECT FIELD
========================================================= */

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (
    value: string
  ) => void;
  options: string[];
}) {

  return (

    <div>

      <label className="mb-2 block text-[10px] font-bold text-[#52657a]">
        {label}
      </label>

      <select
        value={value}
        onChange={(e) =>
          onChange(
            e.target.value
          )
        }
        className="h-9 w-full rounded-md border border-[#cbd9df] bg-white px-2.5 text-[11px] font-semibold text-[#334155] outline-none"
      >

        {options.map(
          (option) => (
            <option key={option}>
              {option}
            </option>
          )
        )}

      </select>

    </div>

  );
}


/* =========================================================
   PREVIEW METRIC
========================================================= */

function PreviewMetric({
  value,
  label,
}: {
  value: string;
  label: string;
}) {

  return (

    <div className="rounded border border-[#e1e7ea] bg-[#f8fafb] p-2">

      <p className="text-[10px] font-extrabold text-[#173b60]">
        {value}
      </p>

      <p className="mt-0.5 text-[5px] text-[#64748b]">
        {label}
      </p>

    </div>

  );
}


/* =========================================================
   MINI BAR
========================================================= */

function MiniBar({
  height,
  label,
}: {
  height: string;
  label: string;
}) {

  return (

    <div className="flex h-full flex-col items-center justify-end gap-1">

      <div
        className="w-7 rounded-t-sm bg-[#168548]"
        style={{
          height,
        }}
      />

      <span className="text-[5px] text-[#64748b]">
        {label}
      </span>

    </div>

  );
}


/* =========================================================
   PREVIEW LINE
========================================================= */

function PreviewLine({
  children,
}: {
  children: ReactNode;
}) {

  return (

    <div className="flex gap-2">

      <span className="mt-0.5 flex h-3 w-3 shrink-0 items-center justify-center rounded-full bg-[#e5f5eb]">

        <Check
          size={8}
          className="text-[#168548]"
        />

      </span>

      <p className="text-[6px] leading-3 text-[#52657a]">
        {children}
      </p>

    </div>

  );
}