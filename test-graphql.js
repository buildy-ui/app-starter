// Quick test of GraphQL integration
import { getPosts } from './src/data/posts/index.ts';

async function test() {
  console.log('Testing GraphQL integration...');
  try {
    const result = await getPosts();
    console.log('Success! Loaded', result.posts.length, 'posts');
    if (result.posts.length > 0) {
      console.log('First post:', result.posts[0].title);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

test();
