import { Ctx } from "@mengkodingan/ckptw";
import os from "os";

const ServerHandler = {
  name: "server",
  code: async (ctx: Ctx) => {
    try {
      const osType = os.type();
      const osArch = os.arch();
      const osRelease = os.release();

      const cpuModel = os.cpus()[0].model;
      const cpuSpeed = os.cpus()[0].speed;
      const cpuCores = os.cpus().length;

      const totalMem = os.totalmem();
      const freeMem = os.freemem();
      const usedMem = totalMem - freeMem;

      const formatMemory = (bytes: number) => {
        const MB = 1024 * 1024;
        const GB = 1024 * 1024 * 1024;
        if (bytes >= GB) {
          return `${(bytes / GB).toFixed(2)} GB`;
        } else {
          return `${(bytes / MB).toFixed(2)} MB`;
        }
      };

      const formatUptime = (seconds: number) => {
        const days = Math.floor(seconds / (24 * 60 * 60));
        const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
        const minutes = Math.floor((seconds % (60 * 60)) / 60);
        const secs = Math.floor(seconds % 60);

        let uptimeString = "";
        if (days > 0) uptimeString += `${days} hari, `;
        if (hours > 0) uptimeString += `${hours} jam, `;
        if (minutes > 0) uptimeString += `${minutes} menit, `;
        uptimeString += `${secs} detik`;

        return uptimeString;
      };

      const uptime = formatUptime(os.uptime());

      const message =
        `📊 *Spesifikasi Server*\n` +
        `\n` +
        `🖥️ *OS*: ${osType} (${osArch} / ${osRelease})\n` +
        `💻 *CPU*: ${cpuModel} (${cpuCores} core(s) @ ${cpuSpeed} MHz)\n` +
        `🧠 *Memory*: ${formatMemory(usedMem)} / ${formatMemory(totalMem)} (Used / Total)\n` +
        `⏳ *Uptime*: ${uptime}\n`;

      return await ctx.reply(message);
    } catch (error) {
      console.error("Error:", error);
      return await ctx.reply("Terjadi kesalahan saat memproses permintaan.");
    }
  },
};

module.exports = ServerHandler
