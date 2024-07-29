// import { Bot } from "grammy";
// import { initiateBotCommands, initiateCallbackQueries } from "./bot";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

puppeteer.use(StealthPlugin());

async function getTrendingTokens() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // const ws = new WebSocket(DEX_URL || "", { headers: wssHeaders });

  await page.goto(
    "https://app.geckoterminal.com/api/p1/solana/pools?include=dex,dex.network,dex.network.network_metric,tokens&page=1&include_network_metrics=true&sort=-1h_trend_score&networks=solana"
  );

  const allText = await page.evaluate(() => {
    return document.body.innerText;
  });

  await browser.close();

  return allText;
}

(async function () {
  const trendingTokensList = await getTrendingTokens();
  console.log(trendingTokensList);
})();
