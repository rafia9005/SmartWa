import { Ctx } from "@mengkodingan/ckptw";

const MenuHandler = {
  name: "menu",
  code: async (ctx: Ctx) => {
    try {
      const commands = [
        { command: "!ping", description: "Cek status bot." },
        { command: "!stiker", description: "Ubah gambar menjadi stiker." },
        { command: "!gemini", description: "Tanya AI Gemini." },
        { command: "!image", description: "text to image" },
        { command: "!tiktok", description: "Tiktok downlaoder" },
        { command: "!author", description: "Lihat informasi penulis bot." },
        //{ command: "!server", description: "Lihat spesifikasi server." },
      ];

      const menuText =
        `📋 *Daftar Command*\n` +
        `\n` +
        `${commands
          .map(
            (cmd, index) =>
              `${index + 1}. *${cmd.command}* - ${cmd.description}`,
          )
          .join("\n")}\n` +
        `\n` +
        `Gunakan command di atas untuk berinteraksi dengan bot.`;

      return await ctx.sendMessage(ctx.id || "", {
        text: menuText,
      });
    } catch (error) {
      console.error("Error:", error);
      return await ctx.reply("Terjadi kesalahan saat memproses permintaan.");
    }
  },
};

module.exports = MenuHandler;
