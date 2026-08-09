var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_vite = require("vite");
var import_nodemailer = __toESM(require("nodemailer"), 1);
var import_genai = require("@google/genai");
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = 3e3;
  app.use(import_express.default.json());
  const ai = new import_genai.GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build"
      }
    }
  });
  app.post("/api/ai-chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message || typeof message !== "string") {
        return res.status(400).json({ success: false, error: "Message is required" });
      }
      const systemInstruction = `You are the official AI Smart Assistant for Arjun Singh Ghatang's Official Web Portal and CEO Hub.
You can answer ANY question across all domains in seconds: software engineering, web development, coding, mathematics, science, economics, business, BBS study materials, general knowledge, technology, world news, and history.

CRITICAL CODE GENERATION INSTRUCTIONS:
- Whenever a user asks for code, programming solutions, scripts, or components (in React, TypeScript, JavaScript, Python, HTML/CSS, C++, Java, Go, SQL, Rust, PHP, etc.), generate complete, working, production-ready code snippets.
- ALWAYS enclose code inside standard markdown code blocks with the language tag specified (e.g. \`\`\`tsx ... \`\`\` or \`\`\`python ... \`\`\` or \`\`\`javascript ... \`\`\` or \`\`\`html ... \`\`\`).
- Provide clean, clear explanations before or after the code snippet.

Key Portal Context:
- Official CEO: Arjun Singh Ghatang
- Title: CEO, Digital Creator, Educator, and Founder
- Official Email: arjunsinghghatang@gmail.com
- Main Offices: Syangja & Kathmandu, Nepal (Gandaki & Bagmati Province)
- Platform Focus: BBS 1st to 4th Year Study Materials, Economics, Accountancy, Business Statistics, Marketing, YouTube Tutorials, and Official Social Media Channels.

Respond with high intelligence, accuracy, helpfulness, and lightning speed.`;
      const contents = history && Array.isArray(history) && history.length > 0 ? [
        ...history.map((h) => ({
          role: h.role === "user" ? "user" : "model",
          parts: [{ text: h.content }]
        })),
        { role: "user", parts: [{ text: message }] }
      ] : message;
      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents,
        config: {
          systemInstruction,
          temperature: 0.7
        }
      });
      const replyText = response.text || "Hello! I am Arjun Singh Ghatang's AI Smart Assistant. How can I assist you today?";
      res.json({
        success: true,
        reply: replyText
      });
    } catch (error) {
      console.error("Error in /api/ai-chat:", error);
      res.status(500).json({
        success: false,
        error: error?.message || "Failed to generate AI response",
        reply: "Hello! I am Arjun Singh Ghatang's AI Assistant. I am ready to help you with study materials, CEO office location, contact details, or channel resources!"
      });
    }
  });
  app.post("/api/ai-tts", async (req, res) => {
    try {
      const { text, voice } = req.body;
      if (!text || typeof text !== "string") {
        return res.status(400).json({ success: false, error: "Text is required for TTS" });
      }
      const selectedVoice = voice || "Kore";
      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-tts-preview",
        contents: [{ parts: [{ text: text.slice(0, 1e3) }] }],
        config: {
          responseModalities: [import_genai.Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: selectedVoice }
            }
          }
        }
      });
      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        res.json({
          success: true,
          audioBase64: base64Audio
        });
      } else {
        res.json({ success: false, error: "Audio generation produced no output" });
      }
    } catch (error) {
      console.error("Error in /api/ai-tts:", error);
      res.status(500).json({ success: false, error: error?.message || "TTS generation failed" });
    }
  });
  app.post("/api/send-otp-email", async (req, res) => {
    try {
      const recipientEmail = req.body.email || process.env.GMAIL_OTP_RECIPIENT || "arjunsinghghatang@gmail.com";
      const otpCode = req.body.otp || Math.floor(1e5 + Math.random() * 9e5).toString();
      console.log(`
======================================================`);
      console.log(`[GMAIL OTP DISPATCH SERVICE]`);
      console.log(`Target Email : ${recipientEmail}`);
      console.log(`Security OTP : ${otpCode}`);
      console.log(`Timestamp    : ${(/* @__PURE__ */ new Date()).toISOString()}`);
      console.log(`======================================================
`);
      let emailSentViaSmtp = false;
      if (process.env.SMTP_USER && process.env.SMTP_PASS) {
        try {
          const transporter = import_nodemailer.default.createTransport({
            host: process.env.SMTP_HOST || "smtp.gmail.com",
            port: Number(process.env.SMTP_PORT) || 587,
            secure: Number(process.env.SMTP_PORT) === 465,
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS
            }
          });
          await transporter.sendMail({
            from: `"CEO Portal Security" <${process.env.SMTP_USER}>`,
            to: recipientEmail,
            subject: `\u{1F510} CEO Portal Security Code: ${otpCode}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; rounded-radius: 12px; background-color: #f8fafc;">
                <h2 style="color: #0f172a; margin-top: 0;">Arjun Singh Ghatang CEO Security Verification</h2>
                <p style="color: #334155; font-size: 14px;">Your 6-digit one-time 2FA security code for CEO Master Access is:</p>
                <div style="background-color: #0284c7; color: #ffffff; font-size: 28px; font-weight: bold; letter-spacing: 6px; padding: 16px; text-align: center; border-radius: 8px; margin: 20px 0;">
                  ${otpCode}
                </div>
                <p style="color: #64748b; font-size: 12px;">This code is valid for 10 minutes. If you did not request this code, please ignore this message.</p>
                <hr style="border: none; border-top: 1px solid #cbd5e1; margin: 20px 0;" />
                <p style="color: #94a3b8; font-size: 11px; text-align: center;">Official Security Dispatch for arjunsinghghatang@gmail.com</p>
              </div>
            `
          });
          emailSentViaSmtp = true;
          console.log(`[GMAIL OTP DISPATCH] Email successfully sent via SMTP to ${recipientEmail}`);
        } catch (smtpError) {
          console.error("[GMAIL OTP DISPATCH] SMTP dispatch failed:", smtpError);
        }
      }
      res.json({
        success: true,
        email: recipientEmail,
        otp: otpCode,
        sentViaSmtp: emailSentViaSmtp,
        message: emailSentViaSmtp ? `Email successfully sent to ${recipientEmail}` : `OTP code generated and dispatched for ${recipientEmail}`,
        deliveryTimeSeconds: 1,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
    } catch (error) {
      console.error("Error handling /api/send-otp-email:", error);
      res.status(500).json({ success: false, error: error?.message || "Server error" });
    }
  });
  app.get("/api/live-news", async (req, res) => {
    try {
      const liveNewsItems = [];
      try {
        const nepalRssRes = await fetch("https://news.google.com/rss/search?q=Nepal&hl=en-US&gl=US&ceid=US:en");
        if (nepalRssRes.ok) {
          const xmlText = await nepalRssRes.text();
          const itemMatches = Array.from(xmlText.matchAll(/<item>([\s\S]*?)<\/item>/gi));
          const parsedNepal = itemMatches.slice(0, 8).map((m, idx) => {
            const itemXml = m[1];
            const titleMatch = itemXml.match(/<title>(.*?)<\/title>/i);
            const linkMatch = itemXml.match(/<link>(.*?)<\/link>/i);
            const pubDateMatch = itemXml.match(/<pubDate>(.*?)<\/pubDate>/i);
            const sourceMatch = itemXml.match(/<source[^>]*>(.*?)<\/source>/i);
            const rawTitle = titleMatch ? titleMatch[1].replace(/<!\[CDATA\[(.*?)\]\]>/g, "$1").replace(/&amp;/g, "&") : "Nepal Live Breaking Bulletin";
            const link = linkMatch ? linkMatch[1] : "https://onlinekhabar.com";
            const sourceName = sourceMatch ? sourceMatch[1] : "Nepal News Network";
            return {
              id: `live-nepal-${Date.now()}-${idx}`,
              title: rawTitle,
              category: "news",
              categoryLabel: "\u{1F1F3}\u{1F1F5} Primary Nepal News",
              description: `Live breaking news coverage directly from ${sourceName}. Verified open news report covering national, Gandaki Province, and Syangja developments.`,
              tags: ["NepalNews", "LiveUpdate", "NepalPrimary", sourceName.replace(/\s+/g, "")],
              date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
              views: Math.floor(3e3 + Math.random() * 9e3),
              thumbnailUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
              featured: true,
              platformSource: "portal",
              platformUrl: link,
              authorName: `${sourceName} (Verified Free Source)`,
              isAutoSynced: true,
              syncedTime: "Just now"
            };
          });
          liveNewsItems.push(...parsedNepal);
        }
      } catch (rssErr) {
        console.error("Error fetching Nepal RSS:", rssErr);
      }
      try {
        const worldRssRes = await fetch("https://news.google.com/rss?hl=en-US&gl=US&ceid=US:en");
        if (worldRssRes.ok) {
          const xmlText = await worldRssRes.text();
          const itemMatches = Array.from(xmlText.matchAll(/<item>([\s\S]*?)<\/item>/gi));
          const parsedWorld = itemMatches.slice(0, 6).map((m, idx) => {
            const itemXml = m[1];
            const titleMatch = itemXml.match(/<title>(.*?)<\/title>/i);
            const linkMatch = itemXml.match(/<link>(.*?)<\/link>/i);
            const sourceMatch = itemXml.match(/<source[^>]*>(.*?)<\/source>/i);
            const rawTitle = titleMatch ? titleMatch[1].replace(/<!\[CDATA\[(.*?)\]\]>/g, "$1").replace(/&amp;/g, "&") : "World Breaking Headlines";
            const link = linkMatch ? linkMatch[1] : "https://bbc.com/news";
            const sourceName = sourceMatch ? sourceMatch[1] : "World News Service";
            return {
              id: `live-world-${Date.now()}-${idx}`,
              title: rawTitle,
              category: "news",
              categoryLabel: "\u{1F30D} World News Bulletin",
              description: `Global breaking headlines reported by ${sourceName}. Verified open source coverage on international economy, technology, and world events.`,
              tags: ["WorldNews", "GlobalUpdate", sourceName.replace(/\s+/g, "")],
              date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
              views: Math.floor(4e3 + Math.random() * 12e3),
              thumbnailUrl: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80",
              featured: false,
              platformSource: "portal",
              platformUrl: link,
              authorName: `${sourceName} (Verified Free Source)`,
              isAutoSynced: true,
              syncedTime: "Just now"
            };
          });
          liveNewsItems.push(...parsedWorld);
        }
      } catch (worldRssErr) {
        console.error("Error fetching World RSS:", worldRssErr);
      }
      if (liveNewsItems.length < 6) {
        const prompt = `Generate a JSON array of 8 recent top breaking news items with Nepal News as PRIMARY (5 items) and World News (3 items).
Output MUST be a JSON array of objects with keys:
id, title, category, categoryLabel, description, tags, date, views, thumbnailUrl, platformSource, platformUrl, authorName.
Return raw JSON only without markdown formatting.`;
        const aiResponse = await ai.models.generateContent({
          model: "gemini-3.6-flash",
          contents: prompt
        });
        const raw = aiResponse.text || "";
        const cleaned = raw.replace(/```json/g, "").replace(/```/g, "").trim();
        try {
          const parsed = JSON.parse(cleaned);
          if (Array.isArray(parsed)) {
            parsed.forEach((it, idx) => {
              it.id = it.id || `live-ai-${Date.now()}-${idx}`;
              it.isAutoSynced = true;
              it.syncedTime = "Just now";
              liveNewsItems.push(it);
            });
          }
        } catch (e) {
          console.error("Failed AI news parse:", e);
        }
      }
      res.json({
        success: true,
        count: liveNewsItems.length,
        items: liveNewsItems,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
    } catch (error) {
      console.error("Error in /api/live-news:", error);
      res.status(500).json({ success: false, error: error?.message || "Failed to fetch live news" });
    }
  });
  app.post("/api/translate-news", async (req, res) => {
    try {
      const { title, description, targetLang = "Nepali" } = req.body;
      if (!title && !description) {
        return res.status(400).json({ success: false, error: "Title or description required for translation" });
      }
      const prompt = `You are an expert multilingual news translator and editor.
Translate the following news headline and story description into natural, accurate, fluent standard ${targetLang} language.
Make sure the translation sounds professional like top news agency publications.

Original Title: "${title || ""}"
Original Description: "${description || ""}"

Return ONLY a JSON object with this exact structure:
{
  "translatedTitle": "translated title in ${targetLang}",
  "translatedDescription": "translated full description in ${targetLang}",
  "highlights": ["highlight point 1 in ${targetLang}", "highlight point 2 in ${targetLang}", "highlight point 3 in ${targetLang}"]
}
Return raw JSON only without markdown formatting.`;
      let translatedTitle = "";
      let translatedDescription = "";
      let highlights = [];
      try {
        const response = await ai.models.generateContent({
          model: "gemini-3.6-flash",
          contents: prompt
        });
        const raw = response.text || "";
        const cleaned = raw.replace(/```json/g, "").replace(/```/g, "").trim();
        const parsed = JSON.parse(cleaned);
        translatedTitle = parsed.translatedTitle || "";
        translatedDescription = parsed.translatedDescription || "";
        highlights = parsed.highlights || [];
      } catch (geminiErr) {
        console.error("Gemini translation error, using fallback translator:", geminiErr);
        translatedTitle = `[${targetLang}] ${title}`;
        translatedDescription = `[${targetLang}] ${description}`;
        highlights = [
          `Verified news update in ${targetLang}.`,
          `Live report from Arjun Singh Ghatang Portal.`,
          `National and global coverage.`
        ];
      }
      res.json({
        success: true,
        translatedTitle: translatedTitle || title,
        translatedDescription: translatedDescription || description,
        highlights: highlights.length > 0 ? highlights : [
          `Verified news report in ${targetLang}.`,
          `Official live portal update.`
        ],
        targetLanguage: targetLang
      });
    } catch (err) {
      console.error("Error in /api/translate-news:", err);
      res.status(500).json({ success: false, error: err?.message || "Translation failed" });
    }
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
