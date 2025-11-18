# Design System Documentation

## Overview
This design system provides a comprehensive set of reusable UI components and styling utilities for the FarizInk website. It ensures consistency, accessibility, and maintainability across all pages.

## Color System

### Design System Colors
All colors are available in 50-900 scale variations:

- **Primary**: Blue palette for main actions and links
- **Secondary**: Gray palette for secondary elements
- **Success**: Green palette for positive states
- **Warning**: Yellow palette for caution states
- **Danger**: Red palette for error/danger states

### Tool-Specific Colors
Each tool has its own color identity:
- `--color-password-red`: Password Generator
- `--color-qrcode-teal`: QR Code Generator
- `--color-palette-pink`: Color Palette Generator
- `--color-hash-blue`: Hash Generator
- `--color-base64-purple`: Base64 Converter
- `--color-json-green`: JSON Parser
- `--color-url-orange`: URL Encoder

## Typography Scale

- **xs**: 0.75rem (12px)
- **sm**: 0.875rem (14px)
- **base**: 1rem (16px)
- **lg**: 1.125rem (18px)
- **xl**: 1.25rem (20px)
- **2xl**: 1.5rem (24px)
- **3xl**: 1.875rem (30px)
- **4xl**: 2.25rem (36px)

## Spacing System

- **1**: 0.25rem (4px)
- **2**: 0.5rem (8px)
- **3**: 0.75rem (12px)
- **4**: 1rem (16px)
- **5**: 1.25rem (20px)
- **6**: 1.5rem (24px)
- **8**: 2rem (32px)
- **10**: 2.5rem (40px)
- **12**: 3rem (48px)
- **16**: 4rem (64px)
- **20**: 5rem (80px)

## Border Radius

- **sm**: 0.375rem (6px)
- **md**: 0.5rem (8px)
- **lg**: 0.75rem (12px)
- **xl**: 1rem (16px)
- **2xl**: 1.5rem (24px)
- **full**: 9999px

## Shadows

- **sm**: Subtle shadow for small elements
- **md**: Standard shadow for cards
- **lg**: Larger shadow for elevated elements
- **xl**: Strong shadow for modals/overlays
- **2xl**: Maximum shadow for prominent elements

## Transitions

- **fast**: 150ms ease (quick interactions)
- **normal**: 300ms ease (standard transitions)
- **slow**: 500ms ease (complex animations)

## Components

### Button
**Variants:**
- `primary`: Main action button (blue)
- `secondary`: Secondary button (gray)
- `success`: Success actions (green)
- `warning`: Warning actions (yellow)
- `danger`: Dangerous actions (red)
- `flat`: Minimal button (light gray)
- `ghost`: Transparent button

**Sizes:**
- `xs`: Extra small
- `sm`: Small
- `md`: Medium (default)
- `lg`: Large
- `xl`: Extra large

**Props:**
- `variant`: Button variant
- `size`: Button size
- `disabled`: Disable button
- `loading`: Show loading state
- `fullWidth`: Make button full width
- `href`: Convert to link
- `leftIcon`, `rightIcon`: Icon slots

### Input
**Variants:**
- `default`: Standard input
- `success`: Success state
- `warning`: Warning state
- `error`: Error state

**Sizes:**
- `sm`: Small input
- `md`: Medium input (default)
- `lg`: Large input

**Props:**
- `variant`: Input variant
- `size`: Input size
- `label`: Input label
- `placeholder`: Placeholder text
- `helperText`: Helper text below input
- `errorText`: Error message
- `disabled`: Disable input
- `readonly`: Make input read-only
- `required`: Mark as required
- `leftIcon`, `rightIcon`: Icon support

### Textarea
Similar to Input but with:
- `rows`: Number of rows
- `resize`: Resize behavior (`none`, `vertical`, `horizontal`, `both`)

### Card
**Variants:**
- `default`: Standard card with border
- `elevated`: Card with shadow
- `outlined`: Card with thick border
- `flat`: Minimal card with background only

**Padding:**
- `none`: No padding
- `sm`: Small padding
- `md`: Medium padding (default)
- `lg`: Large padding
- `xl`: Extra large padding

**Props:**
- `variant`: Card variant
- `padding`: Card padding
- `hover`: Enable hover effects
- `clickable`: Make card clickable

### Badge
**Variants:**
- `default`: Gray badge
- `primary`: Blue badge
- `success`: Green badge
- `warning`: Yellow badge
- `danger`: Red badge
- `info`: Cyan badge

**Sizes:**
- `sm`: Small badge
- `md`: Medium badge
- `lg`: Large badge

### Alert
**Variants:**
- `info`: Information alert (blue)
- `success`: Success alert (green)
- `warning`: Warning alert (yellow)
- `error`: Error alert (red)

**Props:**
- `variant`: Alert variant
- `dismissible`: Show dismiss button
- `show`: Control visibility

### ToolCard
Specialized card for tools display:
- Hover effects
- Status badges
- Feature lists
- Gradient backgrounds
- Interactive states

## Utility Classes

### Spacing
- `.ds-space-y-*`: Vertical spacing between direct children
- `.ds-space-x-*`: Horizontal spacing between direct children

### Typography
- `.ds-text-*`: Font size classes

### Hover Effects
- `.ds-hover-lift`: Lift element on hover
- `.ds-hover-scale`: Scale element on hover

### Loading States
- `.ds-loading`: Show loading shimmer effect

### Status Indicators
- `.ds-status-dot`: Small colored dot
- `.ds-status-*`: Color variants for status

### Gradients
- `.ds-gradient-*`: Predefined gradient backgrounds

### Glassmorphism
- `.ds-glass`: Glass effect with backdrop blur

### Shadows
- `.ds-shadow-button`: Button shadow
- `.ds-shadow-card`: Card shadow
- `.ds-shadow-modal`: Modal shadow

## Usage Examples

### Button Examples
```svelte
<!-- Primary button -->
<Button variant="primary" size="lg" onclick={handleClick}>
  Click Me
</Button>

<!-- Button with icon -->
<Button variant="success" onclick={handleAction}>
  <Check slot="leftIcon" class="w-4 h-4" />
  Success
</Button>

<!-- Loading button -->
<Button loading variant="primary" disabled>
  Loading...
</Button>
```

### Input Examples
```svelte
<!-- Standard input -->
Input
  bind:value={name}
  label="Name"
  placeholder="Enter your name"
  required
/>

<!-- Input with error state -->
Input
  bind:value={email}
  label="Email"
  type="email"
  errorText="Please enter a valid email"
  variant="error"
/>
```

### Card Examples
```svelte
<!-- Standard card -->
<Card variant="elevated" padding="lg">
  <h3 slot="header">Card Title</h3>
  <div slot="body">
    <p>Card content goes here.</p>
  </div>
</Card>

<!-- Clickable card -->
Card clickable hover on:click={handleClick}>
  Clickable card content
</Card>
```

## Best Practices

1. **Consistency**: Use design system colors and spacing consistently
2. **Accessibility**: Ensure proper contrast ratios and semantic markup
3. **Responsive**: Design components work on all screen sizes
4. **Performance**: Use CSS variables for dynamic theming
5. **Maintainability**: Document custom components and their props

## Future Enhancements

- Form validation components
- Data table components
- Modal components
- Navigation components
- Chart/graph components
- Loading spinners
- Progress indicators