<script lang="ts">
	import { onMount } from 'svelte';
	import { blur, fade, fly } from 'svelte/transition';
	import { browser } from '$app/environment';
	import { bios } from '$lib/bios.js';
	import { smoothScrollTo, initSmoothScroll } from '$lib/utils/smoothScroll.js';

	let currentSection = $state(0);
	let progress = $state(0);
	let showScrollIndicator = $state(true);

	// Handle scroll arrows click
	function scrollToSection(index: number) {
		if (!browser) return;
		smoothScrollTo(`section${index}`);
	}

	function scrollToNext() {
		if (currentSection < 5) {
			scrollToSection(currentSection + 1);
		}
	}

	onMount(() => {
		if (!browser) return;

		initSmoothScroll();

		// Use Intersection Observer to track current section
		const sections = Array.from(document.querySelectorAll<HTMLElement>('.section'));
		const totalSections = sections.length;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						// Get the section index from its id
						const sectionId = entry.target.id;
						const index = parseInt(sectionId.replace('section', ''));
						if (!isNaN(index)) {
							currentSection = index;
							progress = (index / (totalSections - 1)) * 100;

							// Hide scroll indicator on last section
							showScrollIndicator = index < totalSections - 1;
						}
					}
				});
			},
			{ threshold: 0.5 }
		);

		sections.forEach((section) => {
			observer.observe(section);
		});

		// Update progress bar on scroll
		const handleScroll = () => {
			const scrollContainer = document.querySelector('.scroll-container');
			if (!scrollContainer) return;

			const scrollPosition = scrollContainer.scrollTop;
			const maxScrollHeight = scrollContainer.scrollHeight - scrollContainer.clientHeight;
			if (maxScrollHeight > 0) {
				progress = (scrollPosition / maxScrollHeight) * 100;
			}
		};

		const scrollContainer = document.querySelector('.scroll-container');
		scrollContainer?.addEventListener('scroll', handleScroll);

		return () => {
			sections.forEach((section) => {
				observer.unobserve(section);
			});
			scrollContainer?.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<div class="scroll-container">
	<!-- Progress Bar -->
	<div class="fixed bottom-0 left-0 z-50 h-1 w-full bg-gray-900">
		<div
			class="h-full bg-gradient-to-r from-gray-400 to-white transition-all duration-300 ease-out"
			style="width: {progress}%"
		></div>
	</div>

	<!-- Section indicators -->
	<div class="fixed top-1/2 right-4 z-40 hidden -translate-y-1/2 transform flex-col gap-3 lg:flex">
		{#each Array(7) as _, i}
			<button
				onclick={() => scrollToSection(i)}
				class="h-2 w-2 rounded-full transition-all duration-300 {currentSection === i
					? 'w-8 bg-white'
					: 'bg-gray-600 hover:bg-gray-400'}"
				aria-label="Go to section {i + 1}"
			/>
		{/each}
	</div>

	<!-- Cover Section with Show Details -->
	<section id="section0" class="section snap-section relative flex items-center justify-center">
		<div class="relative flex h-full w-full items-center justify-center">
			<img
				src="/tc-coverjune.jpg"
				alt="Sometimes It Snows In April"
				class="max-h-full max-w-full object-contain"
				in:fade={{ duration: 1000 }}
			/>
		</div>
		{#if showScrollIndicator}
			<button
				class="group absolute bottom-4 left-1/2 -translate-x-1/2 transform animate-bounce cursor-pointer p-2 md:bottom-8 md:p-0"
				onclick={() => scrollToNext()}
				aria-label="Scroll to next section"
			>
				<svg
					class="h-10 w-10 text-white opacity-70 transition-opacity group-hover:opacity-100 md:h-8 md:w-8"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M19 14l-7 7m0 0l-7-7m7 7V3"
					></path>
				</svg>
			</button>
		{/if}
	</section>

	<!-- Synopsis Section -->
	<section
		id="section1"
		class="section snap-section relative flex items-center justify-center overflow-hidden"
	>
		<div class="absolute inset-0 z-0">
			<img
				src="/tc-coverjune.jpg"
				alt="Background"
				class="h-full w-full object-cover opacity-20 blur-xl filter"
			/>
		</div>
		<div class="relative z-10 max-w-3xl px-4">
			{#if currentSection === 1}
				<div class="space-y-4">
					{#each ['A stag hunter and his prey', 'a young man and his lover', 'an old man and his dog', 'a woman', 'a park bench', 'a lamppost', 'and an umbrella'] as line, i}
						<p
							class="text-3xl font-bold text-white md:text-4xl"
							in:fly={{ y: 50, duration: 500, delay: i * 100 }}
						>
							{line}
						</p>
					{/each}
				</div>
			{/if}
		</div>
		{#if showScrollIndicator}
			<button
				class="group absolute bottom-4 left-1/2 -translate-x-1/2 transform animate-bounce cursor-pointer p-2 md:bottom-8 md:p-0"
				onclick={() => scrollToNext()}
				aria-label="Scroll to next section"
			>
				<svg
					class="h-10 w-10 text-white opacity-70 transition-opacity group-hover:opacity-100 md:h-8 md:w-8"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M19 14l-7 7m0 0l-7-7m7 7V3"
					></path>
				</svg>
			</button>
		{/if}
	</section>

	<!-- Land Acknowledgment Section - Toronto -->
	<section id="section2" class="section snap-section relative flex items-center justify-center">
		<div class="absolute inset-0 z-0">
			<img
				src="/tc-coverjune.jpg"
				alt="Background"
				class="h-full w-full object-cover opacity-20 blur-xl filter"
			/>
		</div>
		<div class="relative z-10 max-w-3xl px-4">
			{#if currentSection === 2}
				<div class="mx-auto max-w-4xl p-8 text-center" in:fade={{ duration: 800 }}>
					<h2 class="mb-6 text-2xl font-light text-gray-200 md:text-3xl">Land Acknowledgment</h2>
					<p class="text-lg leading-relaxed font-light text-gray-300 italic">
						With gratitude and appreciation, we acknowledge that we live, learn, and work on is the
						traditional territory and gathering place of many nations including the Mississaugas of
						the Credit, the Anishnabeg, the Chippewa, the Haudenosaunee and the Wendat peoples and
						is now home to many diverse First Nations, Inuit and Métis peoples. We also acknowledge
						that Toronto is covered by Treaty 13 with the Mississaugas of the Credit.
					</p>
				</div>
			{/if}
		</div>
		<button
			class="group absolute bottom-4 left-1/2 -translate-x-1/2 transform animate-bounce cursor-pointer p-2 md:bottom-8 md:p-0"
			onclick={() => scrollToNext()}
			aria-label="Scroll to next section"
		>
			<svg
				class="h-10 w-10 text-white opacity-70 transition-opacity group-hover:opacity-100 md:h-8 md:w-8"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M19 14l-7 7m0 0l-7-7m7 7V3"
				></path>
			</svg>
		</button>
	</section>

	<!-- Credits Section -->
	<section id="section3" class="section snap-section flex items-center">
		<div class="mx-auto w-full max-w-3xl px-4 py-12">
			{#if currentSection === 3}
				<div class="mb-12 text-center" in:fly={{ y: 50, duration: 500 }}>
					<div class="space-y-6">
						<div>
							<p class="text-lg font-light text-gray-300">Created by</p>
							<p class="mt-2 text-xl font-bold text-white">
								<a href="/bio/bo" class="transition-colors hover:text-gray-300">Bó Bárdos</a>,
								<a href="/bio/trevor" class="transition-colors hover:text-gray-300">Trevor Copp</a>,
								and
								<a href="/bio/ric" class="transition-colors hover:text-gray-300">Ric Knowles</a>
							</p>
						</div>
						<div>
							<p class="text-gray-300">
								<span class="font-light">Directed by</span>
								<a href="/bio/ric" class="font-bold transition-colors hover:text-white"
									>Ric Knowles</a
								>
							</p>
						</div>
						<div>
							<p class="text-gray-300">
								<span class="font-light">Performed by</span>
								<a href="/bio/bo" class="font-bold transition-colors hover:text-white">Bó Bárdos</a>
								and
								<a href="/bio/trevor" class="font-bold transition-colors hover:text-white"
									>Trevor Copp</a
								>
							</p>
						</div>
						<div>
							<p class="text-gray-300">
								<span class="font-light">Vocal Consultant</span>
								<a href="/bio/fides" class="font-bold transition-colors hover:text-white"
									>Fides Krucker</a
								>
							</p>
						</div>
						<div>
							<p class="text-gray-300">
								<span class="font-light">Lighting Designer</span>
								<a href="/bio/cameron" class="font-bold transition-colors hover:text-white"
									>Cameron Slipp</a
								>
							</p>
						</div>
						<div>
							<p class="text-gray-300">
								<span class="font-light">Stage Manager</span>
								<a href="/bio/paula" class="font-bold transition-colors hover:text-white"
									>Paula Bornacelli</a
								>
							</p>
						</div>
					</div>
					<hr class="mx-auto my-8 w-24 border-gray-600" />
					<div class="text-gray-300 italic">
						<p>Please join us after the show in the bar.</p>
					</div>

					<!-- View all link -->
					<div class="mt-8 text-center">
						<!-- Past Productions Button -->
						<div class="mt-8">
							<!-- View Past Productions button moved to footer section -->
						</div>
					</div>
				</div>
			{/if}
		</div>
		{#if showScrollIndicator}
			<button
				class="group absolute bottom-4 left-1/2 -translate-x-1/2 transform animate-bounce cursor-pointer p-2 md:bottom-8 md:p-0"
				onclick={() => scrollToNext()}
				aria-label="Scroll to next section"
			>
				<svg
					class="h-10 w-10 text-white opacity-70 transition-opacity group-hover:opacity-100 md:h-8 md:w-8"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M19 14l-7 7m0 0l-7-7m7 7V3"
					></path>
				</svg>
			</button>
		{/if}
	</section>

	<!-- Bios Section -->
	<section id="section4" class="section snap-section relative flex items-center overflow-hidden">
		<div class="absolute inset-0 z-0">
			<img
				src="/tc-coverjune.jpg"
				alt="Background"
				class="h-full w-full object-cover opacity-10 blur-xl filter"
			/>
		</div>
		<div class="relative z-10 mx-auto w-full max-w-4xl px-4 py-8">
			{#if currentSection === 4}
				<div class="space-y-6" in:fly={{ y: 50, duration: 500 }}>
					<h3 class="mb-8 text-center text-3xl font-semibold md:text-4xl">Cast & Crew</h3>

					<div class="grid grid-cols-1 gap-4">
						{#each bios as bio}
							<a
								href="/bio/{bio.id}"
								class="bg-opacity-50 hover:bg-opacity-70 block rounded-lg border border-gray-800 bg-gray-900 p-4 transition-all duration-300 hover:border-gray-600"
							>
								<div class="space-y-2">
									<div class="flex items-baseline gap-2">
										<h4 class="text-lg font-bold text-white">{bio.name}</h4>
										<p class="text-sm font-light text-gray-300">{bio.role}</p>
									</div>
									<p class="line-clamp-2 text-sm text-gray-400">
										{bio.bio.substring(0, 120)}...
									</p>
									<div class="flex items-center text-xs text-gray-300">
										<span>Read more</span>
										<svg class="ml-1 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M9 5l7 7-7 7"
											></path>
										</svg>
									</div>
								</div>
							</a>
						{/each}
					</div>
				</div>
			{/if}
		</div>
		<button
			class="group absolute bottom-4 left-1/2 -translate-x-1/2 transform animate-bounce cursor-pointer p-2 md:bottom-8 md:p-0"
			onclick={() => scrollToNext()}
			aria-label="Scroll to next section"
		>
			<svg
				class="h-10 w-10 text-white opacity-70 transition-opacity group-hover:opacity-100 md:h-8 md:w-8"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M19 14l-7 7m0 0l-7-7m7 7V3"
				></path>
			</svg>
		</button>
	</section>

	<!-- Funders Section -->
	<section id="section5" class="section snap-section relative flex items-center justify-center">
		<div class="absolute inset-0 z-0">
			<img
				src="/tc-coverjune.jpg"
				alt="Background"
				class="h-full w-full object-cover opacity-20 blur-xl filter"
			/>
		</div>
		<div class="relative z-10 max-w-3xl px-4">
			{#if currentSection === 5}
				<div class="text-center" in:fly={{ y: 50, duration: 500 }}>
					<h3 class="mb-8 text-2xl font-semibold md:text-3xl">Funded by</h3>
					<div class="flex flex-col items-center space-y-8">
						<div class="flex items-center justify-center">
							<a
								href="https://www.arts.on.ca"
								target="_blank"
								rel="noopener"
								class="block transition-opacity hover:opacity-80"
							>
								<img src="/OAC_Logo_white.png" alt="Ontario Arts Council" class="max-h-24 w-auto" />
							</a>
						</div>
						<div class="flex items-center justify-center">
							<a
								href="https://incitefoundation.ca"
								target="_blank"
								rel="noopener"
								class="block transition-opacity hover:opacity-80"
							>
								<img src="/incite.png" alt="Incite" class="max-h-24 w-auto" />
							</a>
						</div>
					</div>
				</div>
			{/if}
		</div>
		<button
			class="group absolute bottom-4 left-1/2 -translate-x-1/2 transform animate-bounce cursor-pointer p-2 md:bottom-8 md:p-0"
			onclick={() => scrollToNext()}
			aria-label="Scroll to next section"
		>
			<svg
				class="h-10 w-10 text-white opacity-70 transition-opacity group-hover:opacity-100 md:h-8 md:w-8"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M19 14l-7 7m0 0l-7-7m7 7V3"
				></path>
			</svg>
		</button>
	</section>

	<!-- Special Thanks Section -->
	<section id="section6" class="section snap-section flex flex-col justify-between">
		<div class="flex flex-grow items-center">
			<div class="mx-auto w-full max-w-3xl px-4 py-8">
				{#if currentSection === 6}
					<div class="mb-12 text-center" in:fly={{ y: 50, duration: 500 }}>
						<!-- Special Thanks heading removed to avoid duplication -->
					</div>
				{/if}
			</div>
		</div>

		<!-- Footer Section -->
		<div
			class="mt-auto w-full bg-white p-8 text-black"
			in:fly={{ y: 50, duration: 500, delay: 200 }}
		>
			<div class="mx-auto max-w-3xl">
				<h3 class="mb-6 text-lg font-semibold">Special Thanks</h3>
				<div class="mb-10 grid grid-cols-2 gap-8 md:grid-cols-4">
					<div class="flex items-center justify-center">
						<a href="https://theatrecentre.org" target="_blank" rel="noopener" class="block">
							<div class="rounded-full bg-red-600 px-6 py-3 transition-colors hover:bg-red-700">
								<img
									src="/TC_final_logo_white_primary-retina.png"
									alt="Theatre Centre"
									class="max-h-12 w-auto"
								/>
							</div>
						</a>
					</div>
					<div class="flex items-center justify-center">
						<a
							href="https://mtspace.ca"
							target="_blank"
							rel="noopener"
							class="block"
						>
							<img src="/mtspace.svg" alt="MT Space" class="h-16" />
						</a>
					</div>
					<div class="flex items-center justify-center">
						<a
							href="https://creativecoop.ca"
							target="_blank"
							rel="noopener"
							class="block"
						>
							<img src="/creativecoop.png" alt="Creative Coop" class="h-16" />
						</a>
					</div>
					<div class="flex items-center justify-center">
						<a
							href="https://registrytheatre.com"
							target="_blank"
							rel="noopener"
							class="block"
						>
							<img src="/registry.jpg" alt="Registry Theatre" class="h-16" />
						</a>
					</div>
				</div>

				<!-- View Past Productions Button -->
				<div class="my-8 flex justify-center">
					<a
						href="/past-productions"
						class="inline-block rounded-lg border border-gray-600 bg-gray-800 px-8 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:transform hover:border-gray-500 hover:bg-gray-700"
					>
						View Past Productions
					</a>
				</div>

				<!-- Navigation Links -->
				<div class="mb-8 flex justify-center">
					<div class="flex flex-wrap justify-center gap-2 text-sm md:gap-4 md:text-base">
						<button class="transition-colors hover:underline" onclick={() => scrollToSection(1)}
							>Synopsis</button
						>
						<span class="text-gray-400">|</span>
						<button class="transition-colors hover:underline" onclick={() => scrollToSection(2)}
							>Land Acknowledgement</button
						>
						<span class="text-gray-400">|</span>
						<button class="transition-colors hover:underline" onclick={() => scrollToSection(3)}
							>Credits</button
						>
						<span class="text-gray-400">|</span>
						<button class="transition-colors hover:underline" onclick={() => scrollToSection(4)}
							>Bios</button
						>
						<span class="text-gray-400">|</span>
						<button class="transition-colors hover:underline" onclick={() => scrollToSection(5)}
							>Funders</button
						>
					</div>
				</div>

				<!-- Separator -->
				<hr class="my-8 border-gray-300" />

				<div class="text-center">
					<div class="mb-4">
						<img src="/totteringbiped.avif" alt="Tottering Biped" class="mx-auto h-10 w-auto" />
					</div>
					<div class="space-y-2">
						<p>© 2024 Tottering Biped</p>
						<p class="text-xs text-gray-500">
							Program created by <a
								href="https://stagepage.app"
								target="_blank"
								rel="noopener"
								class="transition-colors hover:text-gray-400">Stage Page</a
							>
						</p>
					</div>
				</div>
			</div>
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
		overscroll-behavior: none;
		-webkit-overflow-scrolling: touch;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		touch-action: pan-y pinch-zoom;
		-webkit-overflow-scrolling: touch;
	}

	/* Prevent scrolling beyond bounds on iOS */
	@supports (-webkit-touch-callout: none) {
		.scroll-container {
			height: -webkit-fill-available;
		}

		:global(body) {
			position: fixed;
			width: 100%;
			height: 100%;
			overflow: hidden;
		}
	}

	/* Individual snap sections */
	.snap-section {
		scroll-snap-align: start;
		scroll-snap-stop: always;
		height: 100vh;
		position: relative;
	}

	@media (max-width: 768px) {
		.snap-section {
			height: 100dvh;
		}
	}

	/* View transitions */
	@keyframes fade-in {
		from {
			opacity: 0;
		}
	}

	@keyframes fade-out {
		to {
			opacity: 0;
		}
	}

	::view-transition-old(root) {
		animation: 300ms cubic-bezier(0.4, 0, 1, 1) both fade-out;
	}

	::view-transition-new(root) {
		animation: 300ms cubic-bezier(0, 0, 0.2, 1) both fade-in;
	}

	/* Utility for truncating text */
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	/* Smooth animations */
	@media (prefers-reduced-motion: no-preference) {
		.animate-bounce {
			animation: bounce 2s infinite;
		}
	}

	@keyframes bounce {
		0%,
		100% {
			transform: translateY(-25%) translateX(-50%);
			animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
		}
		50% {
			transform: translateY(0) translateX(-50%);
			animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
		}
	}
</style>
