<script lang="ts">
  import { page } from '$app/stores';
  import { getBioById, bios, type Bio } from '$lib/bios.js';


  // Get the current slug from the page store
  let currentSlug = $derived($page.params.slug);
  
  // Derive everything from the current slug
  let bio = $derived(getBioById(currentSlug) || null);
  let currentIndex = $derived(bio ? bios.findIndex(b => b.id === currentSlug) : -1);
  let totalBios = bios.length;

  let nextBio = $derived(currentIndex >= 0 && currentIndex < totalBios - 1 ? bios[currentIndex + 1] : null);
  let prevBio = $derived(currentIndex > 0 ? bios[currentIndex - 1] : null);
  let progress = $derived(currentIndex >= 0 ? ((currentIndex + 1) / totalBios) * 100 : 0);
  
  // Function to parse text and convert URLs to links
  function parseLinks(text: string): string {
    // Regular expression to match URLs with optional "See" prefix
    const urlRegex = /(See\s+)?(https?:\/\/[^\s]+)/gi;
    return text.replace(urlRegex, (match, seePrefix, url) => {
      const prefix = seePrefix || '';
      return `${prefix}<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors duration-200">${url}</a>`;
    });
  }

</script>

<style>
  /* Custom scrollbar styles */
  .bio-scroll::-webkit-scrollbar {
    width: 8px;
  }
  
  .bio-scroll::-webkit-scrollbar-track {
    background: rgba(17, 24, 39, 0.5);
    border-radius: 4px;
  }
  
  .bio-scroll::-webkit-scrollbar-thumb {
    background: rgba(75, 85, 99, 0.8);
    border-radius: 4px;
    transition: background 0.2s;
  }
  
  .bio-scroll::-webkit-scrollbar-thumb:hover {
    background: rgba(107, 114, 128, 0.9);
  }
  
  /* Firefox scrollbar styles */
  .bio-scroll {
    scrollbar-width: thin;
    scrollbar-color: rgba(75, 85, 99, 0.8) rgba(17, 24, 39, 0.5);
  }
</style>

<div class="min-h-screen bg-black text-white flex flex-col relative">
  <!-- Progress Bar -->
  <div class="fixed top-0 left-0 w-full h-1 bg-gray-900 z-50">
    <div class="h-full bg-gradient-to-r from-gray-400 to-white transition-all duration-500 ease-out" style="width: {progress}%"></div>
  </div>

  <!-- Simple Header -->
  <div class="fixed top-4 left-4 z-40">
    <a 
      href="/#section3" 
      class="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
      </svg>
      Back to Credits
    </a>
  </div>

  <!-- Bio Counter -->
  <div class="fixed top-4 right-4 z-40">
    <div class="text-sm text-gray-400">
      {currentIndex + 1} of {totalBios}
    </div>
  </div>

  <!-- Scrollable Content Area -->
  {#if bio}
    {#key currentSlug}
      <div class="flex-1 pt-16 pb-24 overflow-hidden">
        <div class="container mx-auto px-4 h-full">
          <div class="max-w-4xl mx-auto h-full">
            <!-- Bio content card -->
            <div class="bg-gray-900 bg-opacity-30 backdrop-blur-sm rounded-lg p-8 md:p-12 border border-gray-800 flex flex-col max-h-[calc(100vh-12rem)] md:h-[calc(100vh-12rem)]">
              <!-- Header -->
              <div class="text-center mb-8 flex-shrink-0">
                <h1 class="text-3xl md:text-4xl font-bold mb-2">{bio.name}</h1>
                <p class="text-xl text-gray-300 font-light">{bio.role}</p>
              </div>
              
              <hr class="border-gray-700 my-8 flex-shrink-0">
              
              <!-- Scrollable bio text area -->
              <div class="flex-1 overflow-y-auto pr-2 bio-scroll min-h-0 relative">
                <div class="prose prose-invert prose-lg max-w-none">
                  <p class="text-gray-300 leading-relaxed text-lg whitespace-pre-wrap">{@html parseLinks(bio.bio)}</p>
                </div>
                <!-- Fade gradient at bottom -->
                <div class="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-900/30 to-transparent pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    {/key}
    
    <!-- Snapchat-style Navigation -->
    <div class="fixed bottom-0 left-0 right-0 h-24 flex pointer-events-none">
      <!-- Previous Bio / Back to Credits -->
      {#if prevBio}
        <a 
          href="/bio/{prevBio.id}" 
          class="absolute left-0 bottom-0 w-1/2 h-full flex items-center justify-start pl-6 pointer-events-auto"
          aria-label="Previous bio: {prevBio.name}"
        >
          <div class="bg-black/50 backdrop-blur-sm rounded-full p-3 border border-gray-800">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </div>
        </a>
      {:else}
        <a 
          href="/#section3" 
          class="absolute left-0 bottom-0 w-1/2 h-full flex items-center justify-start pl-6 pointer-events-auto"
          aria-label="Back to Credits"
        >
          <div class="bg-black/50 backdrop-blur-sm rounded-full p-3 border border-gray-800">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </div>
        </a>
      {/if}

      <!-- Next Bio / Go to Funders -->
      {#if nextBio}
        <a 
          href="/bio/{nextBio.id}" 
          class="absolute right-0 bottom-0 w-1/2 h-full flex items-center justify-end pr-6 pointer-events-auto"
          aria-label="Next bio: {nextBio.name}"
        >
          <div class="bg-black/50 backdrop-blur-sm rounded-full p-3 border border-gray-800">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </div>
        </a>
      {:else}
        <a 
          href="/#section5" 
          class="absolute right-0 bottom-0 w-1/2 h-full flex items-center justify-end pr-6 pointer-events-auto"
          aria-label="Next to Funders"
        >
          <div class="bg-black/50 backdrop-blur-sm rounded-full p-3 border border-gray-800">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </div>
        </a>
      {/if}
    </div>
  {:else}
    <div class="flex items-center justify-center flex-1">
      <div class="text-center space-y-4 p-8">
        <div class="text-6xl mb-4">🎭</div>
        <h1 class="text-3xl font-bold">Bio Not Found</h1>
        <p class="text-gray-400">The bio you're looking for doesn't exist.</p>
        <a 
          href="/#section3" 
          class="inline-block mt-4 px-6 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
        >
          Back to Credits
        </a>
      </div>
    </div>
  {/if}
</div>