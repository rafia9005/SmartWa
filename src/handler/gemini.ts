import { Cooldown, Ctx } from "@mengkodingan/ckptw";
import { createUrl } from "../client/api";
import axios from "axios";

const GeminiHandler = {
  name: "ai",
  code: async (ctx: Ctx) => {
    const input = ctx.args.join(" ") || null;
    if (!input) {
      return ctx.reply("Mohon berikan pertanyaan atau perintah!");
    }
    try {
      ctx.simulateTyping();
      const GeminiUrl = createUrl("gemini");

      const requestData = {
        contents: [
          {
            parts: [
              {
                text: input,
              },
            ],
          },
        ],
      };

      const response = await axios.post(GeminiUrl, requestData);
      const geminiResponse = response.data.candidates[0].content.parts[0].text;
      //await new Promise((resolve) => setTimeout(resolve, 2000));

      return ctx.reply(geminiResponse);
    } catch (error) {
      console.error("Error:", error);
      return ctx.reply("Terjadi kesalahan saat memproses permintaan.");
    }
  },
};

module.exports = GeminiHandler;
