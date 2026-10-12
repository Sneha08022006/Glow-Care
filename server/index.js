const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { GoogleGenAI } = require("@google/genai");

dotenv.config();

const app = express();

// =====================================
// CORS CONFIGURATION
// =====================================

app.use(cors());

// =====================================
// BODY PARSER
// =====================================

app.use(express.json({ limit: "10mb" }));

// =====================================
// GEMINI AI
// =====================================

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.trim() : undefined,
});

// =====================================
// TEST BACKEND
// =====================================

app.get("/", (req, res) => {
  res.json({
    message: "GlowCare backend is running!",
  });
});

// =====================================
// SKIN ANALYSIS API
// =====================================

app.post("/analyze-skin", async (req, res) => {
  try {
    const { image } = req.body;

    // Check image
    if (!image) {
      return res.status(400).json({
        error: "Image is required",
      });
    }

    // Remove base64 image prefix
    const base64Image = image.replace(
      /^data:image\/\w+;base64,/,
      ""
    );

    // Send image to Gemini
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",

      contents: [
        {
          role: "user",

          parts: [
            {
              inlineData: {
                mimeType: "image/jpeg",
                data: base64Image,
              },
            },

            {
              text: `You are an expert Clinical Dermatologist and AI Skincare Specialist for "GlowCare" - a premium science-backed skincare platform.
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
  "prescribedProductIds": ["<array of 3 to 4 matching product IDs from list below>"]
}

CATALOG OF AVAILABLE GLOWCARE PRODUCT IDS TO PRESCRIBE FROM:
- "face-wash": Rose Cloud Face Wash (pH-balanced gel-to-foam, hyaluronic acid - best for daily cleanse, combination/dry/sensitive)
- "moisturizer": Velvet Dew Moisturizer (squalane & ceramides - essential 48h hydration & barrier repair)
- "sunscreen": Silk Veil Sunscreen SPF 50 (zinc oxide, niacinamide, pore-blurring - universally prescribed for daytime)
- "serum": Glow Drops Serum (10% Vitamin C + hyaluronic acid - best for dull skin, dark spots, uneven tone)
- "cleanser": Honey Milk Cleanser (raw honey & oat milk - ideal for soothing redness, dryness & sensitive barrier)
- "toner": Balance Essence Toner (niacinamide & green tea - best for open pores, excess sebum, oily/combination skin)
- "eye-cream": Awaken Eye Cream (caffeine & peptides - best for dark circles, puffiness & fine lines)
- "exfoliator": Radiance BHA Liquid (2% Salicylic Acid - best for acne, blackheads, clogged pores, texture)
- "night-cream": Midnight Repair Cream (bakuchiol & peptides - best for overnight cell renewal & barrier firming)
- "clay-mask": Purifying Clay Mask (kaolin clay & centella - best for deep detox, blackheads & excess oil)
- "face-oil": Golden Hour Face Oil (squalane & rosehip - best for dry, tight skin craving lipid nourishment)

INSTRUCTIONS:
1. Select 3-4 product IDs from the catalog that directly target the diagnosed skin concerns.
2. If face is blurry or cannot be detected clearly, return:
{
  "error": "Face not clearly visible",
  "skinType": "Unknown",
  "skinScore": 0,
  "metrics": { "hydration": 50, "oilBalance": 50, "poreClarity": 50, "barrierHealth": 50 },
  "concerns": [{ "name": "Image Quality Issue", "severity": "Mild", "location": "Camera", "clinicalNotes": "Camera hil gaya tha ya lighting kam hai." }],
  "doctorVerdict": {
    "doctorName": "Dr. Sophia Vance, MD",
    "doctorRole": "Clinical Dermatologist",
    "summary": "Face thoda blurry hai ya lighting kam hai. Kripya achi light me phone steady pakad kar dobara scan karein.",
    "keyActives": [],
    "amRoutine": [],
    "pmRoutine": [],
    "precautions": [],
    "lifestyleAdvice": "Natural daylight me selfie lene se sabse accurate analysis milta hai."
  },
  "prescribedProductIds": ["face-wash", "moisturizer", "sunscreen"]
}
`,
            },
          ],
        },
      ],
    });

    // Get Gemini response
    const text = response.text;

    console.log("Gemini response:", text);

    // Remove markdown code blocks if present
    const cleanedText = text
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    // Convert Gemini response to JSON
    let result;
    try {
      result = JSON.parse(cleanedText);
    } catch (parseError) {
      console.log("Failed to parse Gemini output as JSON. Output was:", text);
      return res.status(400).json({
        error: "Image clear nahi aayi. Kripya camera steady rakhein aur dobara scan karein.",
      });
    }

    // Send result to frontend
    res.json(result);

  } catch (error) {
    console.error("Gemini error:", error);

    res.status(500).json({
      error: `AI Error: ${error.message} - Please hold camera steady.`,
      details: error.message,
    });
  }
});

// =====================================
// START SERVER
// =====================================

const PORT = process.env.PORT || 10000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
