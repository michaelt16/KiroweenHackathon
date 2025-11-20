# Tech Stack & Conventions

## Stack Decision
- **Framework**: React PWA (Create React App or Vite)
- **Map Library**: Leaflet + React-Leaflet
- **State Management**: React Context or Zustand (lightweight)
- **Styling**: Tailwind CSS or CSS Modules
- **Testing**: Vitest + React Testing Library

## Dev Mode Requirements
- All features MUST be testable without GPS
- Dev Mode toggle should persist in localStorage
- Default dev coordinates: [your city coordinates]

## Code Conventions
- Component structure: `/src/components/{feature}/{ComponentName}.tsx`
- Hooks: `/src/hooks/use{HookName}.ts`
- Types: `/src/types/{domain}.ts`
- One component per file
- Props interfaces named `{ComponentName}Props`
