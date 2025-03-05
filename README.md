## Disclaimer:
This project was created for fun and personal use—there's no professional purpose behind it, just a little side hobby of mine. So, if you're looking for something super polished, you might want to look elsewhere. But if you need a quick and dirty scraper to pull some game prices, well, you're in the right place!

# E-Shop Price Scraper

This is a web scraper designed to fetch data about popular games from the E-Shop Prices website. The scraper filters games based on their popularity and retrieves only those that are priced below a specified amount.

## Features:
- Fetches data from the E-Shop Prices website, focusing on popular games.
- Filters games that are priced below a user-specified threshold.
- Supports pagination for scraping multiple pages.
- Handles CAPTCHA detection by using Puppeteer to bypass it manually.
- Results are written to a text file for easy access.

## Requirements:
- Node.js
- Axios
- Cheerio
- Puppeteer
- File System

## Installation:

1. Clone the repository:
   ```
   git clone https://github.com/guvncnyldz/nintendo-price-and-popularity-based-scraper.git
   cd eshop-price-scraper
   ```

2. Install the necessary dependencies:
   ```
   npm install
   ```

## Usage:

You can run the scraper with the following command:
```
node scraper.js <maxPrice> <maxPages>
```

- `<maxPrice>`: The maximum price (in USD) for the games to be included. Default is `10.00` if not provided.
- `<maxPages>`: The number of pages to scrape. Default is `10` if not provided.

### Example:
```
node scraper.js 7.00 5
```

This will scrape the first 5 pages for games priced below $7.00, sorted by popularity.

## How It Works:

1. The scraper fetches pages from the **E-Shop Prices** website, specifically targeting **popular games** (sorted by popularity).
2. For each game, it checks if the price is below the specified threshold (`maxPrice`).
3. The relevant data (game name and price) is then written to a text file named `games_under_max_price.txt`.
4. If a CAPTCHA is detected (status code 429), the script will open a browser via Puppeteer and wait for you to bypass the CAPTCHA manually. Once bypassed, the scraper will continue where it left off.
