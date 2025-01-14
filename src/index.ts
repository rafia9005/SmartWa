import {
  Client,
  CommandHandler,
  Ctx,
  Events,
  MessageType,
} from "@mengkodingan/ckptw";
import path from "path";
import { handleChat } from "./bot";

export const bot = new Client({
  prefix: "!",
  printQRInTerminal: true,
  readIncommingMsg: true
});

const bioTexts = [
  "🚀 Bot is active right now",
  "🚀 Bot created by Tuxedo Labs",
  "🌟 Stay tuned for updates!",
  "🔥 Powered by Node.js",
  "💻 Coding is fun!",
  "🌐 Always online!",
];

let currentBioIndex = 0;
const cmd = new CommandHandler(bot, path.resolve(__dirname, "handler"));

bot.ev.once(Events.ClientReady, (m) => {
  console.log(`ready at ${m.user.id}`);
  updateBio();
  cmd.load();
});

bot.hears(MessageType.conversation, async (ctx: Ctx) => {
  const messageText = ctx.msg?.content || "";
  if (messageText.startsWith("!")) {
    return;
  }

  handleChat(ctx);
});

function updateBio() {
  const bio = bioTexts[currentBioIndex];

  bot.bio(bio);
  currentBioIndex = (currentBioIndex + 1) % bioTexts.length;
  setTimeout(updateBio, 10000);
}

bot.launch();
