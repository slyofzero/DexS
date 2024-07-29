// import { Bot } from "grammy";
// import { initiateBotCommands, initiateCallbackQueries } from "./bot";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

puppeteer.use(StealthPlugin());

async function getTrendingTokens() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const headers = {
    "set-cookie":
      "__cf_bm=Ei3UHAlZLB0LoZt2SlF5oAZ1wphKHP1vDksyU13LNNc-1722227995-1.0.1.1-t1_CWw.RdzdkshRuWunMJlreSlU_NC2BDbo1fovUQAU7j1bchrHPp47scLeLn1k7g9yp8Jui86AI.ITTKcqkwg",
    Origin: "https://www.geckoterminal.com",
    Referrer: "https://www.geckoterminal.com/",
    Host: "app.geckoterminal.com",
  };

  page.setExtraHTTPHeaders(headers);

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
