export const state = {
  feeds: [], // [{ id, title, description, url }]
  posts: [], // [{ id, feedId, title, link, id }]
};

export const addFeed = (feed) => {
  state.feeds.push(feed);
};

export const addPosts = (posts) => {
  const existingPostLinks = state.posts.map(post => post.link);
  const newPosts = posts
    .filter(post => !existingPostLinks.includes(post.link))
    .map((post, index) => ({
      id: `post-${Date.now()}-${index}`,
      ...post,
    }));
  state.posts.push(...newPosts);
};

export const isFeedAlreadyAdded = (url) => {
  return state.feeds.some((feed) => feed.url === url);
};

export const getFeeds = () => state.feeds;
export const getPosts = () => state.posts;


