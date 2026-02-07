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
};

function getTheme(themeName) {
  const theme = themes[themeName.toLowerCase()];
  if (!theme) {
    throw new Error(`Theme '${themeName}' not found. Use 'atlas themes' to see available themes.`);
  }
  return theme;
}

function listThemes() {
  return Object.values(themes);
}

module.exports = {
  getTheme,
  listThemes,
  themes,
};
