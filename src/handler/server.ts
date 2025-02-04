import { Ctx } from "@mengkodingan/ckptw";
import os from "os";

const ServerHandler = {
  name: "server",
  code: async (ctx: Ctx) => {
    try {
      const osType = os.type();
      const osArch = os.arch();
      const osRelease = os.release();

      const cpus = os.cpus();
      const cpuModel = cpus[0].model;
      const cpuSpeed = cpus[0].speed;
      const cpuCores = cpus.length;

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

      const formatPercentage = (used: number, total: number) => {
        return ((used / total) * 100).toFixed(2) + '%';
      };

      const uptime = formatUptime(os.uptime());
      const usedMemPercentage = formatPercentage(usedMem, totalMem);
      const freeMemPercentage = formatPercentage(freeMem, totalMem);

      const message =
        `📊 *Spesifikasi Server*\n` +
        `\n` +
        `🖥️ *OS*: ${osType} (${osArch} / ${osRelease})\n` +
        `\n` +
        `💻 *CPU*\n` +
        `  ├─ *Model*: ${cpuModel}\n` +
        `  ├─ *Kecepatan*: ${cpuSpeed} MHz\n` +
        `  └─ *Jumlah Core*: ${cpuCores} core(s)\n` +
        `\n` +
        `🧠 *Memory*\n` +
        `  ├─ *Total*: ${formatMemory(totalMem)}\n` +
        `  ├─ *Digunakan*: ${formatMemory(usedMem)} (${usedMemPercentage})\n` +
        `  └─ *Tersedia*: ${formatMemory(freeMem)} (${freeMemPercentage})\n` +
        `\n` +
        `⏳ *Uptime*: ${uptime}\n`;

      return await ctx.reply(message);
    } catch (error) {
      console.error("Error:", error);
      return await ctx.reply("Terjadi kesalahan saat memproses permintaan.");
    }
  },
};

module.exports = ServerHandler;
