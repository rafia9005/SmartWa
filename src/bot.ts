import { SystemInformations } from "./data";
import { Ctx } from "@mengkodingan/ckptw";
import { createUrl } from "./client/api";
import axios from "axios";
import { loadChatHistory, saveChatHistory } from "./tools/tools";

export async function handleChat(ctx: Ctx) {
  const systemInstruction = {
    role: "user",
    parts: [
      {
        text: SystemInformations,
      },
    ],
  };

  const input = ctx.msg?.content || null;
  
  const userId = ctx.msg?.key?.remoteJid || "unknown";

  if (!input) {
    return ctx.reply("Mohon berikan pertanyaan atau perintah!");
  }

  try {
    ctx.simulateTyping();

    const chatHistory = loadChatHistory(userId);

    chatHistory.push({
      role: "user",
      parts: [
        {
          text: input,
        },
      ],
    });

    const GeminiUrl = createUrl("gemini");

    const requestData = {
      contents: chatHistory,
      systemInstruction: systemInstruction,
    };

    const response = await axios.post(GeminiUrl, requestData);
    const geminiResponse = response.data.candidates[0].content.parts[0].text;

    chatHistory.push({
      role: "model",
      parts: [
        {
          text: geminiResponse,
        },
      ],
    });

    saveChatHistory(userId, chatHistory);

    return ctx.sendMessage(ctx.id || "", {
      text: geminiResponse,
    });
  } catch (error) {
    console.error("Error:", error);
    return ctx.reply("Terjadi kesalahan saat memproses permintaan.");
  }
}
