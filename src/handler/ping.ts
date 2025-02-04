import speedTest from "speedtest-net";
import { Ctx } from "@mengkodingan/ckptw";

const PingHandler = {
  name: "ping",
  code: async (ctx: Ctx) => {
    try {
      const result = await speedTest({ acceptLicense: true, acceptGdpr: true });

      const output = `
        Ping: ${result.ping.latency} ms
        Download: ${(result.download.bandwidth / 125000).toFixed(2)} Mbps
        Upload: ${(result.upload.bandwidth / 125000).toFixed(2)} Mbps
      `;

      await ctx.sendMessage(ctx.id || "", {
        text: output,
      });

    } catch (error:any) {
      await ctx.sendMessage(ctx.id || "", {
        text: `Error: ${error.message}`,
      });
    }
  },
};

module.exports = PingHandler;
