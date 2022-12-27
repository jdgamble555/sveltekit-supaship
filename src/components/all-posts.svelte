<script lang="ts">
	import { bumper } from '$lib/stores';
	import type { GetPostsResponse } from '$lib/database.types';
	import { useSession } from '$lib/session-store';
	import { supaClient } from '$lib/supa-client';
	import { derived } from 'svelte/store';
	import CreatePost from './create-post.svelte';
	import Post from './post.svelte';

	$: ({ session } = $useSession);
	export let pageNumber: string;

	interface GetPosts {
		data: GetPostsResponse[];
		votes: Record<string, 'up' | 'down' | undefined>;
	}

	const posts = derived<[typeof useSession, typeof bumper], GetPosts>(
		[useSession, bumper],
		([_session, _$bumper], set) => {
			const queryPageNumber = pageNumber ? +pageNumber : 1;
			supaClient
				.rpc('get_posts', { page_number: queryPageNumber })
				.select('*')
				.then(({ data }) => {
					set({ data: data as GetPostsResponse[], votes: {} });
					const session = _session.session;
					if (session?.user) {
						supaClient
							.from('post_votes')
							.select('*')
							.eq('user_id', session.user.id)
							.then(({ data: votesData }) => {
								if (!votesData) {
									return;
								}
								const votes = votesData.reduce((acc, vote) => {
									acc[vote.post_id] = vote.vote_type as any;
									return acc;
								}, {} as Record<string, 'up' | 'down' | undefined>);
								set({ data: data as GetPostsResponse[], votes });
							});
					}
				});
		}
	);
</script>

<h2>All Posts; page: {pageNumber}</h2>
<br />
{#if session}
	<CreatePost />
{/if}

{#if $posts?.data}
	<div class="posts-container">
		{#each $posts?.data as post (post.id)}
			<Post postData={post} myVote={$posts.votes?.[post.id] || undefined} />
		{/each}
	</div>
{/if}
