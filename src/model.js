import onChange from 'on-change';

export const state = onChange({
  feeds: [],
  posts: [],
  viewedPosts: new Set(),
}, () => {
});

export const addFeed = (feed) => {
  console.log('Adding feed:', feed);
  state.feeds.push(feed);
};

export const addPosts = (posts) => {
  console.log('Adding new posts:', newPosts);
  const existingPostLinks = state.posts.map(post => post.link);
  const newPosts = posts.filter(post => !existingPostLinks.includes(post.link));
  state.posts.push(...newPosts);
};

export const markPostAsViewed = (postId) => {
  state.viewedPosts.add(postId);
};

export const isFeedAlreadyAdded = (url) => state.feeds.some(feed => feed.url === url);
export const getFeeds = () => state.feeds;
export const getPosts = () => state.posts;
export const getViewedPosts = () => state.viewedPosts;




