import { Ctx } from "@mengkodingan/ckptw";
import { ENV } from "../../env";

const GeminiHandler = {
    name: "message",
    code: async (ctx: Ctx) => {
        const message = ctx.msg.key.participant;

        if (message) {
            const parts = message.split(" ");
            const userNumber = parts[0];
            const userMessage = parts.slice(1).join(" ");

            const authorNumber = ENV.AUTHOR;

            if (userNumber === authorNumber) {
                await ctx.reply(`Selamat datang, Anda memiliki akses. Pesan Anda: ${userMessage}`);
            } else {
                await ctx.reply("Maaf, Anda tidak memiliki akses.");
            }
        }
    },
};

module.exports = GeminiHandler;
