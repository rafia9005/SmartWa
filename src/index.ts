import { Client, CommandHandler, Events } from "@mengkodingan/ckptw";
import path from "path";

export const bot = new Client({
  prefix: "!",
  printQRInTerminal: true,
  readIncommingMsg: true
})

bot.ev.once(Events.ClientReady, (m) => {
    console.log(`ready at ${m.user.id}`);
});

const cmd = new CommandHandler(bot, path.resolve(__dirname, "handler"));
cmd.load()

bot.launch();
