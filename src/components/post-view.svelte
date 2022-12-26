<script lang="ts">
	import type { PostDetailData } from '$lib/post.types';
	import { getPostDetails } from '$lib/post';
	import { useSession } from '$lib/session-store';
	import { derived } from 'svelte/store';
	import PostPresentation from './post-presentation.svelte';

	export let postId: string;

	const params = { postId };

	const postDetailData = derived<typeof useSession, PostDetailData>(
		useSession,
		(userContext, set) => {
			getPostDetails({ params, userContext }).then((newPostDetailData) => {
				if (newPostDetailData) {
					set(newPostDetailData);
				}
			});
		}
	);
</script>

<!--
    <PostPresentation {postDetailData} {userContext} {setBumper} {bumper} {nestedComments} />
-->

<PostPresentation postDetailData={$postDetailData} />
