/**
 * Theme definitions for Atlas
 * Each theme represents a narrative/story that drives visual decisions
 */

const themes = {
  cyberpunk: {
    name: 'Cyberpunk',
    description: 'Neon-lit dystopian future with high contrast and electric vibes',
    mood: 'intense, futuristic, rebellious',
    primaryHue: 280,      // Purple
    secondaryHue: 180,    // Cyan
    accentHue: 320,       // Pink/Magenta
    saturationBoost: 0.3,
    contrastRatio: 'high',
    fontStyle: 'geometric',
  },
  
  minimal: {
    name: 'Minimal',
    description: 'Clean, spacious, and purposeful with maximum clarity',
    mood: 'calm, focused, professional',
    primaryHue: 220,      // Blue
    secondaryHue: 210,    // Blue-gray
    accentHue: 200,       // Light blue
    saturationBoost: -0.2,
    contrastRatio: 'medium',
    fontStyle: 'sans-serif',
  },
  
  nature: {
    name: 'Nature',
    description: 'Organic earth tones with warmth and natural harmony',
    mood: 'warm, grounded, peaceful',
    primaryHue: 120,      // Green
    secondaryHue: 30,     // Brown/Orange
    accentHue: 60,        // Yellow-green
    saturationBoost: 0.0,
    contrastRatio: 'medium',
    fontStyle: 'humanist',
  },
  
  darkmode: {
    name: 'Dark Mode',
    description: 'Low-light optimized with deep backgrounds and glowing accents',
    mood: 'mysterious, comfortable, modern',
    primaryHue: 240,      // Blue
    secondaryHue: 260,    // Purple
    accentHue: 200,       // Cyan
    saturationBoost: 0.1,
    contrastRatio: 'high',
    fontStyle: 'sans-serif',
  },
  
  sunset: {
    name: 'Sunset',
    description: 'Warm gradient palette inspired by golden hour',
    mood: 'energetic, optimistic, vibrant',
    primaryHue: 20,       // Orange
    secondaryHue: 340,    // Pink
    accentHue: 50,        // Yellow
    saturationBoost: 0.2,
    contrastRatio: 'medium',
    fontStyle: 'rounded',
  },
  
  arctic: {
    name: 'Arctic',
    description: 'Cool, crisp palette with icy blues and clean whites',
    mood: 'pristine, fresh, spacious',
    primaryHue: 190,      // Light blue
    secondaryHue: 210,    // Blue
    accentHue: 170,       // Turquoise
    saturationBoost: -0.1,
    contrastRatio: 'medium',
    fontStyle: 'sans-serif',
  },
  
  retrowave: {
    name: 'Retrowave',
    description: '80s inspired with bold colors and nostalgic vibes',
    mood: 'nostalgic, bold, energetic',
    primaryHue: 300,      // Magenta
    secondaryHue: 180,    // Cyan
    accentHue: 60,        // Yellow
    saturationBoost: 0.4,
    contrastRatio: 'high',
    fontStyle: 'geometric',
  },
  
  forest: {
    name: 'Forest',
    description: 'Deep greens with natural textures and organic flow',
    mood: 'serene, natural, grounded',
    primaryHue: 140,      // Forest green
    secondaryHue: 80,     // Lime
    accentHue: 40,        // Amber
    saturationBoost: 0.0,
    contrastRatio: 'medium',
    fontStyle: 'humanist',
  },

  neobrutalism: {
    name: 'Neo-Brutalism',
    description: 'Vibrant colors, thick borders, and aggressive shadows',
    mood: 'bold, loud, raw',
    primaryHue: 50,       // Yellow
    secondaryHue: 180,    // Cyan
    accentHue: 320,       // Pink
    saturationBoost: 0.5,
    contrastRatio: 'high',
    fontStyle: 'geometric',
    archetype: {
      borderWidth: '4px',
      borderRadius: '0px',
      shadowType: 'hard',
      showBorders: true,
    }
  },

  glassmorphism: {
    name: 'Glassmorphism',
    description: 'Frosted glass effect with soft glows and minimalism',
    mood: 'elegant, transparent, layered',
    primaryHue: 210,
    secondaryHue: 280,
    accentHue: 190,
    saturationBoost: 0.2,
    contrastRatio: 'medium',
    fontStyle: 'sans-serif',
    archetype: {
      blur: '10px',
      opacity: 0.6,
      borderRadius: '24px',
      borderWidth: '1px',
      shadowType: 'soft',
    }
  }
};

function getTheme(themeName) {
  const theme = themes[themeName.toLowerCase()];
  if (!theme) {
    const available = Object.keys(themes).join(', ');
    throw new Error(`Theme '${themeName}' not found. Available: ${available}`);
  }
  return theme;
}

function loadCustomTheme(filePath) {
  const fs = require('fs');
  const path = require('path');
  const resolved = path.resolve(filePath);
  if (!fs.existsSync(resolved)) {
    throw new Error(`Custom theme file not found: ${resolved}`);
  }
  const data = JSON.parse(fs.readFileSync(resolved, 'utf8'));
  // Validate required fields
  const required = ['primaryHue'];
  for (const field of required) {
    if (data[field] === undefined) {
      throw new Error(`Custom theme missing required field: ${field}`);
    }
  }
  // Apply defaults for optional fields
  return {
    name: data.name || 'Custom',
    description: data.description || 'Custom theme',
    mood: data.mood || 'custom',
    primaryHue: data.primaryHue,
    secondaryHue: data.secondaryHue !== undefined ? data.secondaryHue : (data.primaryHue + 120) % 360,
    accentHue: data.accentHue !== undefined ? data.accentHue : (data.primaryHue + 240) % 360,
    saturationBoost: data.saturationBoost !== undefined ? data.saturationBoost : 0,
    contrastRatio: data.contrastRatio || 'medium',
    fontStyle: data.fontStyle || 'sans-serif',
    archetype: data.archetype || undefined,
  };
}

function listThemes() {
  return Object.values(themes);
}

module.exports = {
  getTheme,
  listThemes,
  loadCustomTheme,
  themes,
};
