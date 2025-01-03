import { ENV } from "../env";

interface API {
  baseURL: string;
  APIKey?: string;
}

interface APIs {
  [key: string]: API;
}

const APIs: APIs = {
  gemini: {
    baseURL: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${ENV.GEMINI}`,
  },
  animegen: {
    baseURL: "https://api.nexoracle.com/ai/anime-gen?apikey=a56344876f307199b6&prompt="
  },
  tiktok: {
    baseURL: "https://api.nexoracle.com/downloader/tiktok-wm?apikey=a56344876f307199b6&url="
  }
};

function createUrl(apiName: string): string {
  try {
    const api = APIs[apiName];

    if (!api) {
      throw new Error(`API dengan nama "${apiName}" tidak ditemukan.`);
    }

    return api.baseURL;
  } catch (error) {
    console.error(`Error:`, error);
    return "";
  }
}

function listUrl(): APIs {
  return APIs;
}

export { createUrl, listUrl };
