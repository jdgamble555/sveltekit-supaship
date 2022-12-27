<script lang="ts">
	import PostView from '@components/post-view.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<PostView postId={data.postId} />
