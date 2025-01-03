import { Ctx } from "@mengkodingan/ckptw";
import fs from "fs";
import path from "path";
import { promisify } from "util";
import sharp from "sharp";

const unlinkAsync = promisify(fs.unlink);
const mkdirAsync = promisify(fs.mkdir);

const StikerHandler = {
  name: "stiker",
  code: async (ctx: Ctx) => {
    try {
      if (!ctx.msg?.media) {
        return ctx.reply("Mohon kirim gambar dengan caption !stiker");
      }

      const mediaStream = await ctx.msg.media.toStream() || "";

      const chunks = [];
      for await (const chunk of mediaStream) {
        chunks.push(chunk);
      }
      const mediaBuffer = Buffer.concat(chunks);

      const tmpDir = path.join("./tmp");
      if (!fs.existsSync(tmpDir)) {
        await mkdirAsync(tmpDir, { recursive: true });
      }

      const outputPath = path.join(tmpDir, "generatedsticker.webp");
      await sharp(mediaBuffer)
        .toFormat("webp")
        .toFile(outputPath);

      await ctx.reply({ sticker: { url: outputPath } });

      await unlinkAsync(outputPath);
    } catch (error) {
      console.error("Error:", error);
      return ctx.reply("Terjadi kesalahan saat memproses stiker.");
    }
  },
};

module.exports = StikerHandler;
