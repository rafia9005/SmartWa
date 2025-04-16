import { Client, CommandHandler, Ctx, Events } from "@mengkodingan/ckptw";
import path from "path";
import fs from "fs";

export const bot = new Client({
  prefix: ".",
  printQRInTerminal: true,
  readIncommingMsg: true,
});

const bioTexts = [
  "💪 Stay focused, stay strong, and keep pushing forward!",
  "🌟 The future belongs to those who believe in the beauty of their dreams.",
  "🚀 Every day is a new opportunity to grow!",
  "🔥 Success comes from hard work and perseverance!",
  "🌱 Small steps lead to big changes!",
  "💡 Believe in yourself and anything is possible!",
  "🌟 The journey is just as important as the destination!",
  "✨ Progress is progress, no matter how small!",
  "🔥 Stay positive, work hard, and make it happen!",
  "🌈 Great things never come from comfort zones.",
];

let currentBioIndex = 0;
let currentPpIndex = 0;
let profilePictures: string[] = [];
const cmd = new CommandHandler(bot, path.resolve(__dirname, "handler"));

function loadProfilePictures() {
  const photosDir = path.join(__dirname, "./photo");
  const allowedExtensions = [".png", ".jpg", ".jpeg"];

  try {
    const files = fs.readdirSync(photosDir);
    profilePictures = files
      .filter((file) =>
        allowedExtensions.some((ext) => file.toLowerCase().endsWith(ext)),
      )
      .map((file) => path.join(photosDir, file))
      .sort();

    console.log(`Loaded ${profilePictures.length} profile pictures`);
  } catch (error) {
    console.error("Error loading profile pictures:", error);
  }
}

bot.ev.once(Events.ClientReady, (m) => {
  console.log(`ready at ${m.user.id}`);
  loadProfilePictures();
  updateBio();
  updateProfilePicture(m.user.id);
  cmd.load();
});

function updateBio() {
  const bio = bioTexts[currentBioIndex];

  bot.bio(bio);
  currentBioIndex = (currentBioIndex + 1) % bioTexts.length;
  setTimeout(updateBio, 10000);
}

async function updateProfilePicture(jid: string) {
  if (!profilePictures.length) {
    console.warn("No profile pictures available");
    return setTimeout(() => updateProfilePicture(jid), 20000);
  }

  const imagePath = profilePictures[currentPpIndex];

  try {
    const imageBuffer = fs.readFileSync(imagePath);

    await bot.core.updateProfilePicture(jid, imageBuffer);


    currentPpIndex = (currentPpIndex + 1) % profilePictures.length;
  } catch (error) {
    console.error(`Failed on ${path.basename(imagePath)}:`, error);

    currentPpIndex = (currentPpIndex + 1) % profilePictures.length;
  }

  setTimeout(() => updateProfilePicture(jid), 10000);
}

bot.launch();
