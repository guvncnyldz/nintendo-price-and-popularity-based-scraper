const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const fs = require('fs');

function appendToFile(data) {
  fs.appendFileSync('games_under_max_price.txt', data + '\n', 'utf8');
}

function writeToFile(text) {
  fs.writeFileSync('games_under_max_price.txt', text);
}

const maxPrice = parseFloat(process.argv[2]) || 10.00;
const maxPages = parseInt(process.argv[3]) || 10;

async function fetchPage(page) {
  const url = `https://eshop-prices.com/games/popular?currency=USD&page=${page}`;

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    $('a.games-list-item').each((index, element) => {
      const priceText = $(element).find('.price-tag').contents().filter(function () {
        return this.nodeType === 3;
      }).text().trim().replace('$', '').replace(',', '');

      const price = parseFloat(priceText);

      if (priceText === "FREE" || price <= maxPrice) {
        const title = $(element).find('h5').text().trim();
        const data = `Game: ${title}, Price: ${priceText === "FREE" ? priceText : "$" + price}`;
        appendToFile(data);
      }
    });
  } catch (error) {
    if (error.response && error.response.status === 429) {
      console.log(`Captcha Detected...`);
      await tryBypassCaptcha(url);
      return fetchPage(page);
    }

    console.error(error);
  }
}

async function tryBypassCaptcha(url) {
  console.log(`DO NOT CLOSE PAGE`);
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url);
  console.log('bypass CAPTCHA and close page...');

  await new Promise((resolve, reject) => {
    const interval = setInterval(async () => {
      const targets = await browser.targets();
      const target = targets.find(t => t.type() === 'page');
      if (!target) {
        clearInterval(interval);
        resolve();
      }
    }, 1000);
  });

  console.log('Browser closed...');
}

async function fetchAllPages() {
  for (let page = 1; page <= maxPages; page++) {
    console.log(`Fetching page ${page}...`);
    await fetchPage(page);
  }
}

writeToFile("");
fetchAllPages();
