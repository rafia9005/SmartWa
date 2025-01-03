import dotenv from "dotenv"
dotenv.config()

export const ENV = {
  GEMINI: process.env.GEMINI || "",
  AUTHOR: process.env.AUTHOR || ""
}
