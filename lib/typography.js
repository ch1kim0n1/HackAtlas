/**
 * Typography system generator
 * Generates type scales, font pairings, and text styles
 */

const SeededRandom = require('./random');

// Font stack definitions by style
const fontStacks = {
  'geometric': {
    primary: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    heading: '"Space Grotesk", -apple-system, BlinkMacSystemFont, sans-serif',
    mono: '"JetBrains Mono", "Fira Code", Consolas, Monaco, monospace',
  },
  'sans-serif': {
    primary: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    heading: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    mono: 'ui-monospace, "Cascadia Code", Menlo, Monaco, monospace',
  },
  'humanist': {
    primary: '"Open Sans", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    heading: '"Merriweather", Georgia, "Times New Roman", serif',
    mono: '"Source Code Pro", Consolas, Monaco, monospace',
  },
  'rounded': {
    primary: 'ui-rounded, "SF Pro Rounded", "Nunito", "Helvetica Neue", Arial, sans-serif',
    heading: 'ui-rounded, "SF Pro Rounded", "Nunito", sans-serif',
    mono: '"Courier Prime", "Courier New", Courier, monospace',
  },
};

// Generate modular scale for typography
function generateTypeScale(baseSize, ratio, random) {
  // Add slight variation to ratio for uniqueness
  const actualRatio = ratio + random.nextFloat(-0.02, 0.02);
  
  const scale = {
    'xs': Math.round(baseSize / Math.pow(actualRatio, 2) * 10) / 10,
    'sm': Math.round(baseSize / actualRatio * 10) / 10,
    'base': baseSize,
    'lg': Math.round(baseSize * actualRatio * 10) / 10,
    'xl': Math.round(baseSize * Math.pow(actualRatio, 2) * 10) / 10,
    '2xl': Math.round(baseSize * Math.pow(actualRatio, 3) * 10) / 10,
    '3xl': Math.round(baseSize * Math.pow(actualRatio, 4) * 10) / 10,
    '4xl': Math.round(baseSize * Math.pow(actualRatio, 5) * 10) / 10,
    '5xl': Math.round(baseSize * Math.pow(actualRatio, 6) * 10) / 10,
  };

  return scale;
}

// Generate line height scale
function generateLineHeights(theme, random) {
  // Base line heights with slight variation
  const baseVariation = random.nextFloat(-0.05, 0.05);
  
  return {
    none: 1,
    tight: Math.round((1.25 + baseVariation) * 100) / 100,
    snug: Math.round((1.375 + baseVariation) * 100) / 100,
    normal: Math.round((1.5 + baseVariation) * 100) / 100,
    relaxed: Math.round((1.625 + baseVariation) * 100) / 100,
    loose: Math.round((2 + baseVariation) * 100) / 100,
  };
}

// Generate letter spacing scale
function generateLetterSpacing(random) {
  return {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  };
}

// Generate font weights
function generateFontWeights(theme, random) {
  // Some themes might prefer different weight distributions
  const weights = {
    thin: 100,
    extralight: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  };

  return weights;
}

function generateTypography(theme, seed) {
  const random = new SeededRandom(seed);
  
  // Select font stack based on theme style
  const fonts = fontStacks[theme.fontStyle] || fontStacks['sans-serif'];
  
  // Base font size (16px typical, with variation)
  const baseSize = 16;
  
  // Type scale ratio varies by theme mood
  let ratio = 1.25; // Minor third
  if (theme.contrastRatio === 'high') {
    ratio = 1.333; // Perfect fourth - more dramatic
  }
  
  const typography = {
    fonts: fonts,
    fontSize: generateTypeScale(baseSize, ratio, random),
    lineHeight: generateLineHeights(theme, random),
    letterSpacing: generateLetterSpacing(random),
    fontWeight: generateFontWeights(theme, random),
  };

  return typography;
}

module.exports = {
  generateTypography,
};
