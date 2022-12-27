<script lang="ts">
	import { usePostScore } from '$lib/post-score-store';
	import type { Comment } from '$lib/post.types';
	import { useSession } from '$lib/session-store';
	import { timeAgo } from '$lib/time-ago';
	import CreateComment from './create-comment.svelte';
	import CommentView from './comment-view.svelte';
	import UpVote from './up-vote.svelte';

	export let comment: Comment;
	export let myVotes: Record<string, 'up' | 'down' | undefined> | undefined;

	$: ({ session } = $useSession);

	let commenting = false;

	const score = usePostScore(comment.id, comment.score);
</script>

<div class="post-detail-comment-container" data-e2e={`comment-${comment.id}`}>
	<div class="post-detail-comment-inner-container">
		<div class="post-detail-comment-upvote-container">
			<UpVote
				direction="up"
				filled={myVotes?.[comment.id] === 'up'}
				enabled={!!session}
				{session}
				postId={comment.id}
			/>
			<p class="text-center" data-e2e="upvote-count">
				{$score}
			</p>
			<UpVote
				direction="down"
				filled={myVotes?.[comment.id] === 'down'}
				enabled={!!session}
				{session}
				postId={comment.id}
			/>
		</div>
		<div class="post-detail-comment-body">
			<p>
				{comment.author_name} - {timeAgo(comment.created_at)} ago
			</p>
			<p class="post-detail-comment-content" data-e2e="comment-content">
				{comment.content}
			</p>
			{#if commenting}
				<CreateComment bind:commenting parent={comment} />
			{:else}
				<div class="ml-4">
					<button on:click={() => (commenting = !commenting)} disabled={!session}>
						{commenting ? 'Cancel' : 'Reply'}
					</button>
				</div>
			{/if}
			{#each comment.comments as c (c.id)}
				<CommentView comment={c} {myVotes} />
			{/each}
		</div>
	</div>
</div>
