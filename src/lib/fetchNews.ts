// lib/fetchNews.ts
import Parser from "rss-parser";

const parser = new Parser();

export interface NewsItem {
  title: string;
  url: string;
  summary: string;
}

export async function fetchNews(): Promise<NewsItem[]> {
  const feeds = [
    "https://feeds.bloomberg.com/markets/news.rss",
    "https://www.cnbc.com/id/10001147/device/rss/rss.html",
    "https://www.investing.com/rss/news.rss",
    "https://feeds.bbci.co.uk/news/business/rss.xml",
    "https://feeds.content.dowjones.io/public/rss/mw_topstories"
    
  ];

  const results: NewsItem[] = [];

  for (const feed of feeds) {
    try {
      const parsed = await parser.parseURL(feed);
      parsed.items.slice(0, 3).forEach((item) => {
        results.push({
          title: item.title ?? "No title",
          url: item.link ?? "#",
          summary: item.contentSnippet ?? "No summary available.",
        });
      });
    } catch (err) {
      console.error("Error fetching RSS feed:", feed, err);
    }
  }

  return results;
}
