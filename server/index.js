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
              text: `
Analyze this face image for a skincare application called GlowCare.

Return ONLY valid JSON in this exact format:

{
  "skinType": "string",
  "concerns": ["string", "string"],
  "recommendation": "string"
}

Possible skin types:
- Oily
- Dry
- Combination
- Sensitive

CRITICAL INSTRUCTIONS FOR CONCERNS:
You must perform a detailed and deep analysis of the skin. 
Explicitly look for and list specific concerns if they are present, such as:
- Open pores
- Pimples / Acne / Breakouts
- Dull skin / Lack of glow
- Dryness / Flakiness
- Dark circles
- Fine lines / Wrinkles
- Uneven skin tone / Pigmentation
- Redness

IF THE IMAGE IS BLURRY OR NO FACE IS DETECTED:
If you cannot clearly see a face because the camera moved or the image is too blurry, do NOT complain in text. Return this exact JSON instead:
{
  "skinType": "Unknown",
  "concerns": ["Blurry Image / Face not visible"],
  "recommendation": "Camera hil gaya tha ya face clear nahi hai. Kripya apna phone thoda steady pakde aur achi light me dobara scan karein."
}

Do not diagnose medical conditions.
Give practical and detailed skincare recommendations based on these exact concerns.
Keep the JSON clean and valid.
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
      .replace(/```json/g, "")
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
