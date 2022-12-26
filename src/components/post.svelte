<script lang="ts">
	import type { GetPostsResponse } from '$lib/database.types';
	import { usePostScore } from '$lib/post-score';
	import { timeAgo } from '$lib/time-ago';

	export let postData: GetPostsResponse;
	//export let myVote: "up" | "down" | undefined;

	const score = usePostScore(postData.id, postData.score);
</script>

<div class="post-container">
	<div class="post-upvote-container">
		<!--
		<UpVote
		direction="up"
		filled={myVote === "up"}
		enabled={!!session}
		onClick={async () => {
		  await castVote({
			postId: postData.id,
			userId: session?.user.id as string,
			voteType: "up",
			onSuccess: () => {
			  onVoteSuccess();
			},
		  });
		}}
	  />
	  -->
		<p class="text-center" data-e2e="upvote-count">
			{$score}
		</p>
		<!--
		<UpVote
		direction="down"
		filled={myVote === "down"}
		enabled={!!session}
		onClick={async () => {
		  await castVote({
			postId: postData.id,
			userId: session?.user.id as string,
			voteType: "down",
			onSuccess: () => {
			  onVoteSuccess();
			},
		  });
		}}
	  />
	  -->
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
