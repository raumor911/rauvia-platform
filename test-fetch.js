import { fetchPosts } from './scripts/generate-sitemap.js';

async function run() {
  try {
    const posts = await fetchPosts();
    console.log(`Success! Fetched ${posts.length} posts.`);
    const newPost = posts.find(p => p.slug.includes('llegan-prospectos'));
    if (newPost) {
      console.log('Found new post:', newPost.slug);
    } else {
      console.log('New post not found. Slugs:', posts.map(p => p.slug));
    }
  } catch (err) {
    console.error('Error:', err);
  }
}

run();
