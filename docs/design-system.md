# Bolt Agency OS Design System

## Overview

The Bolt Agency OS uses a comprehensive design system built on an orange color palette with consistent typography, spacing, and component patterns.

## Color Palette

### Primary (Orange)
- `primary-50`: #fff7ed
- `primary-100`: #ffedd5
- `primary-200`: #fed7aa
- `primary-300`: #fdba74
- `primary-400`: #fb923c
- `primary-500`: #f97316 (Main brand color)
- `primary-600`: #ea580c
- `primary-700`: #c2410c
- `primary-800`: #9a3412
- `primary-900`: #7c2d12

### Neutral (Grays)
- `neutral-50`: #f9fafb
- `neutral-100`: #f3f4f6
- `neutral-200`: #e5e7eb
- `neutral-300`: #d1d5db
- `neutral-400`: #9ca3af
- `neutral-500`: #6b7280
- `neutral-600`: #4b5563
- `neutral-700`: #374151
- `neutral-800`: #1f2937
- `neutral-900`: #11182c

### Status Colors
- **Success**: #22c55e (Green)
- **Warning**: #f59e0b (Amber)
- **Error**: #ef4444 (Red)
- **Info**: #3b82f6 (Blue)
- **Client Review**: #f97316 (Orange)

## Typography

### Font Family
- Primary: Inter
- Fallback: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif

### Font Sizes
- `xs`: 0.75rem (12px)
- `sm`: 0.875rem (14px)
- `base`: 1rem (16px)
- `lg`: 1.125rem (18px)
- `xl`: 1.25rem (20px)
- `2xl`: 1.5rem (24px)
- `3xl`: 1.875rem (30px)

### Font Weights
- `normal`: 400
- `medium`: 500
- `semibold`: 600
- `bold`: 700

## Components

### Buttons
- **Primary**: Orange background, white text
- **Secondary**: Light orange background, dark orange text
- **Ghost**: Transparent background, gray text

### Inputs
- White background with gray border
- Orange focus ring and border
- Consistent padding and border radius

### Cards
- White background
- Subtle shadow
- Rounded corners (lg)

### Badges
- Status-specific colors
- Small, rounded design
- Semibold text

## Usage Guidelines

1. **Consistency**: Always use design tokens instead of hardcoded values
2. **Accessibility**: Ensure proper color contrast ratios
3. **Hierarchy**: Use typography scale for proper information hierarchy
4. **Spacing**: Follow the 8px grid system for consistent spacing
5. **Colors**: Use semantic color names (primary, success, error) rather than specific color values

## Implementation

The design system is implemented through:
- Tailwind CSS configuration
- CSS custom properties
- Component classes in `src/index.css`
- TypeScript interfaces for type safety