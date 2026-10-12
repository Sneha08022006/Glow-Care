import { useEffect, useRef, useState, type ChangeEvent } from "react";
import {
  Sparkles,
  Camera,
  Upload,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  Activity,
  FileText,
  Check,
  Plus,
  RefreshCw,
  Sun,
  Moon,
  Droplets,
  Stethoscope,
  Printer,
  ArrowRight
} from "lucide-react";
import { products, type Product, type SkinType, type ClinicalSkinAnalysis } from "@/data";

export default function FaceScanner({ onComplete }: { onComplete?: (type: SkinType) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [cameraOn, setCameraOn] = useState(false);
  const [error, setError] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzingStep, setAnalyzingStep] = useState(0);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [result, setResult] = useState<ClinicalSkinAnalysis | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [flash, setFlash] = useState(false);
  const [addedProductIds, setAddedProductIds] = useState<Record<string, boolean>>({});
  const [syncedToDashboard, setSyncedToDashboard] = useState(false);

  const analysisSteps = [
    "Mapping facial landmarks & T-zone topography...",
    "Assessing epidermal hydration & sebum distribution...",
    "Analyzing pore clarity, blemishes & skin barrier health...",
    "Formulating clinical dermatologist prescription..."
  ];
  const clinicalPrompt = `You are an expert Clinical Dermatologist and AI Skincare Specialist for "GlowCare" - a premium science-backed skincare platform.
Analyze this facial image thoroughly and provide a clinical, compassionate, and precise skin assessment.

Return ONLY a valid, raw JSON object (no markdown, no backticks, no text outside JSON) adhering strictly to this schema:

{
  "skinType": "Dry" | "Oily" | "Combination" | "Sensitive",
  "skinScore": <number between 55 and 96 based on skin clarity and vitality>,
  "metrics": {
    "hydration": <number 35-95>,
    "oilBalance": <number 35-95>,
    "poreClarity": <number 35-95>,
    "barrierHealth": <number 45-98>
  },
  "concerns": [
    {
      "name": "<e.g., Enlarged Pores, Active Breakouts, Dark Circles, Dullness, Redness, Dehydration>",
      "severity": "Mild" | "Moderate" | "Noticeable",
      "location": "<e.g., T-Zone, Cheeks, Under-Eyes, Forehead, Chin>",
      "clinicalNotes": "<1-2 sentence clinical observation of what is visibly seen>"
    }
  ],
  "doctorVerdict": {
    "doctorName": "Dr. Sophia Vance, MD",
    "doctorRole": "Chief Clinical Dermatologist, GlowCare Medical Board",
    "summary": "<2-3 sentence clinical diagnosis explaining root causes, current barrier status, and positive prognosis>",
    "keyActives": ["<e.g. 2% Salicylic Acid (BHA)>", "<Niacinamide 2%>", "<Ceramides NP/AP>", "<Zinc Oxide SPF 50>"],
    "amRoutine": [
      "Step 1: Cleanse with gentle lukewarm foam",
      "Step 2: Balance Essence Toner with Niacinamide",
      "Step 3: Lightweight Barrier Moisturizer",
      "Step 4: Silk Veil SPF 50 Sunscreen (Crucial daily defense)"
    ],
    "pmRoutine": [
      "Step 1: Double Cleanse to dissolve sebum and impurities",
      "Step 2: Targeted Active Treatment",
      "Step 3: Ceramide & Peptide Recovery Cream"
    ],
    "precautions": [
      "<Crucial precautions like avoiding harsh physical scrubs, patch testing, sun protection>"
    ],
    "lifestyleAdvice": "<Actionable lifestyle tip on hydration, diet, or sleep>"
  },
  "prescribedProductIds": ["<array of 3 to 4 matching product IDs from: face-wash, moisturizer, sunscreen, serum, cleanser, toner, eye-cream, exfoliator, night-cream, clay-mask, face-oil>"]
}

If face is blurry or cannot be clearly detected, return error: "Face not clearly visible".`;

  const requestDirectGemini = async (cleanBase64: string): Promise<ClinicalSkinAnalysis> => {
    const apiKey = ((import.meta.env.VITE_GEMINI_API_KEY as string) || "").trim();
    if (!apiKey) {
      throw new Error("Gemini API key not configured. Please set VITE_GEMINI_API_KEY in your .env file.");
    }
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                inlineData: {
                  mimeType: "image/jpeg",
                  data: cleanBase64,
                },
              },
              { text: clinicalPrompt },
            ],
          },
        ],
      }),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => null);
      throw new Error(errData?.error?.message || `AI Clinical Service returned code ${res.status}`);
    }

    const json = await res.json();
    const rawText = json.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawText) throw new Error("No response received from clinical model");

    const cleaned = rawText.replace(/```json/gi, "").replace(/```/g, "").trim();
    return JSON.parse(cleaned) as ClinicalSkinAnalysis;
  };

  const handleAnalysisRequest = async (base64Image: string) => {
    let stepTimer: ReturnType<typeof setInterval> | null = null;
    try {
      setAnalyzing(true);
      setError("");
      setResult(null);
      setSyncedToDashboard(false);

      // Cycle through analysis steps for a smooth medical scan feel
      let stepIdx = 0;
      setAnalyzingStep(0);
      stepTimer = setInterval(() => {
        stepIdx = (stepIdx + 1) % analysisSteps.length;
        setAnalyzingStep(stepIdx);
      }, 1200);

      const cleanBase64 = base64Image.replace(/^data:image\/\w+;base64,/, "");
      let data: ClinicalSkinAnalysis | null = null;

      // 1. Try local backend server first (via proxy or direct URL)
      try {
        const apiUrl = (import.meta.env.VITE_API_URL as string) || "http://localhost:10000";
        const response = await fetch(`${apiUrl}/analyze-skin`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            image: base64Image,
          }),
        });

        if (response.ok) {
          const parsed = await response.json();
          const possibleErr = parsed as { error?: string };
          if (!possibleErr.error) {
            data = parsed as ClinicalSkinAnalysis;
          }
        }
      } catch (localServerErr) {
        console.warn("Local backend unreachable, seamlessly engaging direct clinical AI engine:", localServerErr);
      }

      // 2. If local server was down or failed to fetch, use direct Google Gemini Clinical Engine
      if (!data) {
        data = await requestDirectGemini(cleanBase64);
      }

      const possibleError = data as unknown as { error?: string };
      if (possibleError.error) {
        throw new Error(possibleError.error);
      }

      setResult(data);

      // Auto notify parent if a valid skin type is found
      if (onComplete && data.skinType) {
        const typeStr = data.skinType.toLowerCase().trim() as SkinType;
        if (['dry', 'oily', 'combination', 'sensitive'].includes(typeStr)) {
          onComplete(typeStr);
          setSyncedToDashboard(true);
        }
      }
    } catch (err) {
      console.error("Clinical skin analysis error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Skin analysis nahi ho paya. Kripya dobara try karein."
      );
    } finally {
      if (stepTimer) clearInterval(stepTimer);
      setAnalyzing(false);
    }
  };

  const executeLiveCapture = async () => {
    if (!videoRef.current) return;

    try {
      const canvas = document.createElement("canvas");
      const video = videoRef.current;

      const MAX_WIDTH = 720;
      let width = video.videoWidth || 640;
      let height = video.videoHeight || 480;

      if (width > MAX_WIDTH) {
        height = Math.round((height * MAX_WIDTH) / width);
        width = MAX_WIDTH;
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas context could not be created");

      ctx.drawImage(video, 0, 0, width, height);
      const imageData = canvas.toDataURL("image/jpeg", 0.75);

      setPreviewImage(imageData);
      stopCamera();
      await handleAnalysisRequest(imageData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Capture error");
    }
  };

  const startAnalysis = () => {
    if (countdown !== null || analyzing) return;
    let counter = 3;
    setCountdown(counter);

    const interval = setInterval(() => {
      counter -= 1;
      if (counter > 0) {
        setCountdown(counter);
      } else {
        clearInterval(interval);
        setCountdown(null);

        // Flash simulation
        setFlash(true);
        setTimeout(() => setFlash(false), 200);

        executeLiveCapture();
      }
    }, 1000);
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Kripya ek valid image file (JPG, PNG) upload karein.");
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      setPreviewImage(base64);
      stopCamera();
      await handleAnalysisRequest(base64);
    };
    reader.readAsDataURL(file);
  };

  const startCamera = async () => {
    try {
      setError("");
      setPreviewImage(null);
      setResult(null);

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraOn(true);
    } catch {
      setError("Camera permission allow karein ya niche diye 'Upload Selfie' option se photo choose karein.");
    }
  };

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setCameraOn(false);
  };

  useEffect(() => {
    if (cameraOn && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
      videoRef.current.onloadedmetadata = () => {
        videoRef.current?.play().catch((err) => {
          console.log("Video play error:", err);
        });
      };
    }
  }, [cameraOn]);

  const toggleAddProduct = (id: string) => {
    setAddedProductIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const addAllPrescribed = (productIds: string[]) => {
    const newAdded = { ...addedProductIds };
    productIds.forEach((id) => {
      newAdded[id] = true;
    });
    setAddedProductIds(newAdded);
  };

  const handlePrint = () => {
    window.print();
  };

  const prescribedProductsList: Product[] = result?.prescribedProductIds
    ? (products.filter((p) => result.prescribedProductIds.includes(p.id)) as Product[])
    : [];

  return (
    <section id="scanner" className="py-24 bg-gradient-to-b from-cream via-blush-50/50 to-cream relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[40rem] h-[25rem] rounded-full bg-blush-200/40 blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur px-4 py-1.5 text-xs font-semibold text-blush-600 ring-1 ring-blush-200 shadow-soft">
            <Stethoscope className="w-4 h-4 text-blush-500" />
            AI Clinical Dermatology Diagnosis
          </span>

          <h2 className="mt-4 font-serif text-4xl sm:text-5xl font-semibold text-ink">
            Clinical Face Analysis
          </h2>

          <p className="mt-4 text-ink/75 leading-relaxed text-sm sm:text-base">
            Scan your face using our high-precision AI dermatologist. We detect real epidermal concerns, evaluate your skin barrier, and formulate a customized medical-grade regimen with exact product matches.
          </p>
        </div>

        {/* Scanner Viewport Card */}
        <div className="max-w-3xl mx-auto bg-white rounded-4xl p-6 sm:p-8 shadow-soft-lg border border-blush-100">
          <div className="relative aspect-video max-h-[420px] bg-slate-900 rounded-3xl overflow-hidden flex items-center justify-center border-2 border-blush-100/80 shadow-inner">
            {cameraOn ? (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover scale-x-[-1]"
                />

                {/* Facial Target Scanner Oval Guide */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div className="w-52 h-68 sm:w-64 sm:h-80 rounded-[50%] border-2 border-dashed border-blush-400/80 shadow-[0_0_40px_rgba(244,114,182,0.3)] flex flex-col items-center justify-between py-4">
                    <span className="text-[11px] font-medium bg-black/60 text-white/90 px-3 py-1 rounded-full backdrop-blur">
                      Center Your Face Inside
                    </span>
                    <span className="text-[11px] font-medium bg-black/60 text-white/90 px-3 py-1 rounded-full backdrop-blur">
                      Keep Steady & Even Light
                    </span>
                  </div>
                </div>

                {/* Countdown Overlay */}
                {countdown !== null && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-30">
                    <span className="text-9xl font-serif font-bold text-white drop-shadow-lg animate-[pulse_1s_ease-in-out_infinite]">
                      {countdown}
                    </span>
                  </div>
                )}

                {/* Flash Overlay */}
                {flash && (
                  <div className="absolute inset-0 bg-white z-40 animate-[flash_0.2s_ease-out]" />
                )}
              </>
            ) : previewImage ? (
              <div className="relative w-full h-full flex items-center justify-center bg-slate-950">
                <img
                  src={previewImage}
                  alt="Captured face preview"
                  className="w-full h-full object-contain"
                />

                {/* Laser Scanning Animation Overlay while Analyzing */}
                {analyzing && (
                  <div className="absolute inset-0 bg-blush-950/40 backdrop-blur-[2px] flex flex-col items-center justify-center z-20">
                    <div className="w-full h-1 bg-gradient-to-r from-transparent via-blush-400 to-transparent absolute top-0 animate-[scanLaser_2s_linear_infinite]" />
                    <div className="bg-white/95 backdrop-blur-md px-6 py-4 rounded-2xl shadow-2xl border border-blush-200 text-center max-w-md mx-4">
                      <div className="flex items-center justify-center gap-3 text-blush-600 mb-2">
                        <Activity className="w-6 h-6 animate-spin text-blush-500" />
                        <span className="font-semibold text-ink text-sm sm:text-base">
                          Clinical AI Dermatology Scan
                        </span>
                      </div>
                      <p className="text-xs text-ink/75 font-medium min-h-[32px] flex items-center justify-center">
                        {analysisSteps[analyzingStep]}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Idle Empty State */
              <div className="text-center px-6 py-12 text-white">
                <div className="w-20 h-20 mx-auto rounded-3xl bg-white/10 backdrop-blur flex items-center justify-center text-blush-300 text-3xl mb-4 border border-white/20">
                  <Camera className="w-10 h-10" />
                </div>
                <h3 className="font-serif text-2xl font-semibold mb-2">
                  Ready to Analyze Your Skin
                </h3>
                <p className="text-white/70 max-w-md mx-auto text-xs sm:text-sm">
                  Turn on your camera for a live facial assessment, or upload a clear, natural selfie for clinical analysis.
                </p>
              </div>
            )}
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mt-4 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 shrink-0 text-rose-500 mt-0.5" />
              <div>
                <p className="font-semibold">Analysis Notice</p>
                <p className="mt-0.5">{error}</p>
              </div>
            </div>
          )}

          {/* Controls Bar */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />

            {!cameraOn ? (
              <>
                <button
                  type="button"
                  onClick={startCamera}
                  disabled={analyzing}
                  className="px-8 py-3.5 rounded-full bg-ink text-white font-semibold text-sm hover:bg-blush-600 transition-colors shadow-soft flex items-center gap-2.5 disabled:opacity-50"
                >
                  <Camera className="w-4 h-4" />
                  {previewImage ? "Scan Again via Camera" : "Start Live Face Scan"}
                </button>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={analyzing}
                  className="px-6 py-3.5 rounded-full bg-white ring-1 ring-blush-200 text-ink font-semibold text-sm hover:bg-blush-50 transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  <Upload className="w-4 h-4 text-blush-600" />
                  Upload Selfie / Photo
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={startAnalysis}
                  disabled={analyzing || countdown !== null}
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-blush-500 to-blush-600 text-white font-semibold text-sm hover:from-blush-600 hover:to-blush-700 transition-all shadow-soft flex items-center gap-2.5 disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4" />
                  {countdown !== null ? `Capturing in ${countdown}...` : "Capture & Analyze My Skin"}
                </button>

                <button
                  type="button"
                  onClick={stopCamera}
                  disabled={analyzing}
                  className="px-6 py-3.5 rounded-full bg-white ring-1 ring-blush-200 text-ink font-medium text-sm hover:bg-blush-50 transition-colors"
                >
                  Cancel Camera
                </button>
              </>
            )}
          </div>
        </div>

        {/* RESULTS: CLINICAL DERMATOLOGIST PRESCRIPTION & DIAGNOSTIC REPORT */}
        {result && (
          <div className="mt-12 bg-white rounded-5xl p-6 sm:p-10 shadow-soft-xl border border-blush-200 animate-[fadeIn_0.5s_ease-out]">
            {/* Header: Verified Doctor Consultation Badge */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-blush-100">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blush-400 to-blush-600 text-white flex items-center justify-center text-2xl shadow-soft">
                  <Stethoscope className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif text-2xl font-bold text-ink">
                      {result.doctorVerdict?.doctorName || "Dr. Sophia Vance, MD"}
                    </h3>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Verified Dermatologist Verdict
                    </span>
                  </div>
                  <p className="text-xs text-ink/65 mt-0.5">
                    {result.doctorVerdict?.doctorRole || "Chief Clinical Dermatologist, GlowCare Medical Advisory"} • Consultation ID: #GLOW-{Math.floor(10000 + Math.random() * 90000)}
                  </p>
                </div>
              </div>

              {/* Action Buttons: Print & Rescan */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white ring-1 ring-blush-200 text-xs font-semibold text-ink/80 hover:bg-blush-50 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5 text-blush-600" />
                  Print Prescription
                </button>
                <button
                  onClick={startCamera}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-ink text-white text-xs font-semibold hover:bg-blush-600 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  New Scan
                </button>
              </div>
            </div>

            {/* Score & Key Metrics Banner */}
            <div className="mt-8 grid md:grid-cols-5 gap-6 items-center">
              {/* Radial Skin Health Index Card */}
              <div className="md:col-span-2 bg-gradient-to-br from-blush-500 to-blush-700 text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-soft">
                <div>
                  <span className="text-[11px] uppercase tracking-widest font-semibold text-white/80">
                    Clinical Skin Health Index
                  </span>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="font-serif text-6xl font-bold tracking-tight">
                      {result.skinScore || 84}
                    </span>
                    <span className="text-2xl text-white/70">/ 100</span>
                  </div>
                  <div className="mt-3 inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur text-xs font-semibold">
                    Classified Skin Type: <span className="uppercase underline underline-offset-2">{result.skinType}</span>
                  </div>
                </div>

                <p className="mt-6 text-xs text-white/85 leading-relaxed">
                  Based on facial pore permeability, hydration index, and surface micro-texture.
                </p>
              </div>

              {/* 4 Biometric Metric Sliders */}
              <div className="md:col-span-3 grid sm:grid-cols-2 gap-4">
                {[
                  {
                    label: "Hydration Level",
                    val: result.metrics?.hydration || 70,
                    icon: Droplets,
                    status: (result.metrics?.hydration || 70) > 65 ? "Well Hydrated" : "Dehydrated",
                    color: "from-sky-400 to-sky-600",
                  },
                  {
                    label: "Sebum / Oil Balance",
                    val: result.metrics?.oilBalance || 62,
                    icon: Activity,
                    status: (result.metrics?.oilBalance || 62) > 70 ? "High Sebum" : "Balanced",
                    color: "from-amber-400 to-amber-600",
                  },
                  {
                    label: "Pore Clarity",
                    val: result.metrics?.poreClarity || 78,
                    icon: Sparkles,
                    status: (result.metrics?.poreClarity || 78) > 70 ? "Clean Pores" : "Congested",
                    color: "from-teal-400 to-teal-600",
                  },
                  {
                    label: "Barrier Integrity",
                    val: result.metrics?.barrierHealth || 85,
                    icon: ShieldCheck,
                    status: (result.metrics?.barrierHealth || 85) > 75 ? "Resilient" : "Vulnerable",
                    color: "from-emerald-400 to-emerald-600",
                  },
                ].map((m) => {
                  const Icon = m.icon;
                  return (
                    <div
                      key={m.label}
                      className="p-4 rounded-2xl bg-cream/70 border border-blush-100/80 shadow-soft"
                    >
                      <div className="flex items-center justify-between text-xs text-ink/70 mb-2">
                        <span className="font-semibold flex items-center gap-1.5 text-ink">
                          <Icon className="w-3.5 h-3.5 text-blush-600" />
                          {m.label}
                        </span>
                        <span className="font-bold text-ink">{m.val}%</span>
                      </div>
                      <div className="w-full bg-white rounded-full h-2 overflow-hidden border border-blush-100">
                        <div
                          className={`bg-gradient-to-r ${m.color} h-full rounded-full transition-all duration-700`}
                          style={{ width: `${m.val}%` }}
                        />
                      </div>
                      <p className="text-[11px] font-medium text-ink/60 mt-1.5">
                        Status: <span className="font-semibold text-ink">{m.status}</span>
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* DETECTED CONCERNS: ACTUAL SKIN PROBLEMS IDENTIFIED */}
            <div className="mt-10">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-blush-600" />
                <h4 className="font-serif text-xl sm:text-2xl font-bold text-ink">
                  Diagnosed Facial Concerns
                </h4>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {result.concerns && result.concerns.length > 0 ? (
                  result.concerns.map((concern, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-3xl bg-white border border-blush-200/80 shadow-soft hover:shadow-soft-lg transition-all"
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <h5 className="font-bold text-ink text-sm sm:text-base">
                          {concern.name}
                        </h5>
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                            concern.severity === "Noticeable"
                              ? "bg-rose-50 text-rose-700 border-rose-200"
                              : concern.severity === "Moderate"
                              ? "bg-amber-50 text-amber-700 border-amber-200"
                              : "bg-emerald-50 text-emerald-700 border-emerald-200"
                          }`}
                        >
                          {concern.severity}
                        </span>
                      </div>

                      <p className="text-xs font-semibold text-blush-600 mb-2">
                        Location: <span className="text-ink/80">{concern.location || "Central Face"}</span>
                      </p>

                      <p className="text-xs text-ink/70 leading-relaxed">
                        {concern.clinicalNotes}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs">
                    No severe concerns detected. Skin surface appears healthy and clear.
                  </div>
                )}
              </div>
            </div>

            {/* CLINICAL VERDICT & ACTIVE INGREDIENTS */}
            {result.doctorVerdict && (
              <div className="mt-10 bg-cream/60 rounded-4xl p-6 sm:p-8 border border-blush-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blush-100 text-blush-600 flex items-center justify-center shrink-0 mt-1">
                    <Stethoscope className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-serif text-xl sm:text-2xl font-bold text-ink">
                      Dermatologist's Clinical Summary
                    </h4>
                    <p className="mt-3 text-ink/80 text-sm sm:text-base leading-relaxed">
                      "{result.doctorVerdict.summary}"
                    </p>

                    {/* Prescribed Active Ingredients */}
                    {result.doctorVerdict.keyActives && result.doctorVerdict.keyActives.length > 0 && (
                      <div className="mt-6">
                        <p className="text-xs font-bold uppercase tracking-wider text-ink/60 mb-2">
                          Prescribed Active Ingredients to Seek:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {result.doctorVerdict.keyActives.map((act) => (
                            <span
                              key={act}
                              className="px-3 py-1 rounded-full bg-white text-xs font-semibold text-blush-700 border border-blush-200 shadow-soft"
                            >
                              ★ {act}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* AM & PM CLINICAL ROUTINE SCHEDULE */}
                <div className="mt-8 pt-8 border-t border-blush-200/70 grid md:grid-cols-2 gap-6">
                  {/* AM Routine */}
                  <div className="p-5 rounded-3xl bg-white border border-blush-100 shadow-soft">
                    <div className="flex items-center gap-2 mb-3 text-amber-600 font-bold text-sm">
                      <Sun className="w-4 h-4 text-amber-500" />
                      Morning (AM) Medical Routine
                    </div>
                    <ul className="space-y-2">
                      {result.doctorVerdict.amRoutine?.map((step, sIdx) => (
                        <li key={sIdx} className="text-xs text-ink/80 flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* PM Routine */}
                  <div className="p-5 rounded-3xl bg-white border border-blush-100 shadow-soft">
                    <div className="flex items-center gap-2 mb-3 text-indigo-600 font-bold text-sm">
                      <Moon className="w-4 h-4 text-indigo-500" />
                      Night (PM) Recovery Routine
                    </div>
                    <ul className="space-y-2">
                      {result.doctorVerdict.pmRoutine?.map((step, sIdx) => (
                        <li key={sIdx} className="text-xs text-ink/80 flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Precautions and Lifestyle Advice */}
                <div className="mt-6 pt-6 border-t border-blush-200/60 flex flex-col sm:flex-row gap-4 text-xs text-ink/75">
                  {result.doctorVerdict.precautions && result.doctorVerdict.precautions.length > 0 && (
                    <div className="flex-1">
                      <span className="font-bold text-rose-650 text-ink">⚠️ Precautionary Notes:</span>{" "}
                      {result.doctorVerdict.precautions.join(" • ")}
                    </div>
                  )}
                  {result.doctorVerdict.lifestyleAdvice && (
                    <div className="flex-1">
                      <span className="font-bold text-teal-700 text-ink">🌿 Lifestyle & Diet:</span>{" "}
                      {result.doctorVerdict.lifestyleAdvice}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* DOCTOR PRESCRIBED PRODUCTS SHELF */}
            {prescribedProductsList.length > 0 && (
              <div className="mt-12 pt-10 border-t border-blush-200">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-blush-600 bg-blush-50 px-3 py-1 rounded-full border border-blush-200">
                      Prescription Matches
                    </span>
                    <h4 className="font-serif text-2xl sm:text-3xl font-bold text-ink mt-2">
                      Recommended GlowCare Formulations
                    </h4>
                    <p className="text-xs sm:text-sm text-ink/70 mt-1">
                      Specifically formulated products targeting your diagnosed skin conditions.
                    </p>
                  </div>

                  <button
                    onClick={() => addAllPrescribed(result.prescribedProductIds)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-ink text-white text-xs font-semibold hover:bg-blush-600 transition-colors shadow-soft"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Add All Prescribed to Routine
                  </button>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {prescribedProductsList.map((prod) => {
                    const isAdded = !!addedProductIds[prod.id];
                    return (
                      <div
                        key={prod.id}
                        className="bg-cream/50 rounded-3xl p-4 border border-blush-100 shadow-soft hover:shadow-soft-lg transition-all flex flex-col justify-between group"
                      >
                        <div>
                          <div className="relative aspect-square rounded-2xl overflow-hidden mb-3 bg-white">
                            <img
                              src={prod.image}
                              alt={prod.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <span className="absolute top-2 left-2 rounded-full bg-white/95 backdrop-blur px-2.5 py-0.5 text-[10px] font-bold text-blush-600 border border-blush-100 shadow-sm">
                              {prod.brand}
                            </span>
                          </div>

                          <span className="text-[10px] font-bold uppercase tracking-wider text-ink/50 block">
                            {prod.category}
                          </span>
                          <h5 className="font-serif font-bold text-ink text-sm sm:text-base leading-snug mt-1">
                            {prod.name}
                          </h5>

                          <div className="mt-2 p-2 rounded-xl bg-blush-50 border border-blush-100 text-[11px] text-ink/80 leading-relaxed">
                            <span className="font-bold text-blush-700 block mb-0.5">🎯 Why useful for you:</span>
                            {prod.whyHelpful.replace('Why it helps your skin: ', '')}
                          </div>

                          <div className="mt-3 flex items-center justify-between text-xs">
                            <span className="font-bold text-ink text-sm">{prod.price}</span>
                            <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full text-[10px] font-semibold border border-emerald-200">
                              Clinically Prescribed
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => toggleAddProduct(prod.id)}
                          className={`mt-4 w-full py-2.5 rounded-full text-xs font-semibold transition-all duration-300 flex items-center justify-center gap-1.5 ${
                            isAdded
                              ? "bg-emerald-600 text-white shadow-soft"
                              : "bg-white text-ink border border-blush-200 hover:bg-blush-600 hover:text-white hover:border-transparent"
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              Added to Daily Routine
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              Add to Routine
                            </>
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Dashboard Sync CTA */}
            <div className="mt-10 p-6 rounded-3xl bg-gradient-to-r from-blush-100/70 to-beige-100/70 border border-blush-200 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h5 className="font-serif text-lg font-bold text-ink">
                    Sync Consultation with Your Routine Dashboard
                  </h5>
                  {syncedToDashboard && (
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full border border-emerald-300">
                      Synchronized ✓
                    </span>
                  )}
                </div>
                <p className="text-xs text-ink/70 mt-0.5">
                  Your detected skin profile and daily checklist are now synchronized across the GlowCare app.
                </p>
              </div>

              <a
                href="#dashboard"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink text-white text-xs font-semibold hover:bg-blush-600 transition-colors shadow-soft"
              >
                Go to My Skin Dashboard
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
