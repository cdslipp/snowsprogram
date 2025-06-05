# Snow Program - Theatre Digital Program Improvements

## Overview
This is a digital theatre program for "Sometimes It Snows In April" by Tottering Biped Theatre. The app has been refactored to provide better visual cohesion, navigation, and user experience.

## Key Improvements

### 1. Visual Cohesion & Branding
- **Shared Header Component**: Created a reusable header (`/src/lib/components/Header.svelte`) that appears on all non-main pages
  - Features the Tottering Biped logo
  - Includes the show title
  - Provides consistent navigation across pages
  - Responsive mobile menu

### 2. Improved Navigation Structure
- **Route Groups**: Organized routes into logical groups:
  - `(main)` - For the main scrolling program page
  - `(app)` - For bio pages, past productions, and other standard pages with the header
  - `registry` - For the Registry Theatre specific version

- **Smooth Scrolling**: Added utility functions for better scroll behavior
  - Section indicators on the right side (desktop)
  - Progress bar at the bottom
  - Smooth scroll animations between sections

### 3. Enhanced Credits Section
- **Clickable Names**: All names in the credits section now link to their respective bio pages
- **Visual Feedback**: Hover states on links for better interactivity
- **Clear CTAs**: Added helper text indicating names are clickable

### 4. Bio Pages Improvements
- **Consistent Design**: Bio pages now use a card-based layout with:
  - Avatar placeholders
  - Clear typography hierarchy
  - Related links at the bottom
  - Smooth transitions

- **Better Navigation**: 
  - Header provides easy return to main program
  - Links to view all bios or return to credits
  - No redundant back buttons

### 5. Past Productions Page
- **Timeline Design**: Visual timeline showing production history
- **Production Cards**: Rich cards with:
  - Show artwork thumbnails
  - Production details
  - Hover effects
  - Clear CTAs to view details

### 6. Technical Improvements
- **Svelte 5 Runes**: Properly using `$state` and other Svelte 5 features
- **TypeScript**: Strong typing for bio data and components
- **Accessibility**: Added proper ARIA labels and semantic HTML
- **Performance**: Lazy loading sections with intersection observer
- **Mobile-First**: Responsive design that works well on all devices

## File Structure

```
src/
├── lib/
│   ├── components/
│   │   └── Header.svelte          # Shared header component
│   ├── utils/
│   │   └── smoothScroll.ts        # Smooth scrolling utilities
│   └── bios.ts                    # Bio data and types
├── routes/
│   ├── (main)/
│   │   ├── +layout.svelte         # Main page layout (no header)
│   │   └── +page.svelte           # Main scrolling program
│   ├── (app)/
│   │   ├── +layout.svelte         # App layout with header
│   │   ├── bio/
│   │   │   └── [slug]/
│   │   │       └── +page.svelte   # Individual bio pages
│   │   └── past-productions/
│   │       └── +page.svelte       # Past productions timeline
│   └── registry/
│       ├── +layout.svelte         # Registry specific layout
│       └── +page.svelte           # Registry program
```

## Usage

### Adding New Bios
1. Edit `/src/lib/bios.ts`
2. Add a new bio object with id, name, role, and bio text
3. The bio will automatically appear in both the main program and be accessible via `/bio/[id]`

### Linking to Sections
Use the format `/#section[number]` to link to specific sections:
- `/#section1` - Synopsis
- `/#section2` - Land Acknowledgment
- `/#section3` - Credits
- `/#section4` - Bios
- `/#section5` - Special Thanks

### Creating New Productions
1. Create a new route group if needed
2. Follow the pattern in `/src/routes/registry/` for production-specific programs
3. Add to past productions page

## Design Tokens

### Colors
- Background: `black` (#000000)
- Text Primary: `white` (#FFFFFF)
- Text Secondary: `gray-300` (#D1D5DB)
- Text Muted: `gray-400` (#9CA3AF)
- Borders: `gray-800` (#1F2937)
- Hover States: `gray-700` (#374151)

### Typography
- Headings: Bold, various sizes with responsive scaling
- Body: Regular weight, good line height for readability
- Captions: Light weight, smaller size

### Spacing
- Section padding: Responsive (py-8 to py-12)
- Container max-width: 3xl to 4xl depending on content
- Consistent spacing scale throughout

## Future Enhancements
- Add actual headshot images for bio pages
- Implement a CMS for easy content updates
- Add animation to the timeline on past productions
- Create a print-friendly version
- Add social sharing capabilities
- Implement analytics tracking