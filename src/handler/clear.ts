import { Ctx } from "@mengkodingan/ckptw";
import { deleteChatHistory } from "../tools/tools";

const ClearHandler = {
  name: "clear",
  code: async (ctx: Ctx) => {
    ctx.simulateTyping();
    const userId = ctx.msg.key.remoteJid;
    deleteChatHistory(userId || "");

    return ctx.sendMessage(ctx.id || "", {
      text: `Succes clean session ${userId} 😁`,
    });
  },
};

module.exports = ClearHandler;
