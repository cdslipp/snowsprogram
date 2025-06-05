<script lang="ts">
  import { fade, fly } from 'svelte/transition';
</script>

<div class="min-h-screen">
  <!-- Simple Header -->
  <div class="fixed top-4 left-4 z-40">
    <a 
      href="/#section3" 
      class="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
      </svg>
      Back to Program
    </a>
  </div>

  <div class="container mx-auto px-4 py-16" in:fade={{ duration: 500 }}>
    <div class="max-w-4xl mx-auto">
      <!-- Hero Section -->
      <div class="text-center mb-16" in:fly={{ y: 20, duration: 500 }}>
        <h1 class="text-4xl md:text-5xl font-bold mb-4">Past Productions</h1>
        <p class="text-gray-400 text-lg">Explore our theatrical journey</p>
      </div>

      <!-- Productions Grid -->
      <div class="space-y-8">
        
        <!-- Productions Timeline -->
        <div class="relative">
          <!-- Timeline line -->
          <div class="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-800"></div>
          
          <!-- Registry Production Card -->
          <div class="relative flex items-center" in:fly={{ x: -20, duration: 500, delay: 200 }}>
            <!-- Timeline dot -->
            <div class="absolute left-8 w-4 h-4 bg-white rounded-full transform -translate-x-1/2 z-10"></div>
            
            <!-- Card -->
            <div class="ml-20 w-full">
              <a 
                href="/registry" 
                class="block group"
              >
                <div class="bg-gray-900 bg-opacity-30 backdrop-blur-sm rounded-lg p-6 border border-gray-800 hover:border-gray-600 transition-all duration-300 hover:transform hover:scale-[1.02]">
                  <div class="flex items-start justify-between">
                    <div class="space-y-2">
                      <h2 class="text-2xl font-bold text-white group-hover:text-gray-200 transition-colors">
                        Sometimes It Snows in April
                      </h2>
                      <p class="text-gray-400">Registry Theatre</p>
                      <p class="text-sm text-gray-500">April 2025</p>
                    </div>
                    <div class="flex-shrink-0 ml-4">
                      <img 
                        src="/registrycover.png" 
                        alt="Sometimes It Snows in April" 
                        class="w-24 h-24 object-cover rounded-lg opacity-70 group-hover:opacity-100 transition-opacity"
                      >
                    </div>
                  </div>
                  <div class="mt-4 flex items-center text-gray-400 text-sm group-hover:text-white transition-colors">
                    <span>View Details</span>
                    <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </div>
                </div>
              </a>
            </div>
          </div>
          
          <!-- Add more productions placeholder -->
          <div class="relative flex items-center mt-12" in:fly={{ x: -20, duration: 500, delay: 400 }}>
            <!-- Timeline dot -->
            <div class="absolute left-8 w-4 h-4 bg-gray-600 rounded-full transform -translate-x-1/2 z-10"></div>
            
            <!-- Placeholder -->
            <div class="ml-20 w-full">
              <div class="bg-gray-900 bg-opacity-20 rounded-lg p-6 border border-gray-800 border-dashed">
                <p class="text-gray-500 text-center italic">More productions coming soon...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div> 