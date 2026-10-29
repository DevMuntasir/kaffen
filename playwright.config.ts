import { defineConfig } from "@playwright/test";
import { existsSync, readdirSync } from "node:fs";
import path from "node:path";
function chromiumPath() {
  if (process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH)
    return process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH;
  if (process.platform !== "win32" || !process.env.LOCALAPPDATA) return undefined;
  const cache = path.join(process.env.LOCALAPPDATA, "ms-playwright");
  if (!existsSync(cache)) return undefined;
  return readdirSync(cache)
    .filter((name) => /^chromium-\d+$/.test(name))
    .sort((a, b) => Number(b.split("-")[1]) - Number(a.split("-")[1]))
    .map((name) => path.join(cache, name, "chrome-win64", "chrome.exe"))
    .find(existsSync);
}
export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  workers: 1,
  timeout: 60000,
  use: { baseURL: "http://localhost:3100", launchOptions: { executablePath: chromiumPath() } },
  webServer: {
    command: "node scripts/preview.cjs",
    url: "http://localhost:3100",
    reuseExistingServer: true,
    timeout: 120000,
  },
});
