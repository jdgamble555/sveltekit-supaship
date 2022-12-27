<script lang="ts">
	import { page } from '$app/stores';
	import AllPosts from '@components/all-posts.svelte';
</script>

<AllPosts pageNumber={$page.params.pageNumber} />
