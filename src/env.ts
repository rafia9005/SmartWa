import dotenv from "dotenv"
dotenv.config()

export const ENV = {
  MONSTER_API: process.env.MONSTER_API || "",
  GEMINI: process.env.GEMINI || "",
  AUTHOR: process.env.AUTHOR || ""
}
