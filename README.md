# MindCore · Atlas

> **Lock the look. Tell the story.**

MindCore · Atlas is a CLI-first, deterministic design accelerator for hackathons that generates a complete **design system foundation**—tokens, themes, and configs—so teams can move fast without visual chaos.

Atlas eliminates design indecision, survives pivots, and enforces visual consistency from first commit to final demo.

---

## Why Atlas Exists

Hackathon teams lose points because:

- Design decisions happen too late
- Pivots destroy visual consistency
- UI looks stitched together
- Storytelling is unclear or nonexistent

Atlas removes design as a bottleneck by **locking visual identity early** and encoding narrative intent directly into the design system.

---

## Core Principles

- **Hackathon-first**
- **Decision elimination**
- **Deterministic output**
- **Local-only**
- **No authentication**
- **Fast execution**
- **Pivot-safe design**

Atlas is strict by design.

---

## What Atlas Is

- A CLI tool
- A design system generator
- A storytelling encoder
- A visual consistency enforcer

## What Atlas Is NOT

- A design editor
- A Figma replacement
- An AI art generator
- A wireframing tool
- A creativity sandbox

---

## Supported Use Case

**When to use Atlas:**

- Early build phase
- Immediately after or alongside project setup
- Before UI implementation explodes
- During pivots to preserve coherence

**When not to use Atlas:**

- For custom branding work
- For artistic exploration
- For pixel-perfect mockups

---

## Installation

```bash
# Clone the repository
git clone https://github.com/ch1kim0n1/HackAtlas.git
cd HackAtlas

# Install dependencies
npm install

# Link globally (optional)
npm link
```

## Usage

### Basic Usage

Generate a design system with a theme:

```bash
atlas generate --theme cyberpunk --seed my-project-2024
```

This creates a `design-system/` folder with:

- `tokens.css` - CSS custom properties
- `tokens.json` - JSON token export
- `tokens.js` - JavaScript/TypeScript compatible
- `tailwind.config.js` - Tailwind CSS configuration
- `components.css` - Component utility classes

### Available Themes

- `cyberpunk` - Neon colors, futuristic vibes
- `nature` - Earthy tones, organic feel
- `corporate` - Professional blues and grays
- `sunset` - Warm oranges and purples
- `ocean` - Cool blues and teals
- `forest` - Deep greens and browns
- `minimal` - Clean blacks and whites
- `candy` - Vibrant pinks and pastels

### Custom Theme from File

Use your own theme configuration:

```bash
atlas generate --theme-file ./my-theme.json --seed my-project
```

Example theme file format:

```json
{
  "name": "my-custom-theme",
  "colors": {
    "primary": "#FF6B6B",
    "secondary": "#4ECDC4",
    "accent": "#FFE66D"
  }
}
```

### HTML Preview

Generate and auto-open an HTML preview:

```bash
atlas generate --theme cyberpunk --preview
```

This creates `design-system/preview.html` and automatically opens it in your browser to visualize your design system.

### Output to stdout (No Files)

Get JSON output without writing files (useful for piping to other tools):

```bash
atlas generate --theme cyberpunk --stdout > design.json
```

### Select Output Formats

Choose which formats to generate:

```bash
# Only CSS and JSON
atlas generate --theme nature --format css json

# Only Tailwind config
atlas generate --theme ocean --format tailwind

# All formats (default)
atlas generate --theme sunset --format css json js tailwind
```

### Skip Component Tokens

Generate only core tokens without component utilities:

```bash
atlas generate --theme minimal --no-components
```

### Custom Output Directory

Specify where to save the design system:

```bash
atlas generate --theme corporate --output ./src/design-tokens
```

### List Available Themes

See all built-in themes:

```bash
atlas list-themes
```

### Complete Example

```bash
# Generate a complete design system with preview
atlas generate \
  --theme cyberpunk \
  --seed hackathon-2024 \
  --output ./src/design \
  --format css json tailwind \
  --preview
```

## Output Structure

```
design-system/
├── tokens.css           # CSS custom properties
├── tokens.json          # JSON token export
├── tokens.js            # JavaScript module
├── components.css       # Component utilities
├── tailwind.config.js   # Tailwind configuration
└── preview.html         # Visual preview (if --preview used)
```

## Deterministic Generation

Atlas uses a seed-based approach to ensure consistency:

```bash
# Same theme + seed = identical output
atlas generate --theme cyberpunk --seed my-app
atlas generate --theme cyberpunk --seed my-app
# Always produces the same design system
```

This ensures your design stays consistent even after pivots or regeneration.

---

## Input Contract

Atlas operates via CLI flags.

### Required Inputs

- Theme selection (or custom theme file)
- Seed for deterministic generation
- Output format preference

All inputs have sensible defaults, so Atlas works out of the box:

```bash
# Simplest usage (uses defaults)
atlas generate
```
