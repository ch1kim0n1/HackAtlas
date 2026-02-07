# Atlas Examples

## Example 1: Basic Usage with Auto-Preview

Generate a design system with the cyberpunk theme and preview it:

```bash
atlas generate --theme cyberpunk --seed my-hackathon-2024 --preview
```

This creates a `design-system` folder with all your design tokens **and** automatically opens an HTML preview in your browser so you can see all the colors, spacing, typography, and components.

## Example 2: Custom Theme with Preview

Use a custom theme file and preview the result:

```bash
atlas generate --theme-file ./my-theme.json --seed my-project --preview
```

## Example 3: Stdout Mode for Scripting

Get JSON output without creating files (useful for automation):

```bash
# Pipe to jq for processing
atlas generate --theme nature --stdout | jq '.colors.primary'

# Save to custom location
atlas generate --theme ocean --stdout > ./config/design-tokens.json

# Use in scripts
TOKENS=$(atlas generate --theme minimal --stdout)
echo "$TOKENS" | node process-tokens.js
```

## Example 4: Using in HTML/CSS

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="design-system/tokens.css" />
    <link rel="stylesheet" href="design-system/components.css" />
    <style>
      body {
        font-family: var(--font-primary);
        background: var(--color-neutral-50);
        color: var(--color-neutral-900);
        padding: var(--spacing-8);
      }

      .hero {
        background: var(--color-primary-500);
        color: var(--color-neutral-50);
        padding: var(--spacing-12);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-xl);
      }

      h1 {
        font-size: var(--font-size-4xl);
        font-weight: var(--font-weight-bold);
        margin-bottom: var(--spacing-4);
      }

      button {
        background: var(--color-accent-500);
        color: var(--color-neutral-50);
        padding: var(--spacing-4) var(--spacing-8);
        border-radius: var(--radius-md);
        border: none;
        font-size: var(--font-size-lg);
        font-weight: var(--font-weight-semibold);
        cursor: pointer;
        box-shadow: var(--shadow-md);
      }

      button:hover {
        background: var(--color-accent-600);
      }
    </style>
  </head>
  <body>
    <div class="hero">
      <h1>Welcome to Our Hackathon Project</h1>
      <p>Built with Atlas design system</p>
      <button>Get Started</button>
    </div>
  </body>
</html>
```

## Example 5: Select Output Formats

```bash
# Only CSS and Tailwind (skip JSON and JS)
atlas generate --theme nature --format css tailwind

# Only JSON for programmatic consumption
atlas generate --theme cyberpunk --format json --output ./tokens

# All formats (default)
atlas generate --theme sunset --format css json js tailwind
```

## Example 6: Custom Output Directory

```bash
# Save to src/styles
atlas generate --theme corporate --output ./src/styles

# Save to specific project location
atlas generate --theme ocean --output ./frontend/design-tokens
```

## Example 7: No Component Classes

Generate only core tokens without component utilities:

```bash
# Just colors, spacing, typography (no .btn, .card, etc.)
atlas generate --theme minimal --no-components
```

## Example 8: Using in React

```jsx
import tokens from "./design-system/tokens.js";

function Button({ children, variant = "primary" }) {
  const styles = {
    backgroundColor: tokens.colors[variant]["500"],
    color: tokens.colors.neutral["50"],
    padding: `${tokens.spacing.spacing["3"]} ${tokens.spacing.spacing["6"]}`,
    borderRadius: tokens.spacing.borderRadius["md"],
    fontSize: tokens.typography.fontSize["base"] + "px",
    fontWeight: tokens.typography.fontWeight["semibold"],
    border: "none",
    boxShadow: tokens.spacing.shadows["md"],
    cursor: "pointer",
  };

  return <button style={styles}>{children}</button>;
}

function App() {
  return (
    <div
      style={{
        fontFamily: tokens.typography.fonts.primary,
        padding: tokens.spacing.spacing["8"],
      }}
    >
      <h1
        style={{
          fontSize: tokens.typography.fontSize["4xl"] + "px",
          color: tokens.colors.primary["700"],
          marginBottom: tokens.spacing.spacing["4"],
        }}
      >
        My Hackathon App
      </h1>

      <Button variant="primary">Primary Action</Button>
      <Button variant="secondary">Secondary Action</Button>
    </div>
  );
}
```

## Example 4: Team Synchronization

### Team Lead (shares with team):

```bash
atlas generate --theme nature --seed team-awesome-2024

