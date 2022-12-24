<script lang="ts">
	import { authMode, showModal } from '$lib/stores';
</script>

<div class="flex m-4 place-items-center">
	<button
		class="login-button"
		on:click={() => {
			authMode.set('sign_in');
			showModal.set(true);
		}}
	>
		login
	</button>{' '}
	<span class="p-2"> or </span>{' '}
	<button
		class="login-button"
		on:click={() => {
			authMode.set('sign_up');
			showModal.set(true);
		}}
	>
		sign up
	</button>
</div>
