<script lang="ts">
	let { children } = $props();
</script>

<svelte:head>
	<title>Sometimes It Snows In April | Theatre Program</title>
</svelte:head>

<div class="bg-black text-white min-h-screen">
	{@render children()}
</div>
