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
  const headers = {
    "set-cookie":
      "__cf_bm=Ei3UHAlZLB0LoZt2SlF5oAZ1wphKHP1vDksyU13LNNc-1722227995-1.0.1.1-t1_CWw.RdzdkshRuWunMJlreSlU_NC2BDbo1fovUQAU7j1bchrHPp47scLeLn1k7g9yp8Jui86AI.ITTKcqkwg",
    // Origin: "https://www.geckoterminal.com",
    // Referrer: "https://www.geckoterminal.com/",
    // Host: "app.geckoterminal.com",
  };

  // page.setExtraHTTPHeaders(headers);

  const response = await page.goto(DATA_URL || "", {
    waitUntil: "networkidle0",
  });

  const allText = await response?.text();

  await browser.close();

  return allText;
}

(async function () {
  const trendingTokensList = await getTrendingTokens();
  console.log(trendingTokensList);
})();
