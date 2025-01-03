import { Ctx } from "@mengkodingan/ckptw";
import { bot } from "../..";

const BioHandler = {
  name: "bio",
  category: "admin",
  code: async (ctx: Ctx) => {
    const input = ctx.args.join(" ") || null;
    if (!input) {
      return ctx.reply("Masukin bio");
    }

    bot.bio(input)
    return ctx.reply("succes")
  },
};

module.exports = BioHandler;
