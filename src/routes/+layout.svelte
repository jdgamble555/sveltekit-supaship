<script>
	import Navbar from '@components/nav-bar.svelte';
	import '@styles/app.css';
</script>

<svelte:head>
	<title>Supaship - the SvelteKit version!</title>
</svelte:head>

<Navbar />
<slot />
