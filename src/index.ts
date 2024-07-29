// import { Bot } from "grammy";
// import { initiateBotCommands, initiateCallbackQueries } from "./bot";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

puppeteer.use(StealthPlugin());

const DATA_URL =
  "https://www.geckoterminal.com/solana/pools?sort=-1h_trend_score&networks=solana";

async function getTrendingTokens() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(DATA_URL || "", {
    waitUntil: "networkidle0",
  });

  const trendingPools: string[] = [];

  // Wait for the <tbody> element to appear
  const divSelector = "div.w-full table";
  await page.waitForSelector(divSelector);
  const div = (await page.$$(divSelector)).at(2);
  const rows = (await div?.$$("tbody tr")) || [];

  for (const row of rows) {
    const cell = await row.$("td a");
    const link = await (await cell?.getProperty("href"))?.jsonValue();
    const pool = link?.split("/").at(-1);
    if (pool) trendingPools.push(pool);
  }

  await browser.close();

  return trendingPools;
}

(async function () {
  const trendingTokensList = await getTrendingTokens();
  console.log(trendingTokensList, trendingTokensList.length);
})();
