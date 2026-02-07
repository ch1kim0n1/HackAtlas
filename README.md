# MindCore · Atlas

A CLI-first, local-only, deterministic design accelerator for hackathons.

## What is Atlas?

Atlas generates a complete, opinionated design system foundation that **locks visual identity early** and **preserves coherence through pivots**. Built specifically for hackathons where time is critical and design indecision kills momentum.

### What Atlas IS:
- ✅ A deterministic design system generator
- ✅ A story-driven visual identity tool
- ✅ A design decision eliminator
- ✅ A coherence preserver under time pressure

### What Atlas is NOT:
- ❌ A design editor
- ❌ A Figma replacement
- ❌ An AI art generator
- ❌ Dependent on 3rd party APIs

## Philosophy

During hackathons, teams waste precious hours debating colors, spacing, and typography. Then when they pivot (and they will), their UI falls apart because there was no system. Atlas solves this by:

1. **Locking identity early**: Generate your complete design system in <1 second
2. **Story-driven consistency**: Every decision flows from a narrative theme
3. **Deterministic output**: Same theme + seed = same system (always)
4. **No decision paralysis**: Opinionated defaults eliminate bikeshedding
5. **Pivot-proof**: Your tokens survive feature changes because they're systematic

## Installation

```bash
npm install -g @mindcore/atlas
```

Or use directly:
```bash
npx @mindcore/atlas generate
```

Or clone and use locally:
```bash
git clone https://github.com/ch1kim0n1/HackAtlas.git
cd HackAtlas
npm install
npm link  # Optional: makes 'atlas' available globally
```

## Quick Start

Generate your first design system:

```bash
atlas generate
```

This creates a `./design-system` folder with:
- `tokens.css` - CSS custom properties
- `tokens.json` - JSON tokens
- `components.css` - Component-level tokens
- `README.md` - Usage guide

## Usage

### Basic Generation

```bash
# Generate with default theme (cyberpunk)
atlas generate

# Generate with specific theme
atlas generate --theme minimal

# Generate with custom seed for determinism
atlas generate --seed my-project-2024

# Specify output directory
atlas generate --output ./src/design-tokens

# Choose output formats
atlas generate --format css json js
```

### Deterministic Design

The killer feature: **same input = same output, always**.

```bash
# Team member 1 generates
atlas generate --theme nature --seed hackathon2024

# Team member 2 gets IDENTICAL system
atlas generate --theme nature --seed hackathon2024

# After pivoting, regenerate with same seed
atlas generate --theme nature --seed hackathon2024
# Your colors/spacing stay consistent!
```

### Available Themes

```bash
atlas themes
```

Atlas includes 8 carefully crafted narrative themes:

- **cyberpunk** - Neon-lit dystopian future, high contrast, electric vibes
- **minimal** - Clean spacious design, maximum clarity
- **nature** - Organic earth tones, warm and grounded
- **darkmode** - Low-light optimized, deep backgrounds, glowing accents
- **sunset** - Warm gradients, golden hour inspired
- **arctic** - Cool crisp palette, icy blues and whites
- **retrowave** - 80s inspired, bold nostalgic colors
- **forest** - Deep greens, natural textures, organic flow

Each theme is a **story**, not just colors. The narrative drives every token decision.

## Output Formats

### CSS (Custom Properties)

```css
:root {
  --color-primary-500: #8b5cf6;
  --font-size-lg: 18px;
  --spacing-4: 1rem;
  --radius-md: 6px;
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.15);
}

.my-button {
  background: var(--color-primary-500);
  font-size: var(--font-size-lg);
  padding: var(--spacing-4);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
}
```

### JavaScript/TypeScript

```javascript
import tokens from './design-system/tokens.js';

const Button = () => ({
  backgroundColor: tokens.colors.primary['500'],
  fontSize: tokens.typography.fontSize.lg,
  padding: tokens.spacing.spacing['4'],
});
```

### JSON (for any framework)

```json
{
  "colors": {
    "primary": {
      "500": "#8b5cf6"
    }
  }
}
```

## Design System Structure

Atlas generates a complete system with:

### Colors
- **Primary, Secondary, Accent** - Full 11-step scales (50-950)
- **Semantic colors** - Success, Warning, Error, Info
- **Neutrals** - Complete gray scale
- All harmonized to your theme

