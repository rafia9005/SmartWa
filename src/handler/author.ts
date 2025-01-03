import { Ctx, VCardBuilder } from "@mengkodingan/ckptw";
import { ENV } from "../env";

const AuthorHandler = {
  name: "author",
  code: async (ctx: Ctx) => {
    const vcard = new VCardBuilder()
      .setFullName("Ahmad Rafi")
      .setOrg("Tuxedo Labs")
      .setNumber(ENV.AUTHOR)
      .build();

    return ctx.sendMessage(ctx.id || "", {
      contacts: {
        displayName: "Ahmad Rafi",
        contacts: [{ vcard }],
      },
    });
  },
};

module.exports = AuthorHandler;
