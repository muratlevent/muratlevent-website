# Murat Levent - Personal Website

A clean, modern, and responsive personal website built to showcase my professional journey, projects, and skills. This website serves as a digital business card and a portfolio for my work.

## Tech Stack

- **Framework**: [Astro](https://astro.build/) v6
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v4
- **Font**: JetBrains Mono (self-hosted via @fontsource)
- **Theme**: Terminal-inspired dark/light mode

## Features

- 🖥️ **Terminal-themed UI:** Authentic "hacker" experience with dynamic console outputs and system logs.
- ⌨️ **Typewriter Effects:** Commands like `npx murat-cli` and `cat contact.yml` type out and simulate realistic shell executions with loading spinners and line-by-line dumps.
- 🌗 **Dark/Light Mode:** Toggle with system preference support.
- ♿ **Accessible:** Full keyboard navigation (arrow keys for tabs) and ARIA attributes.
- 📱 **Responsive:** Mobile-first approach.

## Component & Styling Guidelines

To maintain the precise, terminal-inspired aesthetic, follow these strict guidelines when adding new content (especially projects and skills).

### Badge Color Mapping (`ProjectCard.astro`)
Project tech stacks use specific badge colors to group similar technologies conceptually:

- **`indigo`**: Core Languages & Scripts (`TypeScript`, `Python`, `Web Scraping`)
- **`rose`**: UI/Frontend & Mobile Frameworks (`React Native`, `Expo`, `SwiftUI`, `Astro`)
- **`cyan`**: Systems, Cloud & Native (`AWS`, `iOS`, `Swift`, `Full-stack`)
- **`purple`**: Backend-as-a-Service & CMS (`Supabase`, `Sanity`)
- **`amber`**: Workflow & Automation (`n8n`)
- **`green`**: Emerging Tech & General Status (`AI`, `current`)
- **`gray`**: Visibility Flags (`Private`)

*Example Usage:*
```typescript
{ text: 'React Native', color: 'rose' as const }
```

### Project Status Tags
For active projects, there are three recognized status levels. Unlike tech badges, these use explicit Tailwind classes to stand out:

1. **`live`** (Green): For production-ready apps.
   ```html
   <span class="text-[10px] text-terminal-accent-green px-2 py-0.5 rounded-full border border-terminal-accent-green/20">live</span>
   ```
2. **`in review`** (Blue): For apps currently in App Store Connect / Play Console review.
   ```html
   <span class="text-[10px] text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded-full border border-blue-400/20">in review</span>
   ```
3. **`in development`** (Orange): For apps currently being coded.
   ```html
   <span class="text-[10px] text-orange-400 bg-orange-400/10 px-2 py-0.5 rounded-full border border-orange-400/20">in development</span>
   ```

### Projects Tab Hierarchy
The Projects tab must follow this exact structural order to highlight priorities:
1. **Currently Focus** (Active main projects like PipeRead)
2. **Private / Client Work** (Closed source, client projects)
3. **Public / Open Source** (Open-source libraries and scripts)

## Development

Ensure you are using **Node.js >= 22.12.0**.

```bash
# Install dependencies
npm install

# Start development server
npm run dev      # or: npx astro dev

# Build for production
npm run build    # or: npx astro build

# Preview production build locally
npm run preview  # or: npx astro preview

# Lint & Format
npm run lint     # Check for lint errors
npm run format   # Format code with Prettier
```

---

Developed with ❤️ by Murat Levent.
