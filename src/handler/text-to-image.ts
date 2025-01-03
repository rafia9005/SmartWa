import { Ctx } from "@mengkodingan/ckptw";
import MonsterApiClient from "monsterapi";
import { ENV } from "../env";

const clientImage = new MonsterApiClient(ENV.MONSTER_API);
const model = "txt2img";

const TextToImageHandler = {
  name: "image",
  code: async (ctx: Ctx) => {
    const input = ctx.args.join(" ") || null;

    if (!input) {
      return ctx.reply("Mohon berikan prompt untuk menghasilkan gambar!");
    }

    const prompt = {
      prompt: input,
      negprompt: "",
      samples: 1,
      steps: 50,
      aspect_ratio: "square",
      guidance_scale: 7.5,
      seed: 2414,
    };

    try {
      ctx.simulateTyping()
      const response = await clientImage.generate(model, prompt);
      const urlImage = response.output[0];

      if (!urlImage) {
        return ctx.reply("Gagal menghasilkan gambar. Silakan coba lagi.");
      }

      return await ctx.reply({
        image: {
          url: urlImage,
        },
      });
    } catch (error) {
      console.error("Error:", error);

      return ctx.reply("Terjadi kesalahan saat memproses permintaan.");
    }
  },
};

module.exports = TextToImageHandler;
