"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bell,
  Camera,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  Clock3,
  FileBarChart2,
  FileImage,
  History,
  ImagePlus,
  Info,
  Menu,
  Package,
  RotateCcw,
  ScanLine,
  Search,
  Sparkles,
  Upload,
  X,
  Home,
  FileText,
} from "lucide-react";

export default function ScanPage() {
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [language, setLanguage] = useState("English");
  const [languageOpen, setLanguageOpen] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* =====================================================
     CAMERA
  ====================================================== */

  const openCamera = async () => {
    setCameraOpen(true);

    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        alert("Camera is not supported by this browser.");
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: "environment" },
        },
        audio: false,
      });

      streamRef.current = stream;
      setCameraActive(true);
    } catch (error) {
      console.error("Camera error:", error);

      alert(
        "Unable to access the camera. Please allow camera permission and try again."
      );
    }
  };

  useEffect(() => {
    if (!cameraOpen || !cameraActive) return;
    if (!videoRef.current || !streamRef.current) return;

    const video = videoRef.current;

    video.srcObject = streamRef.current;

    video.play().catch((error) => {
      console.error("Video playback error:", error);
    });
  }, [cameraOpen, cameraActive]);

  const closeCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setCameraActive(false);
    setCameraOpen(false);
  };

  const captureImage = () => {
    if (!videoRef.current || !cameraActive) return;

    const video = videoRef.current;

    if (video.videoWidth === 0 || video.videoHeight === 0) {
      alert("Camera is still loading. Please wait a moment.");
      return;
    }

    const canvas = document.createElement("canvas");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");

    if (!context) return;

    context.drawImage(
      video,
      0,
      0,
      canvas.width,
      canvas.height
    );

    const capturedImage = canvas.toDataURL(
      "image/jpeg",
      0.9
    );

    setImagePreview(capturedImage);

    closeCamera();
  };

  const handleUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    closeCamera();

    const imageUrl = URL.createObjectURL(file);

    setImagePreview(imageUrl);
  };

  const startScan = () => {
    if (!imagePreview) {
      alert("Please scan or upload a product image first.");
      return;
    }

    setScanning(true);

    setTimeout(() => {
      setScanning(false);
      router.push("/reports");
    }, 2500);
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current
          .getTracks()
          .forEach((track) => track.stop());
      }
    };
  }, []);

  /* =====================================================
     CLOSE SIDEBAR WHEN ROUTING
  ====================================================== */

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <main className="min-h-screen bg-[#f7f8fa] text-[#102944]">

      {/* =================================================
          MOBILE OVERLAY
      ================================================== */}

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-[40] bg-black/30 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* =================================================
          SIDEBAR
      ================================================== */}

      <aside
        className={`
          fixed inset-y-0 left-0 z-[50]
          flex h-dvh w-[238px] flex-col
          bg-[#062d4d]
          shadow-2xl
          transition-transform duration-300
          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >

        {/* LOGO */}

        <div className="flex h-[142px] shrink-0 items-center gap-4 border-b border-white/10 px-5">

          <div className="flex h-[86px] w-[86px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-white">

            <img
              src="/labeliq-logo.png"
              alt="Labeliq"
              className="h-full w-full object-contain"
            />

          </div>

          <div>

            <p className="text-[32px] font-bold leading-none tracking-tight text-white">
              Label<span className="text-[#4fcf83]">iq</span>
            </p>

            <p className="mt-2 text-[13px] font-bold leading-5 tracking-[.09em] text-[#aebfcd]">
              COMPLIANCE
              <br />
              INTELLIGENCE
            </p>

          </div>

        </div>

        {/* MAIN MENU */}

        <div className="px-2 pt-6">

          <p className="px-5 pb-3 text-[14px] font-bold tracking-[.1em] text-[#8399aa]">
            MAIN MENU
          </p>

          <nav className="space-y-1">

            {/* DASHBOARD */}

            <Link
              href="/dashboard"
              onClick={closeSidebar}
              className="flex h-[70px] items-center gap-5 rounded-xl px-5 text-[20px] font-bold text-[#c9d5df] transition hover:bg-white/10"
            >
              <Home
                size={25}
                strokeWidth={2}
              />

              <span>
                Dashboard
              </span>
            </Link>

            {/* SCAN PRODUCT */}

            <Link
              href="/scan"
              onClick={closeSidebar}
              className="flex h-[70px] items-center gap-5 rounded-xl bg-[#168b4d] px-5 text-[20px] font-bold text-white shadow-sm"
            >
              <ScanLine
                size={25}
                strokeWidth={2}
              />

              <span>
                Scan Product
              </span>
            </Link>

            {/* REPORTS */}

            <Link
              href="/reports"
              onClick={closeSidebar}
              className="flex h-[70px] items-center gap-5 rounded-xl px-5 text-[20px] font-bold text-[#c9d5df] transition hover:bg-white/10"
            >
              <FileText
                size={25}
                strokeWidth={2}
              />

              <span>
                Reports
              </span>
            </Link>

            {/* INSPECTION HISTORY */}

            <Link
              href="/history"
              onClick={closeSidebar}
              className="flex h-[70px] items-center gap-5 rounded-xl px-5 text-[20px] font-bold text-[#c9d5df] transition hover:bg-white/10"
            >
              <History
                size={25}
                strokeWidth={2}
              />

              <span>
                Inspection History
              </span>
            </Link>

            {/* ADD PRODUCT */}

            <Link
              href="/add-product"
              onClick={closeSidebar}
              className="flex h-[70px] items-center gap-5 rounded-xl px-5 text-[20px] font-bold text-[#c9d5df] transition hover:bg-white/10"
            >
              <Package
                size={25}
                strokeWidth={2}
              />

              <span>
                Add Product
              </span>
            </Link>

          </nav>

        </div>

      </aside>

      {/* =================================================
          FIXED MENU TOGGLE
          THIS IS THE IMPORTANT FIX
      ================================================== */}

      <button
        onClick={() =>
          setSidebarOpen((prev) => !prev)
        }
        aria-label={
          sidebarOpen
            ? "Close sidebar"
            : "Open sidebar"
        }
        className={`
          fixed left-5 top-[17px] z-[70]
          flex h-11 w-11
          items-center justify-center
          rounded-lg
          border border-[#d7dfe6]
          bg-white
          text-[#102944]
          shadow-sm
          transition-all duration-200
          hover:bg-[#f4f7f9]
          ${
            sidebarOpen
              ? "border-white/20 bg-white shadow-lg"
              : ""
          }
        `}
      >
        {sidebarOpen ? (
          <X size={22} />
        ) : (
          <Menu size={22} />
        )}
      </button>

      {/* =================================================
          MAIN CONTENT
      ================================================== */}

      <div className="min-h-screen">

        {/* =================================================
            HEADER
        ================================================== */}

        <header className="sticky top-0 z-[30] border-b border-[#dfe5ea] bg-white">

          <div className="flex h-[76px] items-center justify-between gap-4 px-5 pl-[78px] lg:px-7 lg:pl-[82px]">

            {/* LEFT */}

            <div className="flex min-w-0 items-center gap-4">

              <div className="min-w-0">

                <h1 className="truncate text-[22px] font-bold text-[#102944]">
                  Market Scanner
                </h1>

                <p className="hidden text-sm text-[#607086] sm:block">
                  Scan and discover real-time opportunities across products and commodities
                </p>

              </div>

            </div>

            {/* SEARCH */}

            <div className="hidden max-w-[430px] flex-1 lg:flex">

              <div className="relative w-full">

                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#718096]"
                />

                <input
                  placeholder="Search commodities, companies, markets..."
                  className="h-11 w-full rounded-lg border border-[#d7dfe6] bg-white pl-11 pr-4 text-sm outline-none focus:border-[#08783f] focus:ring-4 focus:ring-[#08783f]/10"
                />

              </div>

            </div>

            {/* RIGHT */}

            <div className="flex items-center gap-2 sm:gap-3">

              {/* LANGUAGE */}

              <div className="relative hidden sm:block">

                <button
                  onClick={() =>
                    setLanguageOpen(!languageOpen)
                  }
                  className="flex h-11 items-center gap-2 rounded-lg border border-[#d7dfe6] px-3 text-sm font-bold text-[#102944]"
                >
                  {language}

                  <ChevronDown size={15} />
                </button>

                {languageOpen && (
                  <div className="absolute right-0 top-13 z-50 w-44 overflow-hidden rounded-lg border border-[#d7dfe6] bg-white shadow-xl">

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
                        className="block w-full px-4 py-3 text-left text-sm hover:bg-[#eef8f2]"
                      >
                        {lang}
                      </button>

                    ))}

                  </div>
                )}

              </div>

              {/* NOTIFICATION */}

              <button className="relative flex h-11 w-11 items-center justify-center rounded-lg text-[#102944] hover:bg-[#f4f7f9]">

                <Bell size={20} />

                <span className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#d62828] text-[10px] font-bold text-white">
                  5
                </span>

              </button>

              {/* HELP */}

              <button className="hidden h-11 w-11 items-center justify-center rounded-lg text-[#102944] hover:bg-[#f4f7f9] sm:flex">

                <CircleHelp size={20} />

              </button>

              {/* PROFILE */}

              <button className="flex items-center gap-3 rounded-lg px-2 py-1.5 hover:bg-[#f4f7f9]">

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#102944] text-sm font-bold text-white">
                  A
                </div>

                <div className="hidden text-left xl:block">

                  <p className="text-sm font-bold text-[#102944]">
                    ABC Commodities Pvt. Ltd.
                  </p>

                  <p className="text-xs text-[#718096]">
                    Company User
                  </p>

                </div>

                <ChevronDown
                  size={16}
                  className="hidden text-[#718096] xl:block"
                />

              </button>

            </div>

          </div>

          {/* ACCENT */}

          <div className="flex h-[3px]">
            <div className="w-1/2 bg-[#f28b20]" />
            <div className="w-1/2 bg-[#168548]" />
          </div>

        </header>

        {/* =================================================
            PAGE CONTENT
        ================================================== */}

        <div className="space-y-5 p-5 lg:p-7">

          {/* PAGE TITLE */}

          <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-center">

            <div>

              <p className="flex items-center gap-2 text-xs font-bold tracking-[.12em] text-[#08783f]">

                <Camera size={15} />

                MARKET SCANNER

              </p>

              <h2 className="mt-2 text-[30px] font-bold tracking-tight text-[#102944]">
                Scan Product / Commodity
              </h2>

              <p className="mt-1 text-base text-[#607086]">
                Scan a product label, barcode, or upload an image to get real-time intelligence.
              </p>

            </div>

            <div className="flex gap-3">

              <Link
                href="/history"
                className="flex items-center gap-2 rounded-lg border border-[#d7dfe6] bg-white px-4 py-3 text-sm font-bold text-[#102944]"
              >
                <History size={18} />
                Scan History
              </Link>

              <Link
                href="/reports"
                className="flex items-center gap-2 rounded-lg bg-[#102944] px-5 py-3 text-sm font-bold text-white"
              >
                <FileBarChart2 size={18} />
                Reports
              </Link>

            </div>

          </div>

          {/* =================================================
              MAIN GRID
          ================================================== */}

          <section className="grid gap-5 xl:grid-cols-[1.35fr_.9fr]">

            {/* SCAN CARD */}

            <div className="rounded-xl border border-[#dfe5ea] bg-white p-6 shadow-[0_4px_18px_rgba(16,41,68,.05)]">

              <div className="flex items-start justify-between">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#eaf7ef] text-[#08783f]">
                    <Camera size={21} />
                  </div>

                  <div>

                    <h2 className="text-[20px] font-bold text-[#102944]">
                      Scan Product / Commodity
                    </h2>

                    <p className="mt-1 text-sm text-[#607086]">
                      Scan a label, barcode or upload a product image.
                    </p>

                  </div>

                </div>

              </div>

              {/* EMPTY SCAN STATE */}

              {!imagePreview && (

                <div className="mt-6 rounded-xl border-2 border-dashed border-[#cbd6df] bg-[#f8fafb] p-6">

                  <div className="flex min-h-[370px] flex-col items-center justify-center rounded-xl border border-[#e1e7ec] bg-white px-6 text-center">

                    <div className="flex h-[100px] w-[100px] items-center justify-center rounded-full bg-[#eaf7ef] text-[#08783f]">

                      <Camera
                        size={48}
                        strokeWidth={1.6}
                      />

                    </div>

                    <h3 className="mt-6 text-[23px] font-bold text-[#102944]">
                      Scan or Upload Product
                    </h3>

                    <p className="mt-2 max-w-[500px] text-base leading-6 text-[#607086]">
                      Capture the product label using your camera or upload a clear image for compliance analysis.
                    </p>

                    <div className="mt-8 grid w-full max-w-[520px] gap-4 sm:grid-cols-2">

                      <button
                        onClick={openCamera}
                        className="flex min-h-[78px] items-center justify-center gap-3 rounded-xl bg-[#08783f] px-6 text-base font-bold text-white shadow-lg shadow-[#08783f]/15 transition hover:bg-[#056d38]"
                      >

                        <Camera size={28} />

                        <span>
                          Scan with Camera
                        </span>

                      </button>

                      <button
                        onClick={() =>
                          fileInputRef.current?.click()
                        }
                        className="flex min-h-[78px] items-center justify-center gap-3 rounded-xl border-2 border-[#102944] bg-white px-6 text-base font-bold text-[#102944] transition hover:bg-[#f3f7f9]"
                      >

                        <Upload size={27} />

                        <span>
                          Upload Image
                        </span>

                      </button>

                    </div>

                    <p className="mt-6 text-xs font-medium text-[#718096]">
                      Supports JPG, PNG, barcode and QR code images
                    </p>

                  </div>

                </div>

              )}

              {/* IMAGE PREVIEW */}

              {imagePreview && (

                <div className="mt-6">

                  <div className="relative overflow-hidden rounded-xl bg-[#071b2e]">

                    <img
                      src={imagePreview}
                      alt="Product preview"
                      className="h-[440px] w-full object-contain"
                    />

                    <div className="absolute left-4 top-4 rounded-full bg-[#08783f] px-4 py-2 text-xs font-bold text-white">
                      Image Ready
                    </div>

                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-3">

                    <button
                      onClick={openCamera}
                      className="flex items-center justify-center gap-2 rounded-lg border border-[#d7dfe6] bg-white py-3 text-sm font-bold text-[#102944]"
                    >
                      <Camera size={18} />
                      Scan Again
                    </button>

                    <button
                      onClick={() =>
                        fileInputRef.current?.click()
                      }
                      className="flex items-center justify-center gap-2 rounded-lg border border-[#d7dfe6] bg-white py-3 text-sm font-bold text-[#102944]"
                    >
                      <ImagePlus size={18} />
                      Change Image
                    </button>

                    <button
                      onClick={startScan}
                      className="flex items-center justify-center gap-2 rounded-lg bg-[#08783f] py-3 text-sm font-bold text-white"
                    >
                      <Sparkles size={18} />
                      Analyze
                    </button>

                  </div>

                </div>

              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                onChange={handleUpload}
                className="hidden"
              />

              {/* INFO */}

              <div className="mt-5 flex items-start gap-3 rounded-lg border border-[#dce5f0] bg-[#f5f8fb] px-4 py-3">

                <Info
                  size={18}
                  className="mt-0.5 shrink-0 text-[#102944]"
                />

                <p className="text-sm leading-5 text-[#526078]">
                  Make sure the product name, MRP, net quantity,
                  manufacturer details and other declarations are
                  clearly visible.
                </p>

              </div>

            </div>

            {/* =================================================
                RIGHT SIDE
            ================================================== */}

            <div className="space-y-5">

              {/* HOW IT WORKS */}

              <div className="rounded-xl border border-[#dfe5ea] bg-white p-6 shadow-[0_4px_18px_rgba(16,41,68,.05)]">

                <h2 className="text-[19px] font-bold text-[#102944]">
                  How It Works
                </h2>

                <p className="mt-1 text-sm text-[#607086]">
                  From product image to compliance intelligence.
                </p>

                <div className="mt-6 space-y-6">

                  <ProcessStep
                    number="1"
                    icon={<Camera size={20} />}
                    title="Scan or Upload"
                    text="Capture the label using your camera or upload an image."
                  />

                  <ProcessStep
                    number="2"
                    icon={<FileImage size={20} />}
                    title="OCR & Extraction"
                    text="AI extracts product declarations and important label information."
                  />

                  <ProcessStep
                    number="3"
                    icon={<Sparkles size={20} />}
                    title="AI Compliance Check"
                    text="Extracted information is checked against applicable rules."
                  />

                  <ProcessStep
                    number="4"
                    icon={<FileBarChart2 size={20} />}
                    title="Generate Report"
                    text="Get explainable findings, evidence and compliance insights."
                  />

                </div>

              </div>

              {/* AI INTELLIGENCE */}

              <div className="rounded-xl border border-[#dfe5ea] bg-white p-6 shadow-[0_4px_18px_rgba(16,41,68,.05)]">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#fff4e7] text-[#f28b20]">
                    <Sparkles size={21} />
                  </div>

                  <div>

                    <h2 className="text-[19px] font-bold text-[#102944]">
                      AI Compliance Intelligence
                    </h2>

                    <p className="text-sm text-[#607086]">
                      What Labeliq checks
                    </p>

                  </div>

                </div>

                <div className="mt-5 space-y-3">

                  {[
                    "Mandatory declarations",
                    "MRP declaration",
                    "Net quantity",
                    "Manufacturing / expiry details",
                    "Consumer care information",
                    "Label readability",
                  ].map((item) => (

                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-lg bg-[#f7faf8] px-3 py-3"
                    >

                      <CheckCircle2
                        size={17}
                        className="text-[#08783f]"
                      />

                      <span className="text-sm font-medium text-[#394b60]">
                        {item}
                      </span>

                    </div>

                  ))}

                </div>

              </div>

            </div>

          </section>

          {/* =================================================
              RECENT SCANS
          ================================================== */}

          <section className="rounded-xl border border-[#dfe5ea] bg-white p-6 shadow-[0_4px_18px_rgba(16,41,68,.05)]">

            <div className="mb-5 flex items-center justify-between">

              <div>

                <h2 className="text-[19px] font-bold text-[#102944]">
                  Recent Scans
                </h2>

                <p className="mt-1 text-sm text-[#607086]">
                  Your latest product and commodity scans
                </p>

              </div>

              <Link
                href="/history"
                className="text-sm font-bold text-[#08783f] hover:underline"
              >
                View All →
              </Link>

            </div>

            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">

              <RecentScan
                product="Fortune Sunlite Oil 1L"
                date="28 Aug 2026, 11:30 AM"
                status="Non-Compliant"
                image="https://www.vridhistores.com/uploads/2023/May/products/16839088534312.jpg"
              />

              <RecentScan
                product="Parle-G Biscuits 800g"
                date="27 Aug 2026, 04:45 PM"
                status="Non-Compliant"
                image="https://product-images.metro.ca/images/ha5/hac/13961085124638.jpg"
              />

              <RecentScan
                product="Surf Excel Easy Wash 1kg"
                date="26 Aug 2026, 05:50 PM"
                status="Compliant"
                image="https://m.media-amazon.com/images/I/61m1Pn9lzHL.jpg"
              />

              <RecentScan
                product="Colgate Strong Teeth 200g"
                date="26 Aug 2026, 03:20 PM"
                status="Compliant"
                image="https://img.clevup.in/48107/1640953936212_SKU-1420_0.jpg?format=webp&width=600"
              />

              <RecentScan
                product="NESCAFÉ Classic Coffee 90g"
                date="25 Aug 2026, 10:15 AM"
                status="Compliant"
                image="https://kunaic.com/public/uploads/media/njSPbsQL3XFDKuSiK8Pi-1772636984.webp"
              />

            </div>

            <div className="mt-5 flex items-start gap-3 rounded-lg border border-[#dce5f0] bg-[#f5f8fb] px-4 py-3">

              <Info
                size={18}
                className="mt-0.5 shrink-0 text-[#102944]"
              />

              <p className="text-sm leading-5 text-[#526078]">
                Scanned images are securely stored and can be used
                as supporting evidence in compliance reports.
              </p>

            </div>

          </section>

        </div>

      </div>

      {/* =================================================
          CAMERA MODAL
      ================================================== */}

      {cameraOpen && (

        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#06192b]/75 p-4 backdrop-blur-sm sm:p-8">

          <div className="relative w-full max-w-[1050px] overflow-hidden rounded-2xl border border-white/15 bg-[#071b2e] shadow-2xl">

            <div className="flex items-center justify-between border-b border-white/10 bg-[#0a2540] px-5 py-4 sm:px-7">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#08783f] text-white">
                  <Camera size={21} />
                </div>

                <div>

                  <h2 className="text-lg font-bold text-white sm:text-xl">
                    Scan Product
                  </h2>

                  <p className="text-xs text-white/60 sm:text-sm">
                    Position the product label inside the frame
                  </p>

                </div>

              </div>

              <button
                onClick={closeCamera}
                aria-label="Close camera"
                className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/10 text-white transition hover:bg-white/20"
              >
                <X size={23} />
              </button>

            </div>

            <div className="relative bg-black">

              {cameraActive ? (

                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="h-[62vh] min-h-[420px] max-h-[680px] w-full object-cover"
                />

              ) : (

                <div className="flex h-[62vh] min-h-[420px] max-h-[680px] items-center justify-center">

                  <div className="text-center text-white">

                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#08783f]">
                      <Camera size={38} />
                    </div>

                    <p className="mt-5 text-lg font-bold">
                      Starting camera...
                    </p>

                    <p className="mt-2 text-sm text-white/60">
                      Please allow camera access when prompted.
                    </p>

                  </div>

                </div>

              )}

              {cameraActive && (

                <div className="pointer-events-none absolute inset-0">

                  <div className="absolute left-[8%] top-[8%] h-16 w-16 border-l-[4px] border-t-[4px] border-white sm:h-20 sm:w-20" />

                  <div className="absolute right-[8%] top-[8%] h-16 w-16 border-r-[4px] border-t-[4px] border-white sm:h-20 sm:w-20" />

                  <div className="absolute bottom-[12%] left-[8%] h-16 w-16 border-b-[4px] border-l-[4px] border-white sm:h-20 sm:w-20" />

                  <div className="absolute bottom-[12%] right-[8%] h-16 w-16 border-b-[4px] border-r-[4px] border-white sm:h-20 sm:w-20" />

                  <div className="absolute left-[12%] right-[12%] top-1/2 h-[2px] bg-[#39c77a]/80 shadow-[0_0_12px_rgba(57,199,122,.8)]" />

                  <div className="absolute left-1/2 top-6 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/60 px-5 py-2.5 text-xs font-semibold text-white backdrop-blur-sm sm:text-sm">
                    Align product label inside the frame
                  </div>

                </div>

              )}

            </div>

            <div className="flex items-center justify-between bg-[#0a2540] px-5 py-5 sm:px-8">

              <button
                onClick={closeCamera}
                className="flex h-12 items-center gap-2 rounded-lg bg-white/10 px-5 text-sm font-bold text-white hover:bg-white/20"
              >
                <X size={18} />
                Cancel
              </button>

              <button
                onClick={captureImage}
                disabled={!cameraActive}
                aria-label="Capture image"
                className={`flex h-[76px] w-[76px] items-center justify-center rounded-full border-[5px] border-white bg-white shadow-2xl transition ${
                  cameraActive
                    ? "cursor-pointer hover:scale-105"
                    : "cursor-not-allowed opacity-40"
                }`}
              >
                <span className="h-[58px] w-[58px] rounded-full bg-[#08783f]" />
              </button>

              <button
                onClick={() => {
                  closeCamera();

                  setTimeout(() => {
                    openCamera();
                  }, 100);
                }}
                className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-white/20"
                aria-label="Restart camera"
              >
                <RotateCcw size={20} />
              </button>

            </div>

          </div>

        </div>

      )}

      {/* =================================================
          ANALYZING MODAL
      ================================================== */}

      {scanning && (

        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-[#071b2e]/70 px-5 backdrop-blur-sm">

          <div className="w-full max-w-[430px] rounded-2xl border border-[#dfe5ea] bg-white p-8 text-center shadow-2xl">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#eaf7ef]">

              <div className="h-8 w-8 animate-spin rounded-full border-[3px] border-[#cfe6d8] border-t-[#08783f]" />

            </div>

            <h3 className="mt-5 text-xl font-bold text-[#102944]">
              Analyzing Product
            </h3>

            <p className="mt-2 text-sm leading-6 text-[#607086]">
              Extracting label declarations and checking compliance requirements.
            </p>

            <div className="mt-6 h-2 overflow-hidden rounded-full bg-[#e8edf1]">

              <div className="h-full w-2/3 animate-pulse rounded-full bg-[#08783f]" />

            </div>

            <div className="mt-5 flex items-center justify-center gap-2 text-xs font-semibold text-[#607086]">

              <Sparkles size={14} />

              OCR → Rules Engine → AI Analysis

            </div>

          </div>

        </div>

      )}

    </main>
  );
}


/* =========================================================
   PROCESS STEP
========================================================= */

function ProcessStep({
  number,
  icon,
  title,
  text,
}: {
  number: string;
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-4">

      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#eaf7ef] text-[#08783f]">
        {icon}
      </div>

      <div>

        <div className="flex items-center gap-2">

          <span className="text-xs font-bold text-[#08783f]">
            STEP {number}
          </span>

          <h3 className="text-sm font-bold text-[#102944]">
            {title}
          </h3>

        </div>

        <p className="mt-1 text-sm leading-5 text-[#607086]">
          {text}
        </p>

      </div>

    </div>
  );
}


/* =========================================================
   RECENT SCAN
========================================================= */

function RecentScan({
  product,
  date,
  status,
  image,
}: {
  product: string;
  date: string;
  status: "Compliant" | "Non-Compliant";
  image: string;
}) {
  const compliant = status === "Compliant";

  return (
    <div className="rounded-xl border border-[#e1e7ec] p-4 transition hover:border-[#08783f] hover:shadow-sm">

      <div className="flex items-center gap-3">

        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[#e1e7ec] bg-white">

          <img
            src={image}
            alt={product}
            className="h-full w-full object-contain p-1"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />

        </div>

        <div className="min-w-0">

          <p className="truncate text-sm font-bold text-[#102944]">
            {product}
          </p>

          <p className="mt-1 flex items-center gap-1 text-xs text-[#718096]">

            <Clock3 size={12} />

            {date}

          </p>

          <span
            className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold ${
              compliant
                ? "bg-[#e8f7ee] text-[#08783f]"
                : "bg-[#fff0ef] text-[#c94a4a]"
            }`}
          >
            {status}
          </span>

        </div>

      </div>

      <Link
        href="/reports"
        className="mt-3 flex items-center justify-center gap-1 border-t border-[#edf0f3] pt-3 text-xs font-bold text-[#08783f]"
      >
        View Report →
      </Link>

    </div>
  );
}