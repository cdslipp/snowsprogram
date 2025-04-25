<script lang="ts">
  import { onMount } from 'svelte';
  import { blur } from 'svelte/transition';
  
  let sections: HTMLElement[];
  let currentSection = 0;
  let isScrolling = false;
  let progress = 0;
  
  onMount(() => {
    sections = Array.from(document.querySelectorAll('.section'));
    
    const handleScroll = () => {
      if (isScrolling) return;
      
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const totalHeight = document.documentElement.scrollHeight - windowHeight;
      
      progress = (scrollPosition / totalHeight) * 100;
      
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
          currentSection = index;
        }
      });
    };
    
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isScrolling) return;
      
      isScrolling = true;
      const direction = e.deltaY > 0 ? 1 : -1;
      const nextSection = Math.max(0, Math.min(sections.length - 1, currentSection + direction));
      
      sections[nextSection].scrollIntoView({ behavior: 'smooth' });
      currentSection = nextSection;
      
      setTimeout(() => {
        isScrolling = false;
      }, 1000);
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
    };
  });
</script>

<div class="min-h-screen bg-black text-white overflow-hidden">
  <!-- Progress Bar -->
  <div class="fixed bottom-0 left-0 w-full h-1 bg-gray-800 z-50">
    <div class="h-full bg-white transition-all duration-300" style="width: {progress}%"></div>
  </div>

  <!-- Cover Section -->
  <section class="section h-screen flex items-center justify-center relative" in:blur={{ duration: 300 }}>
    <div class="relative w-full h-full flex items-center justify-center">
      <img 
        src="/cover.png" 
        alt="Sometimes It Snows In April" 
        class="max-w-full max-h-full object-contain"
      >
    </div>
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
      <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
      </svg>
    </div>
  </section>

  <!-- Synopsis Section -->
  <section class="section min-h-screen flex items-center justify-center relative overflow-hidden" in:blur={{ duration: 300 }}>
    <div class="absolute inset-0 z-0">
      <img src="/cover.png" alt="Background" class="w-full h-full object-cover filter blur-xl opacity-20">
    </div>
    <div class="relative z-10 px-4 max-w-3xl">
      <div class="space-y-4">
        <p class="text-3xl md:text-4xl font-bold text-white">A stag hunter and his prey,</p>
        <p class="text-3xl md:text-4xl font-bold text-white">a young man and his lover,</p>
        <p class="text-3xl md:text-4xl font-bold text-white">an old man and his dog,</p>
        <p class="text-3xl md:text-4xl font-bold text-white">a woman,</p>
        <p class="text-3xl md:text-4xl font-bold text-white">a park bench,</p>
        <p class="text-3xl md:text-4xl font-bold text-white">a lamppost,</p>
        <p class="text-3xl md:text-4xl font-bold text-white">and an umbrella.</p>
      </div>
    </div>
  </section>

  <!-- Credits Section -->
  <section class="section min-h-screen flex items-center" in:blur={{ duration: 300 }}>
    <div class="max-w-3xl mx-auto px-4 py-12 w-full">
      <!-- Land Acknowledgment -->
      <div class="mb-12 bg-gray-900 rounded-lg p-8">
        <p class="text-gray-300 italic font-light">
          We acknowledge that we are on the traditional territory of the Neutral, Anishinaabeg, and Haudenosaunee peoples.
        </p>
      </div>

      <!-- Credits section -->
      <div class="mb-12 text-center">
        <div class="space-y-6">
          <div>
            <p class="text-lg font-light text-gray-300">Created by</p>
            <p class="text-xl font-bold text-white mt-2">Bó Bárdos, Trevor Copp, and Ric Knowles</p>
          </div>
          <div>
            <p class="text-gray-300">
              <span class="font-light">Directed by</span> <span class="font-bold">Ric Knowles</span>
            </p>
          </div>
          <div>
            <p class="text-gray-300">
              <span class="font-light">Performed by</span> <span class="font-bold">Trevor Copp and Bó Bárdos</span>
            </p>
          </div>
          <div>
            <p class="text-gray-300">
              <span class="font-light">Vocal Consultant</span> <span class="font-bold">Fides Krucker</span>
            </p>
          </div>
          <div>
            <p class="text-gray-300">
              <span class="font-light">Lighting Design by</span> <span class="font-bold">Cameron Slipp</span>
            </p>
          </div>
          <div>
            <p class="text-gray-300">
              <span class="font-light">Stage Management</span> <span class="font-bold">Paula Bornacelli</span>
            </p>
          </div>
          <div>
            <p class="text-gray-300">
              <span class="font-light">Community Producer</span> <span class="font-bold">Stephanie Svenson</span>
            </p>
          </div>
        </div>
      </div>

      <!-- Funders -->
     </div>
  </section>

  <!-- Special Thanks Section -->
  <section class="section min-h-screen flex items-center" in:blur={{ duration: 300 }}>
  
    
    <div class="max-w-3xl mx-auto px-4 py-12 w-full">
     <div class="mb-12">
        <h3 class="text-lg font-semibold mb-4">Funded by</h3>
        <div class="grid grid-cols-2 gap-8">
          <div class="flex items-center justify-center">
            <img src="/OAC_Logo_white.png" alt="Ontario Arts Council" class="max-h-16 w-auto">
          </div>
          <div class="flex items-center justify-center">
            <img src="/incite.png" alt="Incite" class="max-h-16 w-auto">
          </div>
        </div>
      </div>
      <!-- Special Thanks -->
      <div class="mb-8 bg-white text-black rounded-lg p-8">
        <h3 class="text-lg font-semibold mb-4">Special Thanks</h3>
        <div class="grid grid-cols-3 gap-8">
          <div class="flex items-center justify-center">
            <img src="/mtspace.svg" alt="MT Space" class="max-h-16 w-auto">
          </div>
          <div class="flex items-center justify-center">
            <img src="/creativecoop.png" alt="Creative Coop" class="max-h-16 w-auto">
          </div>
          <div class="flex items-center justify-center">
            <img src="/registry.jpg" alt="Registry Theatre" class="max-h-16 w-auto">
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="text-center text-gray-800 text-sm font-light bg-white rounded-lg p-8">
        <div class="mb-4">
          <img src="/totteringbiped.avif" alt="Tottering Biped" class="h-8 w-auto mx-auto">
        </div>
        <p>© 2024 Tottering Biped</p>
      </div>
    </div>
  </section>
</div>
<style>
  .section {
    scroll-snap-align: start;
    height: 100vh;
    overflow-y: auto;
  }
  
  html {
    scroll-behavior: smooth;
  }
  
  body {
    overflow: hidden;
  }
</style>

