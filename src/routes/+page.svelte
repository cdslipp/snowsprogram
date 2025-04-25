<script lang="ts">
  import { onMount } from 'svelte';
  import { blur, fade, fly } from 'svelte/transition';
  import { browser } from '$app/environment';
  
  let currentSection = $state(0);
  let progress = $state(0);
  
  // Handle scroll arrows click
  function scrollToSection(index: number) {
    if (!browser) return;
    document.getElementById(`section${index}`)?.scrollIntoView({ behavior: 'smooth' });
  }
  
  function scrollToNext() {
    scrollToSection(currentSection + 1);
  }
  
  onMount(() => {
    if (!browser) return;
    
    // Use Intersection Observer to track current section
    const sections = Array.from(document.querySelectorAll<HTMLElement>('.section'));
    const totalSections = sections.length;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Get the section index from its id
          const sectionId = entry.target.id;
          const index = parseInt(sectionId.replace('section', ''));
          if (!isNaN(index)) {
            currentSection = index;
            progress = (index / (totalSections - 1)) * 100;
          }
        }
      });
    }, { threshold: 0.5 });
    
    sections.forEach(section => {
      observer.observe(section);
    });
    
    // Update progress bar on scroll
    document.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY;
      const maxScrollHeight = document.body.scrollHeight - window.innerHeight;
      if (maxScrollHeight > 0) {
        progress = (scrollPosition / maxScrollHeight) * 100;
      }
    });
    
    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  });
</script>

<div class="scroll-container">
  <!-- Progress Bar -->
  <div class="fixed bottom-0 left-0 w-full h-1 bg-gray-800 z-50">
    <div class="h-full bg-white transition-all duration-300" style="width: {progress}%"></div>
  </div>

  <!-- Cover Section -->
  <section id="section0" class="section snap-section flex items-center justify-center relative">
    <div class="relative w-full h-full flex items-center justify-center">
      <img 
        src="/cover.png" 
        alt="Sometimes It Snows In April" 
        class="max-w-full max-h-full object-contain"
      >
    </div>
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer" onclick={() => scrollToNext()}>
      <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
      </svg>
    </div>
  </section>

  <!-- Synopsis Section -->
  <section id="section1" class="section snap-section flex items-center justify-center relative overflow-hidden">
    <div class="absolute inset-0 z-0">
      <img src="/cover.png" alt="Background" class="w-full h-full object-cover filter blur-xl opacity-20">
    </div>
    <div class="relative z-10 px-4 max-w-3xl">
      {#if currentSection === 1}
        <div class="space-y-4" in:fly={{ y: 50, duration: 500 }}>
          <p class="text-3xl md:text-4xl font-bold text-white">A stag hunter and his prey,</p>
          <p class="text-3xl md:text-4xl font-bold text-white">a young man and his lover,</p>
          <p class="text-3xl md:text-4xl font-bold text-white">an old man and his dog,</p>
          <p class="text-3xl md:text-4xl font-bold text-white">a woman,</p>
          <p class="text-3xl md:text-4xl font-bold text-white">a park bench,</p>
          <p class="text-3xl md:text-4xl font-bold text-white">a lamppost,</p>
          <p class="text-3xl md:text-4xl font-bold text-white">and an umbrella.</p>
        </div>
      {/if}
    </div>
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer" onclick={() => scrollToNext()}>
      <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
      </svg>
    </div>
  </section>

  <!-- Land Acknowledgment Section -->
  <section id="section2" class="section snap-section flex items-center justify-center relative">
    <div class="absolute inset-0 z-0">
      <img src="/cover.png" alt="Background" class="w-full h-full object-cover filter blur-xl opacity-20">
    </div>
    <div class="relative z-10 px-4 max-w-3xl">
      {#if currentSection === 2}
        <div class="bg-gray-900 rounded-lg p-8" in:fly={{ y: 50, duration: 500 }}>
          <p class="text-gray-300 italic font-light">
            With gratitude and appreciation, we acknowledge that we live, learn, and work within the boundaries of what is known colonially as the Haldimand Tract, which includes six miles on each side of the Grand River. This is the traditional territory of the Chonnonton, Anishinaabeg (Ojibway, Mississauga, Chippewa, and Algonquin), and Haudenosaunee Confederacy (Six Nations including the Mohawk, Cayuga, Onondaga, Seneca, Oneida, and Tuscarora Nations).
          </p>
          <p class="text-gray-300 italic font-light mt-4">
            We acknowledge our responsibilities to the Dish with One Spoon covenant and offer respect to Anishinaabe, Haudenosaunee, and Métis neighbours as well as to the many First Nations, Métis, and Inuit peoples for whom today this gathering place is home.
          </p>
        </div>
      {/if}
    </div>
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer" onclick={() => scrollToNext()}>
      <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
      </svg>
    </div>
  </section>

  <!-- Credits Section -->
  <section id="section3" class="section snap-section flex items-center">
    <div class="max-w-3xl mx-auto px-4 py-12 w-full">
      {#if currentSection === 3}
        <!-- Credits section -->
        <div class="mb-12 text-center" in:fly={{ y: 50, duration: 500 }}>
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
      {/if}
    </div>
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer" onclick={() => scrollToNext()}>
      <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
      </svg>
    </div>
  </section>

  <!-- Special Thanks Section -->
  <section id="section4" class="section snap-section flex items-center">
    <div class="max-w-3xl mx-auto px-4 py-12 w-full">
      {#if currentSection === 4}
        <div class="mb-12" in:fly={{ y: 50, duration: 500 }}>
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
        <div class="mb-8 bg-white text-black rounded-lg p-8" in:fly={{ y: 50, duration: 500, delay: 200 }}>
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
        <div class="text-center text-gray-800 text-sm font-light bg-white rounded-lg p-8" in:fly={{ y: 50, duration: 500, delay: 400 }}>
          <div class="mb-4">
            <img src="/totteringbiped.avif" alt="Tottering Biped" class="h-8 w-auto mx-auto">
          </div>
          <p>© 2024 Tottering Biped</p>
        </div>
      {/if}
    </div>
  </section>
</div>

<style>
  /* Scroll snapping container */
  .scroll-container {
    scroll-snap-type: y mandatory;
    overflow-y: scroll;
    height: 100vh;
    width: 100%;
    background-color: black;
    color: white;
  }
  
  /* Individual snap sections */
  .snap-section {
    scroll-snap-align: start;
    scroll-snap-stop: always;
    height: 100vh;
  }
  
  @media (max-width: 768px) {
    .snap-section {
      height: 100dvh;
    }
  }
  
  /* View transitions */
  @keyframes fade-in {
    from { opacity: 0; }
  }
  
  @keyframes fade-out {
    to { opacity: 0; }
  }
  
  ::view-transition-old(root) {
    animation: 300ms cubic-bezier(0.4, 0, 1, 1) both fade-out;
  }
  
  ::view-transition-new(root) {
    animation: 300ms cubic-bezier(0, 0, 0.2, 1) both fade-in;
  }
</style>

