<script lang="ts">
	import { useSession } from '$lib/session-store';
	import { supaClient } from '$lib/supa-client';

	$: ({ profile } = $useSession);
</script>

<div class="flex flex-col">
	<h2>Welcome {profile?.username || 'dawg'}.</h2>
	<button on:click={() => supaClient.auth.signOut()} class="user-menu-logout-button">
		Logout
	</button>
</div>
