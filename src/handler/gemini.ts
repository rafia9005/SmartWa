import { Cooldown, Ctx } from "@mengkodingan/ckptw";
import { createUrl } from "../client/api";
import axios from "axios";

const GeminiHandler = {
  name: "gemini",
  code: async (ctx: Ctx) => {
    const input = ctx.args.join(" ") || null;
    if (!input) {
      return ctx.reply("Mohon berikan pertanyaan atau perintah!");
    }
    try {
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
      const cd = new Cooldown(ctx, 2000); // add this. Cooldown time must be in milliseconds.
      if (cd.onCooldown) return ctx.reply(`slow down... wait ${cd.timeleft}ms`); // if user has cooldown stop the code by return something.

      return ctx.reply(geminiResponse);
    } catch (error) {
      console.error("Error:", error);
      return ctx.reply("Terjadi kesalahan saat memproses permintaan.");
    }
  },
};

module.exports = GeminiHandler;
