import { Ctx } from "@mengkodingan/ckptw";
import { createUrl } from "../client/api";
import axios from "axios";
import fs from "fs";
import path from "path";
import { promisify } from "util";
import { randomUUID } from "crypto";

const writeFileAsync = promisify(fs.writeFile);
const unlinkAsync = promisify(fs.unlink);

const TiktokHandler = {
  name: "tiktok",
  code: async (ctx: Ctx) => {
    const input = ctx.args.join(" ") || null;

    if (!input) {
      return ctx.reply("Mohon berikan URL TikTok!");
    }

    try {
      ctx.simulateTyping();

      const tiktokUrl = createUrl("tiktok");
      const tiktokUrlGet = `${tiktokUrl}${encodeURIComponent(input)}`;
      const response = await axios.get(tiktokUrlGet);

      if (
        !response.data ||
        !response.data.result ||
        !response.data.result.url
      ) {
        return ctx.reply("Gagal mengunduh video TikTok. Silakan coba lagi.");
      }

      const videoUrl = response.data.result.url;
      const videoResponse = await axios.get(videoUrl, {
        responseType: "arraybuffer",
      });
      const videoBuffer = Buffer.from(videoResponse.data, "binary");
      const fileName = `${randomUUID()}.mp4`;
      const outputPath = path.join("./tmp", fileName);
      await writeFileAsync(outputPath, videoBuffer);

      await ctx.reply({
        video: {
          url: outputPath,
        },
        caption:
          `Judul: ${response.data.result.title}\n` +
          `Durasi: ${response.data.result.duration} detik\n` +
          `Pembuat: ${response.data.result.author.nickname} (@${response.data.result.author.username})`,
      });

      await unlinkAsync(outputPath);
    } catch (error) {
      console.error("Error:", error);

      if (axios.isAxiosError(error)) {
        if (error.response) {
          return ctx.reply(
            `Terjadi kesalahan saat menghubungi API: ${error.response.status} - ${error.response.statusText}`,
          );
        } else if (error.request) {
          return ctx.reply(
            "Tidak ada respons dari API. Silakan coba lagi nanti.",
          );
        } else {
          return ctx.reply(
            "Terjadi kesalahan saat mengirim permintaan ke API.",
          );
        }
      } else {
        return ctx.reply("Terjadi kesalahan saat memproses permintaan.");
      }
    }
  },
};

module.exports = TiktokHandler;
