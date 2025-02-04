import { exec } from "child_process";
import { Ctx } from "@mengkodingan/ckptw";

const CMDHandler = {
  name: "cmd",
  code: async (ctx: Ctx) => {
    const command = ctx.args.join(" ") || null;

    if (!command) {
      await ctx.sendMessage(ctx.id || "", {
        text: "Please provide a command to execute.",
      });
      return;
    }

    exec(command, (error, stdout, stderr) => {
      if (error) {
        ctx.sendMessage(ctx.id || "", {
          text: `Error: ${error.message}`,
        });
        return;
      }

      if (stderr) {
        ctx.sendMessage(ctx.id || "", {
          text: `Stderr: ${stderr}`,
        });
        return;
      }

      ctx.sendMessage(ctx.id || "", {
        text: `Output: ${stdout}`,
      });
    });
  },
};

module.exports = CMDHandler;
