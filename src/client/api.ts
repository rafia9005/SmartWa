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
