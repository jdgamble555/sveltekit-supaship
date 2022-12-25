<script lang="ts">
	import { useSession } from '$lib/session-store';
	import Login from './login.svelte';

	$: ({ session } = $useSession);
</script>

<div class="message-board-container">
	<a href="/1">
		<h2 class="message-board-header-link">Message Board</h2>
	</a>
	{#if session}
		<div />
	{:else}
		<h2 class="message-board-login-message" data-e2e="message-board-login">
			Yo Dawg. you gotta <Login /> to join in the discussion.
		</h2>
	{/if}
	<slot />
</div>
