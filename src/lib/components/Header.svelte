<script lang="ts">
  import { page } from '$app/stores';
  
  export let showBackButton = true;
  export let backHref = '/';
  export let backText = 'Back to Program';
</script>

<header class="fixed top-0 left-0 right-0 z-40 bg-black bg-opacity-90 backdrop-blur-sm border-b border-gray-800">
  <div class="container mx-auto px-4">
    <div class="flex items-center justify-between h-16">
      <!-- Logo/Title -->
      <div class="flex items-center space-x-4">
        {#if showBackButton && $page.url.pathname !== '/'}
          <a 
            href={backHref}
            class="text-gray-400 hover:text-white transition-colors duration-300 flex items-center space-x-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            <span class="hidden sm:inline">{backText}</span>
          </a>
          <div class="w-px h-6 bg-gray-700"></div>
        {/if}
        
        <a href="/" class="flex items-center space-x-3 group">
          <img 
            src="/totteringbiped.avif" 
            alt="Tottering Biped" 
            class="h-8 w-auto opacity-80 group-hover:opacity-100 transition-opacity"
          >
          <div class="hidden sm:block">
            <h1 class="text-sm font-light text-gray-300 group-hover:text-white transition-colors">
              Sometimes It Snows In April
            </h1>
          </div>
        </a>
      </div>
      
      <!-- Navigation -->
      <nav class="hidden md:flex items-center space-x-6">
        <a 
          href="/#section1" 
          class="text-sm text-gray-400 hover:text-white transition-colors"
        >
          Synopsis
        </a>
        <a 
          href="/#section3" 
          class="text-sm text-gray-400 hover:text-white transition-colors"
        >
          Credits
        </a>
        <a 
          href="/#section4" 
          class="text-sm text-gray-400 hover:text-white transition-colors"
        >
          Bios
        </a>
        <a 
          href="/past-productions" 
          class="text-sm text-gray-400 hover:text-white transition-colors"
        >
          Past Productions
        </a>
      </nav>
      
      <!-- Mobile menu button -->
      <button 
        class="md:hidden text-gray-400 hover:text-white"
        aria-label="Toggle mobile menu"
        onclick={() => document.getElementById('mobile-menu')?.classList.toggle('hidden')}
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
    </div>
    
    <!-- Mobile menu -->
    <div id="mobile-menu" class="hidden md:hidden pb-4">
      <nav class="flex flex-col space-y-2">
        <a 
          href="/#section1" 
          class="text-sm text-gray-400 hover:text-white transition-colors py-2"
        >
          Synopsis
        </a>
        <a 
          href="/#section3" 
          class="text-sm text-gray-400 hover:text-white transition-colors py-2"
        >
          Credits
        </a>
        <a 
          href="/#section4" 
          class="text-sm text-gray-400 hover:text-white transition-colors py-2"
        >
          Bios
        </a>
        <a 
          href="/past-productions" 
          class="text-sm text-gray-400 hover:text-white transition-colors py-2"
        >
          Past Productions
        </a>
      </nav>
    </div>
  </div>
</header>

<style>
  header {
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
  }
</style>