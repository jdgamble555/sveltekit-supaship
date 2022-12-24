<script lang="ts">
	import { showModal } from '$lib/stores';

	const toggleModal = () => showModal.update((updater) => !updater);

	const escape = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			showModal.set(false);
		}
	};
</script>

<svelte:window on:keydown={(e) => escape(e)} />

<div class="dialog-container" />
<div on:click={toggleModal} on:keydown={toggleModal} class="dialog-backdrop">
	<div class="dialog-placement">
		<div class="relative group">
			<div class="dialog-accent-border group-hover:opacity-100 group-hover:duration-2000" />
			<div class="dialog-content-container" on:click|stopPropagation on:keydown|stopPropagation>
				<slot />
				<button on:click={() => showModal.set(false)}>Close</button>
			</div>
		</div>
	</div>
</div>
