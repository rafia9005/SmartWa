import { Ctx } from "@mengkodingan/ckptw";
import { createUrl } from "../client/api";
import axios from "axios";
import fs from "fs";
import path from "path";
import { promisify } from "util";
import { randomUUID } from "crypto";

const writeFileAsync = promisify(fs.writeFile);
const unlinkAsync = promisify(fs.unlink);

const TextToVoiceHandler = {
  name: "text-to-voice",
  code: async (ctx: Ctx) => {
    const input = ctx.args.join(" ") || null;

    if (!input) {
      return ctx.reply("Mohon berikan teks untuk dikonversi ke suara!");
    }

    try {
      ctx.simulateRecording();

      const textToVoiceUrl = createUrl("texttovoice");

      const apiUrl = `${textToVoiceUrl}${encodeURIComponent(input)}`;

      const response = await axios.get(apiUrl);

      if (!response.data || !response.data.result) {
        return ctx.reply("Gagal menghasilkan suara. Silakan coba lagi.");
      }

      const audioUrl = response.data.result;

      const audioResponse = await axios.get(audioUrl, { responseType: "arraybuffer" });
      const audioBuffer = Buffer.from(audioResponse.data, "binary");

      const fileName = `${randomUUID()}.oog`;
      const outputPath = path.join("./tmp", fileName);
      await writeFileAsync(outputPath, audioBuffer);

      await ctx.reply({
        audio: {
          url: outputPath
        }
      });

      await unlinkAsync(outputPath);
    } catch (error) {
      console.error("Error:", error);

      if (axios.isAxiosError(error)) {
        if (error.response) {
          return ctx.reply(
            `Terjadi kesalahan saat menghubungi API: ${error.response.status} - ${error.response.statusText}`
          );
        } else if (error.request) {
          return ctx.reply("Tidak ada respons dari API. Silakan coba lagi nanti.");
        } else {
          return ctx.reply("Terjadi kesalahan saat mengirim permintaan ke API.");
        }
      } else {
        return ctx.reply("Terjadi kesalahan saat memproses permintaan.");
      }
    }
  },
};

module.exports = TextToVoiceHandler;
