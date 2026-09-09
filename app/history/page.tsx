"use client";

import { useMemo, useState, type ReactNode } from "react";
import Link from "next/link";

import {
  Menu,
  X,
  Search,
  Bell,
  UserCircle,
  ChevronDown,
  Download,
  Filter,
  CalendarDays,
  Eye,
  MoreVertical,
  Bookmark,
  ClipboardCheck,
  CheckCircle2,
  XCircle,
  TriangleAlert,
  BarChart3,
  ScanLine,
  FileText,
  History as HistoryIcon,
  Home,
  Package,
  Settings,
  CircleHelp,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  ZoomIn,
} from "lucide-react";


/* =========================================================
   PRODUCT IMAGES
   ========================================================= */

const PRODUCT_IMAGES: Record<string, string> = {
  "Fortune Sunlite Oil 1L":
    "https://thanimafresh.nl/cdn/shop/files/IMG_0105.jpg?v=1746781605",

  "Amul Taaza Milk 1L":
    "https://image.aapkabazar.co/product/1722/1698323822743.png?type=webp&width=600",

  "Colgate Strong Teeth 200g":
    "https://asset.sastasundar.com/incom/images/product/thumb/Colgate-Strong-Teeth-Anticavity-Toothpaste-1745391137-10157558-a.jpg",

  "Aashirvaad Atta 5kg":
    "https://www.starquik.com/cdn/shop/files/SQ100275_FOP_6cd630d1-b7d7-4d51-ac3d-6860321c49aa.jpg?v=1776847045&width=416",

  "Surf Excel Easy Wash 1kg":
    "https://m.media-amazon.com/images/I/61m1Pn9lzHL.jpg",

  "Parle-G Original 300g":
    "https://product-images.metro.ca/images/ha5/hac/13961085124638.jpg",

  "Dabur Amla Hair Oil 200ml":
    "https://storage.googleapis.com/tm-zopsmart-uploads/320/20230831/301865_1-20230831-081826.png",
};


/* =========================================================
   EVIDENCE IMAGES
   ONLY 2 IMAGES
   ========================================================= */

const EVIDENCE = [
  {
    image:
      "https://thanimafresh.nl/cdn/shop/files/IMG_0105.jpg?v=1746781605",
    title: "Product Front Label",
    subtitle: "Front packaging captured during inspection",
    tags: ["Brand", "Product Name", "Net Quantity"],
  },

  {
    image:
      "https://www.vridhistores.com/uploads/2023/May/products/16839088534312.jpg",
    title: "Mandatory Label Details",
    subtitle: "Back-label area captured for compliance verification",
    tags: [
      "Batch No.",
      "Mfg. Date",
      "MRP",
      "Declarations",
    ],
  },
];


/* =========================================================
   INSPECTIONS
   ========================================================= */

const inspections = [
  {
    id: "INS-2026-1248",
    product: "Fortune Sunlite Oil 1L",
    category: "Edible Oil",
    brand: "Fortune",
    batch: "FSL25A08",
    date: "28 Aug 2026",
    time: "11:30 AM",
    inspector: "R. Sharma",
    status: "Non-Compliant",
    violations: 2,
    severity: "Critical",
  },

  {
    id: "INS-2026-1246",
    product: "Amul Taaza Milk 1L",
    category: "Milk",
    brand: "Amul",
    batch: "AM0826B",
    date: "27 Aug 2026",
    time: "04:45 PM",
    inspector: "R. Sharma",
    status: "Non-Compliant",
    violations: 1,
    severity: "Minor",
  },

  {
    id: "INS-2026-1245",
    product: "Colgate Strong Teeth 200g",
    category: "Toothpaste",
    brand: "Colgate",
    batch: "CL0726C",
    date: "27 Aug 2026",
    time: "03:20 PM",
    inspector: "A. Singh",
    status: "Compliant",
    violations: 0,
    severity: "—",
  },

  {
    id: "INS-2026-1244",
    product: "Aashirvaad Atta 5kg",
    category: "Wheat Flour",
    brand: "Aashirvaad",
    batch: "AA0826D",
    date: "27 Aug 2026",
    time: "12:10 PM",
    inspector: "P. Verma",
    status: "Non-Compliant",
    violations: 3,
    severity: "Critical",
  },

  {
    id: "INS-2026-1243",
    product: "Surf Excel Easy Wash 1kg",
    category: "Detergent",
    brand: "Surf Excel",
    batch: "SE0826E",
    date: "26 Aug 2026",
    time: "05:50 PM",
    inspector: "M. Patel",
    status: "Compliant",
    violations: 0,
    severity: "—",
  },

  {
    id: "INS-2026-1242",
    product: "Parle-G Original 300g",
    category: "Biscuits",
    brand: "Parle-G",
    batch: "PG0726F",
    date: "26 Aug 2026",
    time: "04:05 PM",
    inspector: "A. Singh",
    status: "Non-Compliant",
    violations: 2,
    severity: "Minor",
  },

  {
    id: "INS-2026-1241",
    product: "Dabur Amla Hair Oil 200ml",
    category: "Hair Oil",
    brand: "Dabur",
    batch: "DA0826G",
    date: "26 Aug 2026",
    time: "11:20 AM",
    inspector: "R. Sharma",
    status: "Compliant",
    violations: 0,
    severity: "—",
  },
];


