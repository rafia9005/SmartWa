import path from "path";
import fs from "fs"

export function deleteChatHistory(userId: string): void {
  const filePath = getChatHistoryFilePath(userId);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
}

export function getChatHistoryFilePath(userId: string): string {
  const tmpDir = path.resolve("./tmp/chat");
  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir, { recursive: true });
  }
  return path.join(tmpDir, `${userId}.json`);
}

export function loadChatHistory(userId: string): any[] {
  const filePath = getChatHistoryFilePath(userId);
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  }
  return [];
}

export function saveChatHistory(userId: string, history: any[]): void {
  const filePath = getChatHistoryFilePath(userId);
  fs.writeFileSync(filePath, JSON.stringify(history, null, 2), "utf-8");
}
