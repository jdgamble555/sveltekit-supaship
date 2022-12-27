<script lang="ts">
	import type { PostDetailData } from '$lib/post.types';
	import { getPostDetails } from '$lib/post';
	import { useSession } from '$lib/session-store';
	import { derived } from 'svelte/store';
	import PostPresentation from './post-presentation.svelte';
	import { unsortedCommentsToNested } from '$lib/comments';
	import { bumper } from '$lib/stores';

	export let postId: string;

	const params = { postId };

	const postDetailData = derived<[typeof useSession, typeof bumper], PostDetailData>(
		[useSession, bumper],
		([userContext, _bumper], set) => {
			getPostDetails({ params, userContext }).then((newPostDetailData) => {
				if (newPostDetailData) {
					set(newPostDetailData);
				}
			});
		}
	);
</script>

{#if $postDetailData}
	<PostPresentation
		postDetailData={$postDetailData}
		nestedComments={unsortedCommentsToNested($postDetailData.comments)}
	/>
{/if}
