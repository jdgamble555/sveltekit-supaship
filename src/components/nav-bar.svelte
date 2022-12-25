<script lang="ts">
	import { useSession } from '$lib/session-store';
	import { showModal } from '$lib/stores';
	import Auth from './auth.svelte';
	import Dialog from './dialog.svelte';
	import Login from './login.svelte';
	import UserMenu from './user-menu.svelte';

	$: ({ session } = $useSession);
</script>

<nav class="nav-bar">
	<a class="nav-logo-link" href="/">
		<img
			id="logo"
			class="nav-logo"
			src="https://supaship.io/supaship_logo_with_text.svg"
			alt="logo"
		/>
	</a>

	<ul class="nav-right-list">
		<li class="nav-message-board-list-item">
			<a href="/1" class="nav-message-board-link">message board</a>
		</li>
		<li class="nav-auth-item">
			{#if session?.user}
				<UserMenu />
			{:else}
				<Login />
				{#if $showModal}
					<Dialog>
						<Auth />
					</Dialog>
				{/if}
			{/if}
		</li>
	</ul>
</nav>
