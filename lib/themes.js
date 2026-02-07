/**
 * Theme definitions for Atlas
 * Each theme represents a narrative/story that drives visual decisions
 */

const themes = {
  cyberpunk: {
    name: 'Cyberpunk',
    description: 'Neon-lit dystopian future with high contrast and electric vibes',
    mood: 'intense, futuristic, rebellious',
    useCase: 'gaming, blockchain, AI',
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
    useCase: 'fintech, productivity, SaaS',
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
    useCase: 'wellness, sustainability, agriculture',
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
    useCase: 'development tools, gaming, streaming',
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
    useCase: 'social media, lifestyle, photography',
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
    useCase: 'healthcare, enterprise, cloud services',
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
    useCase: 'gaming, entertainment, creative tools',
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
    useCase: 'environmental, education, wellness',
    primaryHue: 140,      // Forest green
    secondaryHue: 80,     // Lime
    accentHue: 40,        // Amber
    saturationBoost: 0.0,
    contrastRatio: 'medium',
    fontStyle: 'humanist',
  },
  
  corporate: {
    name: 'Corporate',
    description: 'Professional and trustworthy with refined elegance',
    mood: 'confident, established, reliable',
    useCase: 'enterprise, B2B, consulting',
    primaryHue: 220,      // Navy blue
    secondaryHue: 200,    // Light blue
    accentHue: 30,        // Gold
    saturationBoost: -0.15,
    contrastRatio: 'medium',
    fontStyle: 'serif',
  },
  
  neonoir: {
    name: 'Neo Noir',
    description: 'Dark mystery with dramatic lighting and sharp contrasts',
    mood: 'mysterious, sophisticated, dramatic',
    useCase: 'security, privacy, investigative tools',
    primaryHue: 0,        // Red
    secondaryHue: 240,    // Deep blue
    accentHue: 50,        // Gold
    saturationBoost: 0.2,
    contrastRatio: 'high',
    fontStyle: 'geometric',
  },
  
  pastel: {
    name: 'Pastel Dreams',
    description: 'Soft, gentle hues with playful charm and approachability',
    mood: 'gentle, playful, friendly',
    useCase: 'education, kids apps, community',
    primaryHue: 330,      // Pink
    secondaryHue: 200,    // Light blue
    accentHue: 280,       // Lavender
    saturationBoost: -0.3,
    contrastRatio: 'low',
    fontStyle: 'rounded',
  },
  
  industrial: {
    name: 'Industrial',
    description: 'Raw materials and utilitarian design with bold structure',
    mood: 'rugged, functional, strong',
    useCase: 'manufacturing, construction, logistics',
    primaryHue: 30,       // Orange/Brown
    secondaryHue: 0,      // Red
    accentHue: 210,       // Steel blue
    saturationBoost: 0.0,
    contrastRatio: 'high',
    fontStyle: 'geometric',
  },
  
  ocean: {
    name: 'Ocean Depths',
    description: 'Deep aquatic blues with fluid gradients and calm energy',
    mood: 'tranquil, flowing, deep',
    useCase: 'travel, maritime, water conservation',
    primaryHue: 200,      // Blue
    secondaryHue: 180,    // Cyan
    accentHue: 160,       // Teal
    saturationBoost: 0.1,
    contrastRatio: 'medium',
    fontStyle: 'rounded',
  },
  
  fire: {
    name: 'Firelight',
    description: 'Intense warm palette with dynamic energy and passion',
    mood: 'passionate, energetic, bold',
    useCase: 'sports, fitness, competition',
    primaryHue: 10,       // Red-orange
    secondaryHue: 45,     // Orange
    accentHue: 350,       // Red
    saturationBoost: 0.35,
    contrastRatio: 'high',
    fontStyle: 'bold',
  },
  
  monochrome: {
    name: 'Monochrome',
    description: 'Pure black and white with timeless elegance',
    mood: 'classic, bold, editorial',
    useCase: 'portfolio, publishing, luxury',
    primaryHue: 0,
    secondaryHue: 0,
    accentHue: 0,
    saturationBoost: -1.0,
    contrastRatio: 'extreme',
    fontStyle: 'serif',
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

/**
 * Recommend themes based on project keywords or use case
 * @param {string} keywords - Space-separated keywords describing the project
 * @returns {Array} Array of recommended theme names with scores
 */
function recommendThemes(keywords) {
  if (!keywords) {
    return Object.keys(themes).slice(0, 3);
  }
  
  const searchTerms = keywords.toLowerCase().split(/\s+/);
  const scores = {};
  
  Object.entries(themes).forEach(([key, theme]) => {
    let score = 0;
    const themeText = `${theme.name} ${theme.description} ${theme.mood} ${theme.useCase}`.toLowerCase();
    
    searchTerms.forEach(term => {
      if (themeText.includes(term)) {
        score += 10;
      }
      
      // Partial matches
      const words = themeText.split(/\s+/);
      words.forEach(word => {
        if (word.includes(term) || term.includes(word)) {
          score += 3;
        }
      });
    });
    
    scores[key] = score;
  });
  
  // Sort by score descending
  const sorted = Object.entries(scores)
    .filter(([_, score]) => score > 0)
    .sort((a, b) => b[1] - a[1])
    .map(([key, score]) => ({ theme: key, score, details: themes[key] }));
  
  return sorted.length > 0 ? sorted : [
    { theme: 'minimal', score: 0, details: themes.minimal },
    { theme: 'cyberpunk', score: 0, details: themes.cyberpunk },
    { theme: 'sunset', score: 0, details: themes.sunset }
  ];
}

module.exports = {
  getTheme,
  listThemes,
  recommendThemes,
  themes,
};
