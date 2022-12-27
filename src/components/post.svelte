<script lang="ts">
	import type { GetPostsResponse } from '$lib/database.types';
	import { usePostScore } from '$lib/post-score-store';
	import { useSession } from '$lib/session-store';
	import { timeAgo } from '$lib/time-ago';
	import UpVote from './up-vote.svelte';

	export let postData: GetPostsResponse;
	export let myVote: 'up' | 'down' | undefined;

	const score = usePostScore(postData.id, postData.score);

	$: ({ session } = $useSession);
</script>

<div class="post-container">
	<div class="post-upvote-container">
		<UpVote
			direction="up"
			filled={myVote === 'up'}
			enabled={!!session}
			{session}
			postId={postData.id}
		/>
		<p class="text-center" data-e2e="upvote-count">
			{$score}
		</p>
		<UpVote
			direction="down"
			filled={myVote === 'down'}
			enabled={!!session}
			{session}
			postId={postData.id}
		/>
	</div>
	<a href={`/post/${postData.id}`} class="flex-auto">
		<p class="mt-4">
			Posted By {postData.username}
			{timeAgo(postData.created_at)}{' '}
			ago
		</p>
		<h3 class="text-2xl">{postData.title}</h3>
	</a>
</div>
