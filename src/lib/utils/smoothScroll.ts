import { browser } from '$app/environment';

export function smoothScrollTo(elementId: string) {
  if (!browser) return;
  
  const element = document.getElementById(elementId);
  if (!element) return;
  
  element.scrollIntoView({ 
    behavior: 'smooth',
    block: 'start'
  });
}

export function handleAnchorClick(event: MouseEvent, href: string) {
  // Check if it's an internal anchor link
  if (href.startsWith('#')) {
    event.preventDefault();
    const elementId = href.substring(1);
    smoothScrollTo(elementId);
    
    // Update URL without triggering navigation
    if (browser) {
      history.pushState(null, '', href);
    }
  } else if (href.includes('/#')) {
    // Handle links from other pages to anchors
    event.preventDefault();
    const [path, hash] = href.split('#');
    
    if (path === '/' && browser) {
      // We're already on the home page, just scroll
      smoothScrollTo(hash);
      history.pushState(null, '', `#${hash}`);
    } else {
      // Navigate to home page with hash
      window.location.href = href;
    }
  }
}

export function initSmoothScroll() {
  if (!browser) return;
  
  // Handle initial load with hash
  const hash = window.location.hash;
  if (hash) {
    // Small delay to ensure DOM is ready
    setTimeout(() => {
      const elementId = hash.substring(1);
      smoothScrollTo(elementId);
    }, 100);
  }
  
  // Handle browser back/forward with hash changes
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash;
    if (hash) {
      const elementId = hash.substring(1);
      smoothScrollTo(elementId);
    }
  });
}