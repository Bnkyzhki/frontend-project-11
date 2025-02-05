export const state = {
  feeds: [], // [{ id, title, description, url }]
  posts: [], // [{ id, feedId, title, link }]
};

export const addFeed = (feed) => {
  state.feeds.push(feed);
};

export const addPosts = (posts) => {
  state.posts.push(...posts);
};

export const isFeedAlreadyAdded = (url) => {
  return state.feeds.some((feed) => feed.url === url);
};

export const getFeeds = () => state.feeds;
export const getPosts = () => state.posts;


