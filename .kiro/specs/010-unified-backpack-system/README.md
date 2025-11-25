# Spec 010 - Unified Backpack System

## Overview

The Unified Backpack System is a context-aware UI component that serves as the primary inventory and navigation interface across both Overworld (map) and Investigation modes. It provides a consistent interaction pattern while adapting its content based on the current game mode.

## Core Concept

**One Backpack, Two Contexts**

The same backpack button and drawer component is used in both game modes, but the tabs and content change based on context:

### Overworld Mode (Map Exploration)
- **Inventory** - View collected supplies (film, boosts, charms)
- **Codex** - Browse ghost encyclopedia
- **Profile** - View stats, level, XP, achievements
- **Settings** - Adjust game preferences

### Investigation Mode (Ghost Hunting)
- **Tools** - Select investigation equipment
- **Photos** - Review captured evidence photos
- **Evidence & Deduction** - Track evidence and narrow down ghost types
- **Field Journal** - Quick reference tips and notes
- **Codex** - Ghost encyclopedia (read-only reference)

## Key Features

### Context-Aware Tabs
Tabs automatically switch based on game mode, showing relevant content for the current activity.

### Evidence & Deduction
The killer feature - combines evidence tracking with real-time ghost type filtering. As you collect evidence, possible ghost types narrow down automatically.

### Analog Horror Aesthetic
All tabs follow the 006 Analog Horror Component System with aged paper, worn textures, coffee stains, tape, and vintage styling.

### Consistent UX
Same button position, same slide-up animation, same interaction pattern across all modes.

## Documents

- **requirements.md** - 15 requirements with user stories and acceptance criteria
- **design.md** - Technical architecture, components, data models, and correctness properties
- **tasks.md** - 20 implementation tasks in sequential order

## Related Documents

- **Steering 011** - Unified Backpack System (visual guidelines and implementation patterns)
- **Steering 006** - Analog Horror Component System (styling guidelines)
- **Spec 009** - Investigation UI Transformation (tool designs)

## Status

✅ Requirements Complete
✅ Design Complete
✅ Tasks Defined
⏳ Implementation Pending

---

**Created**: 2024
**Last Updated**: 2024
