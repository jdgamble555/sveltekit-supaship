<script lang="ts">
	import { page } from '$app/stores';
	import PostView from '@components/post-view.svelte';
</script>

<PostView postId={$page.params.postId} />
