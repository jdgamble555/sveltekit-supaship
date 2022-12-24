<script lang="ts">
	import AllPosts from '@components/all-posts.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<AllPosts pageNumber={data.pageNumber} />
