export const searchGoogle = async (query, serperApiKey) => {
  const response = await fetch("https://google.serper.dev/search", {
    method: 'POST',
    headers: {
      'X-API-KEY': serperApiKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ q: query, num: 3 })
  });
  const data = await response.json();
  return data.organic ? data.organic.map(result => result.link) : [];
};

export const scrapeWebsite = async (url) => {
  try {
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
    const response = await fetch(proxyUrl);
    const data = await response.json();
    
    const parser = new DOMParser();
    const doc = parser.parseFromString(data.contents, 'text/html');
    
    const scripts = doc.querySelectorAll('script, style, nav, footer, header');
    scripts.forEach(s => s.remove());
    
    const rawText = doc.body.innerText.replace(/\s+/g, ' ').trim();
    return rawText.substring(0, 3000); 
  } catch (error) {
    console.error(`Failed to scrape ${url}:`, error);
    return null;
  }
};
