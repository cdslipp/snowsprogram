<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>Sometimes It Snows In April | Theatre Program</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta name="theme-color" content="#000000" />
</svelte:head>

<div class="bg-black text-white min-h-screen">
	{@render children()}
</div>