/* =========================================================
   MAIN PAGE
   ========================================================= */

export default function HistoryPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [search, setSearch] = useState("");

  const [selected, setSelected] =
    useState(inspections[0]);

  const [statusFilter, setStatusFilter] =
    useState("All Inspections");

  const [language, setLanguage] =
    useState("English");

  const [languageOpen, setLanguageOpen] =
    useState(false);

  const [filtersOpen, setFiltersOpen] =
    useState(false);

  const [fontSize, setFontSize] =
    useState<"A-" | "A" | "A+">("A");


  /* =======================================================
     FILTER
     ======================================================= */

  const filteredInspections = useMemo(() => {
    return inspections.filter((item) => {
      const query = search
        .toLowerCase()
        .trim();

      const matchesSearch =
        !query ||
        item.id
          .toLowerCase()
          .includes(query) ||
        item.product
          .toLowerCase()
          .includes(query) ||
        item.brand
          .toLowerCase()
          .includes(query) ||
        item.category
          .toLowerCase()
          .includes(query) ||
        item.batch
          .toLowerCase()
          .includes(query);

      const matchesStatus =
        statusFilter ===
          "All Inspections" ||
        item.status === statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [search, statusFilter]);


  const fontClass =
    fontSize === "A+"
      ? "text-[108%]"
      : fontSize === "A-"
      ? "text-[96%]"
      : "text-[100%]";


  return (
    <main
      className={`min-h-screen bg-[#f1f6f8] text-[#102a43] ${fontClass}`}
    >

      {/* ===================================================
          MOBILE SIDEBAR OVERLAY
      =================================================== */}

      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={() =>
            setSidebarOpen(false)
          }
          className="fixed inset-0 z-40 bg-[#031b2e]/50 lg:hidden"
        />
      )}


      {/* ===================================================
          SIDEBAR
      =================================================== */}

      <aside
        className={`
          fixed left-0 top-0 z-50
          flex h-screen w-[285px]
          flex-col bg-[#062b4a]
          text-white shadow-2xl
          transition-transform duration-300
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
              className="h-[65px] w-[65px] rounded-full bg-white object-cover p-1"
            />

            <div>

              <p className="text-[25px] font-extrabold leading-none">
                Label
                <span className="text-[#62d590]">
                  iq
                </span>
              </p>

              <p className="mt-2 text-[10px] font-bold tracking-[0.12em] text-white/60">
                COMPLIANCE INTELLIGENCE
              </p>

            </div>

          </div>

        </div>


        {/* MENU */}

        <nav className="flex-1 overflow-y-auto px-3 py-5">

          <p className="px-4 pb-2 text-[10px] font-bold uppercase tracking-[0.15em] text-white/40">
            Main Menu
          </p>

          <NavItem
            href="/dashboard"
            icon={<Home size={21} />}
            label="Dashboard"
          />

          <NavItem
            href="/scan"
            icon={<ScanLine size={21} />}
            label="Scan Product"
          />

          <NavItem
            href="/reports"
            icon={<FileText size={21} />}
            label="Reports"
          />

          <NavItem
            href="/history"
            icon={<HistoryIcon size={21} />}
            label="History"
            active
          />

          <NavItem
            href="/register"
            icon={<Package size={21} />}
            label="Products"
          />

          <div className="my-5 border-t border-white/10" />

          <p className="px-4 pb-2 text-[10px] font-bold uppercase tracking-[0.15em] text-white/40">
            System
          </p>

          <NavItem
            href="/settings"
            icon={<Settings size={21} />}
            label="Settings"
          />

          <NavItem
            href="/help"
            icon={<CircleHelp size={21} />}
            label="Help & Support"
          />

        </nav>


        {/* CLOSE */}

        <div className="border-t border-white/10 p-4">

          <button
            type="button"
            onClick={() =>
              setSidebarOpen(false)
            }
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3.5 text-[15px] font-bold text-white/75 hover:bg-white/10 hover:text-white"
          >

            <X size={20} />

            Close Menu

          </button>

        </div>

      </aside>


      {/* ===================================================
          PAGE
      =================================================== */}

      <div className="min-h-screen">


        {/* =================================================
            HEADER
        ================================================= */}

        <header className="sticky top-0 z-30 border-b border-[#d6e1e7] bg-white">

          <div className="flex h-[82px] items-center justify-between px-4 sm:px-6 lg:px-8">

            <div className="flex items-center gap-4">

              <button
                type="button"
                aria-label="Open navigation"
                onClick={() =>
                  setSidebarOpen(
                    (value) => !value
                  )
                }
                className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#d5e0e7] bg-white text-[#12365a] hover:bg-[#edf5f1]"
              >

                {sidebarOpen ? (
                  <X size={25} />
                ) : (
                  <Menu size={25} />
                )}

              </button>


              <div className="hidden h-10 w-px bg-[#d9e2e7] sm:block" />

              <div className="hidden sm:block">

                <p className="text-[15px] font-bold">
                  31 Aug 2026, Monday
                </p>

                <p className="mt-1 text-[13px] text-[#64748b]">
                  07:00 PM
                </p>

              </div>

            </div>


            {/* SEARCH */}

            <div className="mx-6 hidden max-w-[520px] flex-1 lg:flex">

              <div className="flex h-11 w-full items-center rounded-lg border border-[#cbd8e0] bg-white">

                <Search
                  size={19}
                  className="ml-4 text-[#64748b]"
                />

                <input
                  value={search}
                  onChange={(e) =>
                    setSearch(
                      e.target.value
                    )
                  }
                  placeholder="Search product, brand, inspection ID..."
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

                  <span className="hidden sm:block">
                    {language}
                  </span>

                  <span className="sm:hidden">
                    EN
                  </span>

                  <ChevronDown size={15} />

                </button>


                {languageOpen && (

                  <div className="absolute right-0 top-12 z-50 max-h-[330px] w-[175px] overflow-y-auto rounded-lg border border-[#d8e2e8] bg-white p-1 shadow-xl">

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
                          className={`w-full rounded-md px-3 py-2 text-left text-[13px] font-semibold ${
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


              {/* FONT SIZE */}

              <div className="hidden h-10 overflow-hidden rounded-md border border-[#d7e1e7] bg-[#f7fafb] sm:flex">

                {["A-", "A", "A+"].map(
                  (size, index) => (

                    <button
                      key={size}
                      type="button"
                      onClick={() =>
                        setFontSize(
                          size as
                            | "A-"
                            | "A"
                            | "A+"
                        )
                      }
                      className={`px-3 text-[13px] font-bold ${
                        index
                          ? "border-l border-[#d7e1e7]"
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


              {/* NOTIFICATION */}

              <button
                type="button"
                aria-label="Notifications"
                className="relative flex h-11 w-11 items-center justify-center rounded-lg text-[#173b60] hover:bg-[#f1f6f8]"
              >

                <Bell size={22} />

                <span className="absolute right-0.5 top-0 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#d73535] px-1 text-[10px] font-bold text-white">
                  3
                </span>

              </button>


              {/* USER */}

              <div className="hidden items-center gap-2 md:flex">

                <UserCircle
                  size={42}
                  strokeWidth={1.7}
                  className="text-[#12365a]"
                />

                <div>

                  <p className="text-[11px] text-[#64748b]">
                    Welcome,
                  </p>

                  <p className="text-[14px] font-bold">
                    Enforcement Officer
                  </p>

                </div>

                <ChevronDown
                  size={17}
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


        {/* =================================================
            CONTENT
        ================================================= */}

        <div className="space-y-5 p-4 sm:p-6 lg:p-7">


          {/* PAGE TITLE */}

          <section className="flex flex-col justify-between gap-4 xl:flex-row xl:items-end">

            <div>

              <h1 className="text-[34px] font-extrabold tracking-tight">
                Inspection History
              </h1>

              <p className="mt-1.5 text-[16px] font-medium text-[#52657a]">
                View and manage all product compliance inspections
              </p>

            </div>


            <div className="flex flex-wrap gap-2">

              <button
                type="button"
                onClick={() =>
                  setFiltersOpen(
                    (value) => !value
                  )
                }
                className="flex h-10 items-center gap-2 rounded-lg border border-[#ccd9e0] bg-white px-4 text-[13px] font-bold text-[#173b60]"
              >

                <Filter size={17} />

                Filters

              </button>


              <button
                type="button"
                className="flex h-10 items-center gap-2 rounded-lg border border-[#ccd9e0] bg-white px-4 text-[13px] font-bold text-[#173b60]"
              >

                <CalendarDays size={17} />

                22 Aug - 28 Aug

              </button>


              <button
                type="button"
                className="flex h-10 items-center gap-2 rounded-lg bg-[#12365a] px-4 text-[13px] font-bold text-white"
              >

                <Download size={17} />

                Export History

                <ChevronDown size={15} />

              </button>

            </div>

          </section>


          {/* FILTER */}

          {filtersOpen && (

            <section className="rounded-xl border border-[#d7e1e7] bg-white p-5 shadow-sm">

              <div className="flex flex-wrap items-end gap-5">

                <div>

                  <label className="mb-2 block text-[12px] font-bold text-[#52657a]">
                    Status
                  </label>

                  <select
                    value={statusFilter}
                    onChange={(e) =>
                      setStatusFilter(
                        e.target.value
                      )
                    }
                    className="h-10 min-w-[210px] rounded-lg border border-[#ccd9e0] bg-white px-3 text-[13px] font-semibold outline-none"
                  >

                    <option>
                      All Inspections
                    </option>

                    <option>
                      Compliant
                    </option>

                    <option>
                      Non-Compliant
                    </option>

                  </select>

                </div>


                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setStatusFilter(
                      "All Inspections"
                    );
                  }}
                  className="h-10 rounded-lg border border-[#ccd9e0] px-5 text-[13px] font-bold text-[#52657a]"
                >
                  Reset Filters
                </button>

              </div>

            </section>

          )}


          {/* =================================================
              KPI
          ================================================= */}

          <section className="grid grid-cols-2 gap-4 xl:grid-cols-5">

            <KpiCard
              title="Total Inspections"
              value="1,248"
              subtitle="All time"
              icon={
                <ClipboardCheck size={25} />
              }
              type="blue"
            />

            <KpiCard
              title="Compliant"
              value="842"
              extra="67.6%"
              subtitle="All time"
              icon={
                <CheckCircle2 size={25} />
              }
              type="green"
            />

            <KpiCard
              title="Non-Compliant"
              value="406"
              extra="32.4%"
              subtitle="All time"
              icon={
                <XCircle size={25} />
              }
              type="red"
            />

            <KpiCard
              title="Total Violations"
              value="512"
              subtitle="All time"
              icon={
                <TriangleAlert size={25} />
              }
              type="orange"
            />

            <KpiCard
              title="Avg. Violations"
              value="0.41"
              subtitle="Per inspection"
              icon={
                <BarChart3 size={25} />
              }
              type="purple"
            />

          </section>


          {/* TABS */}

          <div className="flex items-center gap-8 border-b border-[#d7e1e7]">

            <button
              type="button"
              onClick={() =>
                setStatusFilter(
                  "All Inspections"
                )
              }
              className={`border-b-[3px] px-2 pb-3 text-[14px] font-bold ${
                statusFilter ===
                "All Inspections"
                  ? "border-[#155dcc] text-[#155dcc]"
                  : "border-transparent text-[#64748b]"
              }`}
            >
              All Inspections
            </button>


            <button
              type="button"
              className="flex items-center gap-2 pb-3 text-[14px] font-semibold text-[#64748b]"
            >

              <Bookmark size={17} />

              Bookmarks

            </button>

          </div>


          {/* MOBILE SEARCH */}

          <div className="lg:hidden">

            <div className="flex h-11 items-center rounded-lg border border-[#ccd9e0] bg-white">

              <Search
                size={18}
                className="ml-3 text-[#64748b]"
              />

              <input
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                placeholder="Search product, brand, inspection ID..."
                className="h-full flex-1 px-3 text-[14px] outline-none"
              />

            </div>

          </div>


          {/* =================================================
              TABLE + DETAILS
          ================================================= */}

          <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_390px]">


            {/* TABLE */}

            <div className="overflow-hidden rounded-xl border border-[#d7e1e7] bg-white shadow-sm">

              <div className="overflow-x-auto">

                <table className="w-full min-w-[1050px]">

                  <thead>

                    <tr className="border-b border-[#dfe7eb] bg-[#f7fafb]">

                      <TableHead>
                        Inspection ID
                      </TableHead>

                      <TableHead>
                        Product Details
                      </TableHead>

                      <TableHead>
                        Brand / Category
                      </TableHead>

                      <TableHead>
                        Date & Time
                      </TableHead>

                      <TableHead>
                        Inspector
                      </TableHead>

                      <TableHead>
                        Status
                      </TableHead>

                      <TableHead>
                        Violations
                      </TableHead>

                      <TableHead>
                        Actions
                      </TableHead>

                    </tr>

                  </thead>


                  <tbody>

                    {filteredInspections.map(
                      (item) => {

                        const active =
                          selected.id ===
                          item.id;

                        return (

                          <tr
                            key={item.id}
                            onClick={() =>
                              setSelected(
                                item
                              )
                            }
                            className={`cursor-pointer border-b border-[#edf1f3] transition hover:bg-[#f7fafb] ${
                              active
                                ? "bg-[#f3f8fb]"
                                : ""
                            }`}
                          >

                            <td className="px-4 py-4">

                              <p className="text-[13px] font-extrabold text-[#173b60]">
                                {item.id}
                              </p>

                              <button
                                type="button"
                                className="mt-2 text-[#64748b]"
                                onClick={(e) =>
                                  e.stopPropagation()
                                }
                              >
                                <Bookmark
                                  size={15}
                                />
                              </button>

                            </td>


                            <td className="px-4 py-4">

                              <div className="flex items-center gap-3">

                                <ProductImage
                                  product={
                                    item.product
                                  }
                                />

                                <div>

                                  <p className="text-[14px] font-extrabold text-[#24364a]">
                                    {item.product}
                                  </p>

                                  <p className="mt-1 text-[12px] text-[#64748b]">
                                    {item.category}
                                  </p>

                                  <p className="mt-0.5 text-[11px] text-[#84909b]">
                                    Batch:{" "}
                                    {item.batch}
                                  </p>

                                </div>

                              </div>

                            </td>


                            <td className="px-4 py-4">

                              <p className="text-[13px] font-semibold">
                                {item.brand}
                              </p>

                              <p className="mt-1 text-[12px] text-[#64748b]">
                                {item.category}
                              </p>

                            </td>


                            <td className="px-4 py-4">

                              <p className="text-[13px] font-semibold">
                                {item.date}
                              </p>

                              <p className="mt-1 text-[12px] text-[#64748b]">
                                {item.time}
                              </p>

                            </td>


                            <td className="px-4 py-4">

                              <p className="text-[13px] font-semibold">
                                {item.inspector}
                              </p>

                            </td>


                            <td className="px-4 py-4">

                              <StatusBadge
                                status={
                                  item.status
                                }
                              />

                            </td>


                            <td className="px-4 py-4">

                              <div className="text-center">

                                <p className="text-[14px] font-extrabold">
                                  {item.violations}
                                </p>

                                <p
                                  className={`mt-1 text-[11px] font-bold ${
                                    item.severity ===
                                    "Critical"
                                      ? "text-[#d23e3e]"
                                      : item.severity ===
                                        "Minor"
                                      ? "text-[#d58a16]"
                                      : "text-[#64748b]"
                                  }`}
                                >
                                  {item.severity}
                                </p>

                              </div>

                            </td>


                            <td className="px-4 py-4">

                              <div className="flex items-center gap-1">

                                <button
                                  type="button"
                                  onClick={(e) =>
                                    e.stopPropagation()
                                  }
                                  className="flex h-9 w-9 items-center justify-center rounded-md text-[#12365a] hover:bg-[#eaf2f7]"
                                >
                                  <Eye size={18} />
                                </button>

                                <button
                                  type="button"
                                  onClick={(e) =>
                                    e.stopPropagation()
                                  }
                                  className="flex h-9 w-9 items-center justify-center rounded-md text-[#52657a] hover:bg-[#edf3f6]"
                                >
                                  <MoreVertical
                                    size={18}
                                  />
                                </button>

                              </div>

                            </td>

                          </tr>

                        );
                      }
                    )}

                  </tbody>

                </table>

              </div>


              {filteredInspections.length ===
                0 && (

                <div className="flex flex-col items-center justify-center py-16">

                  <Search
                    size={42}
                    className="text-[#9baab5]"
                  />

                  <h3 className="mt-4 text-[19px] font-extrabold">
                    No inspections found
                  </h3>

                  <p className="mt-1 text-[14px] text-[#64748b]">
                    Try changing your search or filters.
                  </p>

                </div>

              )}


              {/* PAGINATION */}

              <div className="flex flex-col gap-4 border-t border-[#e1e7ea] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

                <span className="text-[13px] font-medium text-[#64748b]">
                  Showing 1 to 7 of 1,248 inspections
                </span>


                <div className="flex items-center gap-1">

                  <PageButton>
                    <ChevronLeft size={17} />
                  </PageButton>

                  <PageButton active>
                    1
                  </PageButton>

                  <PageButton>
                    2
                  </PageButton>

                  <PageButton>
                    3
                  </PageButton>

                  <PageButton>
                    4
                  </PageButton>

                  <PageButton>
                    <ChevronRight size={17} />
                  </PageButton>

                </div>

              </div>

            </div>


            {/* =================================================
                DETAILS
            ================================================= */}

            <aside className="rounded-xl border border-[#d7e1e7] bg-white p-5 shadow-sm">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-[11px] font-bold uppercase tracking-wide text-[#64748b]">
                    Inspection Details
                  </p>

                  <h2 className="mt-1 text-[20px] font-extrabold">
                    {selected.id}
                  </h2>

                </div>

                <StatusBadge
                  status={
                    selected.status
                  }
                />

              </div>


              {/* PRODUCT CARD */}

              <div className="mt-5 rounded-xl border border-[#dce5ea] bg-[#f9fbfc] p-4">

                <div className="flex gap-4">

                  <ProductImage
                    product={
                      selected.product
                    }
                    large
                  />


                  <div className="min-w-0">

                    <h3 className="text-[17px] font-extrabold text-[#173b60]">
                      {selected.product}
                    </h3>

                    <p className="mt-1 text-[13px] text-[#64748b]">
                      {selected.category}
                    </p>


                    <div className="mt-4 space-y-2">

                      <DetailLine
                        label="Brand"
                        value={
                          selected.brand
                        }
                      />

                      <DetailLine
                        label="Batch"
                        value={
                          selected.batch
                        }
                      />

                      <DetailLine
                        label="Inspector"
                        value={
                          selected.inspector
                        }
                      />

                      <DetailLine
                        label="Net Qty"
                        value="1 Litre"
                      />

                    </div>

                  </div>

                </div>

              </div>


              {/* COMPLIANCE SUMMARY */}

              <div className="mt-4 rounded-xl border border-[#dce5ea] p-4">

                <h3 className="text-[14px] font-extrabold">
                  Compliance Summary
                </h3>


                <div className="mt-3 grid grid-cols-4 gap-2">

                  <MiniStat
                    label="Checked"
                    value="6"
                  />

                  <MiniStat
                    label="Compliant"
                    value="4"
                    color="green"
                  />

                  <MiniStat
                    label="Non-Compliant"
                    value="2"
                    color="red"
                  />

                  <MiniStat
                    label="Violations"
                    value={String(
                      selected.violations
                    )}
                    color="orange"
                  />

                </div>

              </div>


              {/* VIOLATION */}

              <div className="mt-4 rounded-xl border border-[#dce5ea] p-4">

                <div className="flex items-center justify-between">

                  <h3 className="text-[14px] font-extrabold">
                    Violation Overview
                  </h3>

                  <span className="text-[11px] text-[#64748b]">
                    This Inspection
                  </span>

                </div>


                <div className="mt-3 space-y-3">

                  {selected.violations ===
                  0 ? (

                    <div className="flex items-center gap-3 rounded-lg bg-[#eaf6ef] p-3">

                      <CheckCircle2
                        size={21}
                        className="text-[#168548]"
                      />

                      <p className="text-[12px] font-semibold text-[#318052]">
                        No violations detected.
                      </p>

                    </div>

                  ) : (

                    <>

                      <Violation
                        number="1"
                        title="Incorrect MRP Declaration"
                        severity="Critical"
                        color="red"
                      />

                      {selected.violations >=
                        2 && (

                        <Violation
                          number="2"
                          title="Font Size / Readability Issue"
                          severity="Minor"
                          color="orange"
                        />

                      )}

                      {selected.violations >=
                        3 && (

                        <Violation
                          number="3"
                          title="Missing Declaration"
                          severity="Critical"
                          color="red"
                        />

                      )}

                    </>

                  )}

                </div>

              </div>


              {/* =================================================
                  EVIDENCE — ONLY TWO
              ================================================= */}

              <div className="mt-4 rounded-xl border border-[#dce5ea] p-4">

                <div className="flex items-start justify-between">

                  <div>

                    <h3 className="text-[14px] font-extrabold">
                      Photographic Evidence
                    </h3>

                    <p className="mt-1 text-[11px] text-[#64748b]">
                      Evidence captured during product inspection
                    </p>

                  </div>

                  <ShieldCheck
                    size={19}
                    className="text-[#168548]"
                  />

                </div>


                {/* TWO EVIDENCE IMAGES */}

                <div className="mt-4 space-y-4">

                  {EVIDENCE.map(
                    (item, index) => (

                      <EvidenceCard
                        key={item.title}
                        index={index}
                        image={item.image}
                        title={item.title}
                        subtitle={
                          item.subtitle
                        }
                        tags={item.tags}
                      />

                    )
                  )}

                </div>

              </div>


              {/* ACTIONS */}

              <div className="mt-4">

                <h3 className="mb-3 text-[14px] font-extrabold">
                  Actions
                </h3>


                <div className="grid grid-cols-2 gap-2">

                  <Link
                    href="/reports"
                    className="flex items-center justify-center gap-2 rounded-lg border border-[#cfd9e1] py-3 text-[12px] font-bold text-[#155dcc]"
                  >

                    <FileText size={16} />

                    View Report

                  </Link>


                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 rounded-lg border border-[#cfd9e1] py-3 text-[12px] font-bold text-[#d23e3e]"
                  >

                    <Download size={16} />

                    Download PDF

                  </button>


                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 rounded-lg border border-[#cfd9e1] py-3 text-[12px] font-bold text-[#318052]"
                  >

                    <Download size={16} />

                    Export

                  </button>


                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 rounded-lg border border-[#cfd9e1] py-3 text-[12px] font-bold text-[#52657a]"
                  >

                    <Bookmark size={16} />

                    Bookmark

                  </button>

                </div>

              </div>

            </aside>

          </section>

        </div>


        {/* FOOTER */}

        <footer className="mt-4 border-t border-[#d7e1e7] bg-[#082b49] px-5 py-5 text-[12px] text-white/80">

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

    </main>
  );
}


/* =========================================================
   EVIDENCE CARD
   ========================================================= */

function EvidenceCard({
  image,
  title,
  subtitle,
  tags,
  index,
}: {
  image: string;
  title: string;
  subtitle: string;
  tags: string[];
  index: number;
}) {

  return (

    <div className="overflow-hidden rounded-xl border border-[#dce5ea] bg-[#fbfcfd]">

      {/* IMAGE */}

      <div className="relative h-[145px] w-full overflow-hidden bg-[#eef3f5]">

        <img
          src={image}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover"
          onError={(event) => {
            event.currentTarget.style.display =
              "none";
          }}
        />


        {/* EVIDENCE NUMBER */}

        <div className="absolute left-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-[#12365a] text-[11px] font-extrabold text-white shadow-md">
          {index + 1}
        </div>


        {/* ZOOM */}

        <button
          type="button"
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg bg-white/90 text-[#12365a] shadow-md"
        >
          <ZoomIn size={16} />
        </button>


        {/* CAPTURE LABEL */}

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/75 to-transparent px-3 pb-3 pt-8">

          <p className="text-[12px] font-extrabold text-white">
            {title}
          </p>

        </div>

      </div>


      {/* DETAILS */}

      <div className="p-3">

        <p className="text-[11px] font-medium text-[#64748b]">
          {subtitle}
        </p>


        <div className="mt-3 flex flex-wrap gap-1.5">

          {tags.map((tag) => (

            <span
              key={tag}
              className="rounded-full border border-[#cfe0e8] bg-[#f0f6f8] px-2.5 py-1 text-[9px] font-bold text-[#31536b]"
            >
              {tag}
            </span>

          ))}

        </div>

      </div>

    </div>

  );
}


/* =========================================================
   PRODUCT IMAGE
   ========================================================= */

function ProductImage({
  product,
  large = false,
}: {
  product: string;
  large?: boolean;
}) {

  const image =
    PRODUCT_IMAGES[product];


  return (

    <div
      className={
        large
          ? "relative flex h-[145px] w-[105px] shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#dce5ea] bg-white"
          : "relative flex h-[55px] w-[52px] shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[#dce6eb] bg-white"
      }
    >

      <img
        src={image}
        alt={product}
        loading="lazy"
        className="h-full w-full object-contain p-1"
        onError={(event) => {
          event.currentTarget.style.display =
            "none";

          const fallback =
            event.currentTarget.parentElement?.querySelector(
              "[data-product-fallback]"
            ) as HTMLElement | null;

          if (fallback) {
            fallback.style.display =
              "flex";
          }
        }}
      />


      <div
        data-product-fallback
        className="absolute inset-0 hidden items-center justify-center bg-[#eef3f5]"
      >

        <Package
          size={
            large ? 40 : 23
          }
          className="text-[#81929f]"
        />

      </div>

    </div>

  );
}


/* =========================================================
   NAV ITEM
   ========================================================= */

function NavItem({
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
      className={`mb-1 flex items-center gap-3 rounded-lg px-4 py-3.5 text-[15px] font-bold transition ${
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


/* =========================================================
   TABLE HEAD
   ========================================================= */

function TableHead({
  children,
}: {
  children: ReactNode;
}) {

  return (

    <th className="px-4 py-4 text-left text-[11px] font-extrabold uppercase tracking-wide text-[#52657a]">
      {children}
    </th>

  );
}


/* =========================================================
   KPI CARD
   ========================================================= */

function KpiCard({
  title,
  value,
  extra,
  subtitle,
  icon,
  type,
}: {
  title: string;
  value: string;
  extra?: string;
  subtitle: string;
  icon: ReactNode;
  type:
    | "blue"
    | "green"
    | "red"
    | "orange"
    | "purple";
}) {

  const styles = {
    blue: "bg-[#e8f1fb] text-[#155dcc]",
    green: "bg-[#e5f5eb] text-[#168548]",
    red: "bg-[#fbeaea] text-[#d23e3e]",
    orange: "bg-[#fff0dc] text-[#e98219]",
    purple: "bg-[#f1e9fb] text-[#8b4dcc]",
  };


  return (

    <div className="rounded-xl border border-[#d7e1e7] bg-white p-5 shadow-sm">

      <div className="flex items-start justify-between gap-3">

        <div>

          <p className="text-[12px] font-extrabold uppercase tracking-wide text-[#64748b]">
            {title}
          </p>

          <p className="mt-2 text-[30px] font-extrabold tracking-tight text-[#102a43]">

            {value}

            {extra && (

              <span className="ml-1 text-[12px] font-bold text-[#64748b]">
                ({extra})
              </span>

            )}

          </p>

          <p className="mt-1 text-[12px] text-[#64748b]">
            {subtitle}
          </p>

        </div>


        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${styles[type]}`}
        >
          {icon}
        </div>

      </div>

    </div>

  );
}


/* =========================================================
   STATUS
   ========================================================= */

function StatusBadge({
  status,
}: {
  status: string;
}) {

  const compliant =
    status === "Compliant";


  return (

    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold ${
        compliant
          ? "bg-[#e5f5eb] text-[#168548]"
          : "bg-[#fbeaea] text-[#d23e3e]"
      }`}
    >

      {compliant ? (
        <CheckCircle2 size={13} />
      ) : (
        <XCircle size={13} />
      )}

      {status}

    </span>

  );
}


/* =========================================================
   DETAIL LINE
   ========================================================= */

function DetailLine({
  label,
  value,
}: {
  label: string;
  value: string;
}) {

  return (

    <div className="flex gap-2 text-[12px]">

      <span className="w-[60px] shrink-0 font-semibold text-[#64748b]">
        {label}
      </span>

      <span className="font-bold text-[#394554]">
        {value}
      </span>

    </div>

  );
}


/* =========================================================
   MINI STAT
   ========================================================= */

function MiniStat({
  label,
  value,
  color = "blue",
}: {
  label: string;
  value: string;
  color?:
    | "blue"
    | "green"
    | "red"
    | "orange";
}) {

  const colors = {
    blue: "text-[#12365a]",
    green: "text-[#168548]",
    red: "text-[#d23e3e]",
    orange: "text-[#e98219]",
  };


  return (

    <div className="rounded-lg border border-[#e0e7eb] bg-[#fbfcfd] p-2 text-center">

      <p className="text-[9px] font-semibold text-[#64748b]">
        {label}
      </p>

      <p
        className={`mt-1 text-[20px] font-extrabold ${colors[color]}`}
      >
        {value}
      </p>

    </div>

  );
}


/* =========================================================
   VIOLATION
   ========================================================= */

function Violation({
  number,
  title,
  severity,
  color,
}: {
  number: string;
  title: string;
  severity: string;
  color: "red" | "orange";
}) {

  const styles =
    color === "red"
      ? "bg-[#fbeaea] text-[#d23e3e]"
      : "bg-[#fff1df] text-[#e98219]";


  return (

    <div className="flex items-center justify-between gap-3 rounded-lg border border-[#e4eaee] p-3">

      <div className="flex min-w-0 items-center gap-3">

        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-extrabold ${styles}`}
        >
          {number}
        </span>

        <p className="text-[12px] font-bold text-[#394554]">
          {title}
        </p>

      </div>


      <span
        className={`shrink-0 rounded-full px-2.5 py-1 text-[9px] font-bold ${styles}`}
      >
        {severity}
      </span>

    </div>

  );
}


/* =========================================================
   PAGE BUTTON
   ========================================================= */

function PageButton({
  children,
  active = false,
}: {
  children: ReactNode;
  active?: boolean;
}) {

  return (

    <button
      type="button"
      className={`flex h-9 min-w-9 items-center justify-center rounded-md px-2 text-[13px] font-bold ${
        active
          ? "bg-[#12365a] text-white"
          : "text-[#52657a] hover:bg-[#edf3f6]"
      }`}
    >
      {children}
    </button>

  );
}