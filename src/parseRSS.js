const parseRSS = (xmlData) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlData, "application/xml");

  const parseError = doc.querySelector("parsererror");
  if (parseError) {
    throw new Error("rssLoadError");
  }

  const channel = doc.querySelector("channel");
  const feed = {
    title: channel.querySelector("title").textContent,
    description: channel.querySelector("description").textContent,
  };

  const posts = Array.from(channel.querySelectorAll("item")).map((item) => ({
    feedId: feed.id,
    title: item.querySelector("title").textContent,
    link: item.querySelector("link").textContent,
    description: item.querySelector("description")?.textContent || "",
  }));

  return { feed, posts };
};

export default parseRSS;