### Typography
- **Font families** - Primary, heading, and monospace stacks
- **Type scale** - 9 sizes (xs → 5xl) with mathematical harmony
- **Line heights** - 6 semantic options
- **Font weights** - Complete weight scale
- **Letter spacing** - Fine-tuned for readability

### Spacing & Sizing
- **Spacing scale** - 40+ values with consistent rhythm
- **Border radius** - From subtle to full pill shapes
- **Shadows** - 8 elevation levels
- **Opacity scale** - Pre-defined alpha values
- **Z-index** - Layering system

### Component Tokens
- **Buttons** - Primary, secondary, outline, ghost variants
- **Inputs** - Base states, focus, error handling
- **Cards** - Base, elevated, outlined styles
- **Badges** - All semantic variants
- **Alerts** - Info, success, warning, error states
- **Navigation** - Nav and link styles

## Why Atlas Wins at Hackathons

### Before Atlas:
```
Hour 1: "What colors should we use?"
Hour 2: "This blue or that blue?"
Hour 3: "Okay let's just pick something"
Hour 4: "Wait, the spacing looks off"
Hour 6: *pivot happens*
Hour 7: "Our UI is a mess now"
Hour 8: "Should we redesign everything?"
Hour 12: "We're out of time"
```

### With Atlas:
```
Minute 1: atlas generate --theme cyberpunk --seed hackathon2024
Minute 2: Start building features
Hour 6: *pivot happens*
Hour 6.5: Keep using same tokens, UI stays coherent
Hour 12: Ship working product with consistent design
```

## Philosophy Deep Dive

### Story-Driven Design

Every theme is a **narrative**, not just a color palette. "Cyberpunk" isn't just purple and cyan—it's neon-lit streets, high contrast, rebellion. This story informs:
- Color relationships
- Typography choices (geometric fonts for tech themes)
- Spacing decisions (tight/loose based on mood)
- Shadow intensities (dramatic vs subtle)

### Determinism Matters

Random generation is chaos. Atlas uses **seeded randomization**:
- Same seed always produces same output
- Share seeds with your team for perfect consistency
- Pivot your features, keep your seed, maintain visual coherence
- Reproduce your exact system months later

### Opinionated = Fast

Atlas makes decisions so you don't have to:
- Pre-defined semantic colors
- Mathematically harmonious scales
- Battle-tested component patterns
- No bikeshedding allowed

### Local-Only = Fast + Private

- Zero network latency
- Works offline
- No API keys or accounts
- Your design stays yours
- Generate systems in <1 second

## Advanced Usage

### Multiple Systems

Generate different systems for different moods:

```bash
atlas generate --theme cyberpunk --seed main --output ./design-main
atlas generate --theme minimal --seed landing --output ./design-landing
```

### Team Synchronization

1. Decide on theme + seed as a team
2. Everyone runs: `atlas generate --theme X --seed Y`
3. Everyone gets identical tokens
4. No design drift, ever

### Pivot Survival

```bash
# Day 1: Social network
atlas generate --theme minimal --seed project2024

# Day 1.5: Pivot to gaming platform
# Keep same seed! Just rebuild with same tokens
atlas generate --theme minimal --seed project2024

# Your buttons, spacing, colors stay consistent
# Only your features changed, not your design
```

## API Usage (Programmatic)

```javascript
const { generateDesignSystem } = require('@mindcore/atlas');

const result = generateDesignSystem({
  theme: 'cyberpunk',
  seed: 'my-project',
  output: './tokens',
  format: ['css', 'json', 'js'],
  components: true,
});

console.log('Generated:', result.filesGenerated);
```

## Requirements

- Node.js 14+
- No internet connection needed
- No external APIs
- Works on macOS, Linux, Windows

## Contributing

This is hackathon software—built fast, built focused. PRs welcome for:
- New themes (must be story-driven)
- Bug fixes
- Documentation improvements
- Performance enhancements

## License

MIT

## Credits

Built by MindCore for the hackathon community. Design systems shouldn't be the bottleneck.

---

**Stop debating colors. Start shipping features.**

`atlas generate --theme cyberpunk --seed hackathon2024`