# Share in team chat:
# "Everyone run: atlas generate --theme nature --seed team-awesome-2024"
```

### All Team Members:

```bash
atlas generate --theme nature --seed team-awesome-2024
```

Everyone gets the **exact same design system**. No drift, no confusion.

## Example 5: Multiple Themes

Generate different themes for different sections:

```bash
# Main app - professional look
atlas generate --theme minimal --seed main --output ./src/design/main

# Landing page - bold and exciting
atlas generate --theme cyberpunk --seed landing --output ./src/design/landing

# Admin panel - clean and functional
atlas generate --theme darkmode --seed admin --output ./src/design/admin
```

## Example 6: Tailwind-style Utilities

Create utility classes from your tokens:

```css
@import "design-system/tokens.css";

/* Color utilities */
.text-primary {
  color: var(--color-primary-500);
}
.bg-primary {
  background-color: var(--color-primary-500);
}
.text-neutral {
  color: var(--color-neutral-700);
}

/* Spacing utilities */
.p-4 {
  padding: var(--spacing-4);
}
.m-4 {
  margin: var(--spacing-4);
}
.gap-4 {
  gap: var(--spacing-4);
}

/* Typography utilities */
.text-lg {
  font-size: var(--font-size-lg);
}
.font-bold {
  font-weight: var(--font-weight-bold);
}

/* Layout utilities */
.rounded {
  border-radius: var(--radius-md);
}
.shadow {
  box-shadow: var(--shadow-md);
}
```

## Example 7: Vue.js Integration

```vue
<template>
  <div class="app">
    <Card>
      <h1 class="title">{{ title }}</h1>
      <p class="description">{{ description }}</p>
      <Button variant="primary" @click="handleClick"> Click Me </Button>
    </Card>
  </div>
</template>

<script>
import tokens from "./design-system/tokens.js";

export default {
  data() {
    return {
      title: "Atlas Design System",
      description: "Generated in seconds, consistent forever",
    };
  },
  methods: {
    handleClick() {
      console.log("Button clicked!");
    },
  },
};
</script>

<style scoped>
.app {
  font-family: v-bind("tokens.typography.fonts.primary");
  padding: v-bind("tokens.spacing.spacing[8]");
}

.title {
  font-size: v-bind('tokens.typography.fontSize["3xl"] + "px"');
  color: v-bind("tokens.colors.primary[700]");
  margin-bottom: v-bind("tokens.spacing.spacing[4]");
}

.description {
  color: v-bind("tokens.colors.neutral[600]");
  margin-bottom: v-bind("tokens.spacing.spacing[6]");
}
</style>
```

## Example 8: Pivot Scenario

### Day 1 - Building a Social Network

```bash
atlas generate --theme minimal --seed socialapp2024
# Build features using tokens...
```

### Day 1, Evening - Pivot to Gaming Platform

```bash
# Keep the same seed to maintain visual consistency!
atlas generate --theme minimal --seed socialapp2024

# Alternative: switch theme but keep structure
atlas generate --theme cyberpunk --seed socialapp2024
```

Your spacing, component structures, and token organization stay the same. Only colors/typography shift if you change theme. Features can pivot freely!

## Example 9: Using Component Tokens

```css
/* Direct use of component tokens */
.my-custom-button {
  /* Copy styles from generated components.css */
}

/* Or extend them */
.my-special-button {
  background: var(--color-accent-500);
  padding: var(--spacing-3) var(--spacing-6);
  border-radius: var(--radius-md);
  font-weight: var(--font-weight-semibold);
  /* Add your custom properties */
  transform: scale(1.05);
}
```

## Example 10: CI/CD Integration

```yaml
# .github/workflows/deploy.yml
name: Deploy

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2

      - name: Install dependencies
        run: npm install

      - name: Generate design system
        run: npx @mindcore/atlas generate --theme cyberpunk --seed ${{ github.repository }}

      - name: Build app
        run: npm run build
```

This ensures your design system is always regenerated with the same seed in your CI pipeline!
