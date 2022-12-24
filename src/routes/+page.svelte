<script lang="ts">
	import Navbar from '@components/navbar.svelte';
</script>

<div class="grid grid-cols-1 place-content-center">
	<Navbar />
	<slot />
</div>
