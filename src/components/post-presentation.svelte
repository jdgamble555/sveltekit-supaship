<script lang="ts">
	import { usePostScore } from '$lib/post-score-store';
	import type { PostDetailData, Comment } from '$lib/post.types';
	import { useSession } from '$lib/session-store';
	import { timeAgo } from '$lib/time-ago';
	import CommentView from './comment-view.svelte';
	import CreateComment from './create-comment.svelte';
	import UpVote from './up-vote.svelte';

	export let postDetailData: PostDetailData;
	export let nestedComments: Comment[];

	$: ({ session } = $useSession);

	const score = usePostScore(postDetailData.post?.id || '', postDetailData.post?.score);
</script>

<div class="post-detail-outer-container">
	<div class="post-detail-inner-container">
		<div class="post-detail-upvote-container">
			<UpVote
				direction="up"
				filled={!!postDetailData.myVotes &&
					!!postDetailData.post &&
					postDetailData.myVotes[postDetailData.post.id] === 'up'}
				enabled={!!session}
				{session}
				postId={postDetailData.post?.id || ''}
			/>
			<p class="text-center" data-e2e="upvote-count">
				{$score}
			</p>
			<UpVote
				direction="down"
				filled={!!postDetailData.myVotes &&
					!!postDetailData.post &&
					postDetailData.myVotes[postDetailData.post.id] === 'down'}
				enabled={!!session}
				{session}
				postId={postDetailData.post?.id || ''}
			/>
		</div>

		<div class="post-detail-body">
			<p>
				Posted By {postDetailData.post?.author_name}{' '}
				{postDetailData.post && `${timeAgo(postDetailData.post?.created_at)} ago`}
			</p>
			<h3 class="text-2xl">{postDetailData.post?.title}</h3>
			<p class="post-detail-content" data-e2e="post-content">
				{postDetailData.post?.content}
			</p>
			{#if session && postDetailData?.post}
				<CreateComment parent={postDetailData.post} />
			{/if}
			{#each nestedComments as comment (comment.id)}
				<CommentView {comment} myVotes={postDetailData.myVotes} />
			{/each}
		</div>
	</div>
</div>
