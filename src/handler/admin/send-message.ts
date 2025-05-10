import { Ctx } from "@mengkodingan/ckptw";
import { ENV } from "../../env";  // Pastikan ENV berisi variabel yang dibutuhkan

const GeminiHandler = {
    name: "message",
    code: async (ctx: Ctx) => {
        const userNumber = ctx.msg.key.participant?.split('@')[0];
        const authorNumber = ENV.AUTHOR;
        console.log(userNumber)
        if (userNumber === authorNumber) {
            await ctx.reply(`Selamat datang, Anda memiliki akses ke prefix dengan kunci MONSTER_API`);
        } else {
            await ctx.reply("Maaf, Anda tidak memiliki akses ke prefix ini.");
        }
    },
};

module.exports = GeminiHandler;

