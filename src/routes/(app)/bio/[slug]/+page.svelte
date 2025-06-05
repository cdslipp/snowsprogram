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
  

</script>

<div class="min-h-screen bg-black text-white flex flex-col">
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

  {#if bio}
    {#key currentSlug}
      <div class="container mx-auto px-4 pt-16 pb-32 flex-1">
        <div class="max-w-4xl mx-auto">
          <!-- Bio content card -->
          <div class="bg-gray-900 bg-opacity-30 backdrop-blur-sm rounded-lg p-8 md:p-12 border border-gray-800">
          <!-- Header -->
          <div class="text-center mb-8">
            <h1 class="text-3xl md:text-4xl font-bold mb-2">{bio.name}</h1>
            <p class="text-xl text-gray-300 font-light">{bio.role}</p>
          </div>
          
          <hr class="border-gray-700 my-8">
          
          <div class="prose prose-invert prose-lg max-w-none">
            <p class="text-gray-300 leading-relaxed text-lg">{bio.bio}</p>
          </div>
        </div>
      </div>
    </div>
    {/key}
    
    <!-- Fixed Navigation -->
    <div class="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black to-transparent">
      <div class="container mx-auto px-4 py-6">
        <div class="max-w-4xl mx-auto flex items-center justify-between">
          <!-- Previous Bio / Back to Credits -->
          <div class="w-1/3">
            {#if prevBio}
              <a 
                href="/bio/{prevBio.id}" 
                class="group flex items-center gap-3 p-4 rounded-lg bg-gray-900 bg-opacity-80 backdrop-blur-sm border border-gray-800 hover:border-gray-600 transition-all duration-300"
              >
                <svg class="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                <div class="text-left hidden sm:block">
                  <div class="text-xs text-gray-500 uppercase tracking-wide">Previous</div>
                  <div class="text-white font-semibold group-hover:text-gray-200 transition-colors">{prevBio.name}</div>
                  <div class="text-xs text-gray-400">{prevBio.role}</div>
                </div>
              </a>
            {:else}
              <a 
                href="/#section3" 
                class="group flex items-center gap-3 p-4 rounded-lg bg-gray-900 bg-opacity-80 backdrop-blur-sm border border-gray-800 hover:border-gray-600 transition-all duration-300"
              >
                <svg class="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                <div class="text-left hidden sm:block">
                  <div class="text-xs text-gray-500 uppercase tracking-wide">Back to</div>
                  <div class="text-white font-semibold group-hover:text-gray-200 transition-colors">Credits</div>
                </div>
              </a>
            {/if}
          </div>

          <!-- Center - empty space -->
          <div class="flex-1"></div>

          <!-- Next Bio / Go to Funders -->
          <div class="w-1/3 flex justify-end">
            {#if nextBio}
              <a 
                href="/bio/{nextBio.id}" 
                class="group flex items-center gap-3 p-4 rounded-lg bg-gray-900 bg-opacity-80 backdrop-blur-sm border border-gray-800 hover:border-gray-600 transition-all duration-300"
              >
                <div class="text-right hidden sm:block">
                  <div class="text-xs text-gray-500 uppercase tracking-wide">Next</div>
                  <div class="text-white font-semibold group-hover:text-gray-200 transition-colors">{nextBio.name}</div>
                  <div class="text-xs text-gray-400">{nextBio.role}</div>
                </div>
                <svg class="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </a>
            {:else}
              <a 
                href="/#section5" 
                class="group flex items-center gap-3 p-4 rounded-lg bg-gray-900 bg-opacity-80 backdrop-blur-sm border border-gray-800 hover:border-gray-600 transition-all duration-300"
              >
                <div class="text-right hidden sm:block">
                  <div class="text-xs text-gray-500 uppercase tracking-wide">Next to</div>
                  <div class="text-white font-semibold group-hover:text-gray-200 transition-colors">Funders</div>
                </div>
                <svg class="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </a>
            {/if}
          </div>
        </div>
      </div>
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