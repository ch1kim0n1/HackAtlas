/**
 * Spacing and sizing system generator
 * Generates consistent spacing scales, border radius, and sizing tokens
 */

const SeededRandom = require('./random');

// Generate spacing scale based on base unit
function generateSpacing(baseUnit, random) {
  // Add slight variation to base unit
  const actualBase = baseUnit + random.nextFloat(-0.5, 0.5);
  
  const spacing = {
    '0': '0',
    'px': '1px',
    '0.5': `${Math.round(actualBase * 0.125 * 10) / 10}rem`,
    '1': `${Math.round(actualBase * 0.25 * 10) / 10}rem`,
    '1.5': `${Math.round(actualBase * 0.375 * 10) / 10}rem`,
    '2': `${Math.round(actualBase * 0.5 * 10) / 10}rem`,
    '2.5': `${Math.round(actualBase * 0.625 * 10) / 10}rem`,
    '3': `${Math.round(actualBase * 0.75 * 10) / 10}rem`,
    '3.5': `${Math.round(actualBase * 0.875 * 10) / 10}rem`,
    '4': `${Math.round(actualBase * 1 * 10) / 10}rem`,
    '5': `${Math.round(actualBase * 1.25 * 10) / 10}rem`,
    '6': `${Math.round(actualBase * 1.5 * 10) / 10}rem`,
    '7': `${Math.round(actualBase * 1.75 * 10) / 10}rem`,
    '8': `${Math.round(actualBase * 2 * 10) / 10}rem`,
    '9': `${Math.round(actualBase * 2.25 * 10) / 10}rem`,
    '10': `${Math.round(actualBase * 2.5 * 10) / 10}rem`,
    '11': `${Math.round(actualBase * 2.75 * 10) / 10}rem`,
    '12': `${Math.round(actualBase * 3 * 10) / 10}rem`,
    '14': `${Math.round(actualBase * 3.5 * 10) / 10}rem`,
    '16': `${Math.round(actualBase * 4 * 10) / 10}rem`,
    '20': `${Math.round(actualBase * 5 * 10) / 10}rem`,
    '24': `${Math.round(actualBase * 6 * 10) / 10}rem`,
    '28': `${Math.round(actualBase * 7 * 10) / 10}rem`,
    '32': `${Math.round(actualBase * 8 * 10) / 10}rem`,
    '36': `${Math.round(actualBase * 9 * 10) / 10}rem`,
    '40': `${Math.round(actualBase * 10 * 10) / 10}rem`,
    '44': `${Math.round(actualBase * 11 * 10) / 10}rem`,
    '48': `${Math.round(actualBase * 12 * 10) / 10}rem`,
    '52': `${Math.round(actualBase * 13 * 10) / 10}rem`,
    '56': `${Math.round(actualBase * 14 * 10) / 10}rem`,
    '60': `${Math.round(actualBase * 15 * 10) / 10}rem`,
    '64': `${Math.round(actualBase * 16 * 10) / 10}rem`,
    '72': `${Math.round(actualBase * 18 * 10) / 10}rem`,
    '80': `${Math.round(actualBase * 20 * 10) / 10}rem`,
    '96': `${Math.round(actualBase * 24 * 10) / 10}rem`,
  };

  return spacing;
}

// Generate border radius scale
function generateBorderRadius(theme, random) {
  // Theme affects roundness preference
  let baseRadius = 4; // Default
  
  if (theme.fontStyle === 'rounded') {
    baseRadius = 8;
  } else if (theme.fontStyle === 'geometric') {
    baseRadius = 2;
  }
  
  // Add variation
  const actualBase = baseRadius + random.nextFloat(-1, 1);
  
  const radius = {
    'none': '0',
    'sm': `${Math.round(actualBase * 0.5 * 10) / 10}px`,
    'base': `${Math.round(actualBase * 10) / 10}px`,
    'md': `${Math.round(actualBase * 1.5 * 10) / 10}px`,
    'lg': `${Math.round(actualBase * 2 * 10) / 10}px`,
    'xl': `${Math.round(actualBase * 3 * 10) / 10}px`,
    '2xl': `${Math.round(actualBase * 4 * 10) / 10}px`,
    '3xl': `${Math.round(actualBase * 6 * 10) / 10}px`,
    'full': '9999px',
  };

  return radius;
}

// Generate border width scale
function generateBorderWidth(random) {
  return {
    '0': '0',
    'default': '1px',
    '2': '2px',
    '4': '4px',
    '8': '8px',
  };
}

// Generate shadows
function generateShadows(theme, random) {
  const shadowIntensity = theme.contrastRatio === 'high' ? 0.3 : 0.15;
  const variation = random.nextFloat(-0.05, 0.05);
  const opacity = shadowIntensity + variation;
  
  return {
    'sm': `0 1px 2px 0 rgba(0, 0, 0, ${opacity})`,
    'base': `0 1px 3px 0 rgba(0, 0, 0, ${opacity}), 0 1px 2px 0 rgba(0, 0, 0, ${opacity * 0.6})`,
    'md': `0 4px 6px -1px rgba(0, 0, 0, ${opacity}), 0 2px 4px -1px rgba(0, 0, 0, ${opacity * 0.6})`,
    'lg': `0 10px 15px -3px rgba(0, 0, 0, ${opacity}), 0 4px 6px -2px rgba(0, 0, 0, ${opacity * 0.5})`,
    'xl': `0 20px 25px -5px rgba(0, 0, 0, ${opacity}), 0 10px 10px -5px rgba(0, 0, 0, ${opacity * 0.4})`,
    '2xl': `0 25px 50px -12px rgba(0, 0, 0, ${opacity * 1.5})`,
    'inner': `inset 0 2px 4px 0 rgba(0, 0, 0, ${opacity * 0.6})`,
    'none': 'none',
  };
}

// Generate opacity scale
function generateOpacity() {
  return {
    '0': '0',
    '5': '0.05',
    '10': '0.1',
    '20': '0.2',
    '25': '0.25',
    '30': '0.3',
    '40': '0.4',
    '50': '0.5',
    '60': '0.6',
    '70': '0.7',
    '75': '0.75',
    '80': '0.8',
    '90': '0.9',
    '95': '0.95',
    '100': '1',
  };
}

// Generate z-index scale
function generateZIndex() {
  return {
    '0': '0',
    '10': '10',
    '20': '20',
    '30': '30',
    '40': '40',
    '50': '50',
    'auto': 'auto',
  };
}

function generateSpacingAndSizing(theme, seed) {
  const random = new SeededRandom(seed + '-spacing');
  
  return {
    spacing: generateSpacing(1, random),
    borderRadius: generateBorderRadius(theme, random),
    borderWidth: generateBorderWidth(random),
    shadows: generateShadows(theme, random),
    opacity: generateOpacity(),
    zIndex: generateZIndex(),
  };
}

module.exports = {
  generateSpacingAndSizing,
};
