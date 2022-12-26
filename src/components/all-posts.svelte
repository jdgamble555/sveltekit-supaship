<script lang="ts">
	import type { GetPostsResponse } from '$lib/database.types';
	import { useSession } from '$lib/session-store';
	import CreatePost from './create-post.svelte';
	import Post from './post.svelte';

	$: ({ session } = $useSession);
	export let pageNumber: string;

	const posts: GetPostsResponse[] = [];
</script>

<h2>All Posts; page: {pageNumber}</h2>
<br />
{#if session}
	<CreatePost />
{/if}

{#if posts}
	<div class="posts-container">
		{#each posts as post (post.id)}
			<Post {post} />
		{/each}
	</div>
{/if}

<!--
      <div class="posts-container">
    {posts?.map((post, i) => (
      <Post
        key={post.id}
        postData={post}
        myVote={myVotes?.[post.id] || undefined}
        onVoteSuccess={() => {
          setBumper(bumper + 1);
        }}
      />
    ))}
  </div>
-->
