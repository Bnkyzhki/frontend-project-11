const state = {
  feeds: [],
  posts: [],
  viewedPosts: new Set(),
  isContentVisible: false,
};

const listeners = [];

export const addListener = (listener) => {
  listeners.push(listener);
};

export const addFeed = (feed) => {
  state.feeds = [...state.feeds, feed];
  listeners.forEach((listener) => listener('feeds', state.feeds));
};

export const addPosts = (posts) => {
  const existingPostLinks = new Set(state.posts.map((post) => post.link));
  const newPosts = posts.filter((post) => !existingPostLinks.has(post.link));
  state.posts = [...state.posts, ...newPosts];
  listeners.forEach((listener) => listener('posts', state.posts));
};

export const markPostAsViewed = (postId) => {
  state.viewedPosts.add(postId);
  listeners.forEach((listener) => listener('viewedPosts', state.viewedPosts));
};

export const toggleContentVisibility = (isVisible) => {
  state.isContentVisible = isVisible;
  listeners.forEach((listener) =>
    listener('isContentVisible', state.isContentVisible),
  );
};

export const isFeedAlreadyAdded = (url) =>
  state.feeds.some((feed) => feed.url === url);
export const getFeeds = () => state.feeds;
export const getPosts = () => state.posts;
export const getViewedPosts = () => state.viewedPosts;
export const getContentVisibility = () => state.isContentVisible;
