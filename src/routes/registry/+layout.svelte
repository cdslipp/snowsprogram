<script lang="ts">
	let { children } = $props();
</script>

<svelte:head>
	<title>Registry Theatre | Sometimes It Snows In April</title>
</svelte:head>

<div class="bg-black text-white min-h-screen">
	<!-- Back link with background -->
	<div class="fixed top-4 left-4 z-40">
		<a 
			href="/" 
			class="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-all duration-300 text-sm bg-black/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-800 hover:border-gray-600 hover:bg-black/90"
		>
			<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
			</svg>
			Back to Main Program
		</a>
	</div>
	
	<!-- Main content -->
	<div class="relative">
		{@render children()}
	</div>
</div>