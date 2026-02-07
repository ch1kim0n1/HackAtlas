/**
 * Color system generator
 * Generates harmonious color palettes based on theme and seed
 */

const SeededRandom = require('./random');

// HSL to RGB conversion
function hslToRgb(h, s, l) {
  h = h / 360;
  s = s / 100;
  l = l / 100;

  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

function hslToHex(h, s, l) {
  const [r, g, b] = hslToRgb(h, s, l);
  return rgbToHex(r, g, b);
}

// Generate a color scale from a base hue
function generateColorScale(hue, saturation, theme, random) {
  const scale = {};
  const satBoost = theme.saturationBoost || 0;
  
  // Generate lightness scale (50-950)
  const steps = [
    { name: '50', lightness: 95 },
    { name: '100', lightness: 90 },
    { name: '200', lightness: 80 },
    { name: '300', lightness: 70 },
    { name: '400', lightness: 60 },
    { name: '500', lightness: 50 },
    { name: '600', lightness: 40 },
    { name: '700', lightness: 30 },
    { name: '800', lightness: 20 },
    { name: '900', lightness: 10 },
    { name: '950', lightness: 5 },
  ];

  steps.forEach(step => {
    // Add slight variation to hue for depth
    const hueVariation = random.nextFloat(-5, 5);
    const actualHue = (hue + hueVariation + 360) % 360;
    
    // Adjust saturation based on theme
    const baseSat = saturation + (satBoost * 100);
    const satVariation = random.nextFloat(-5, 5);
    const actualSat = Math.max(0, Math.min(100, baseSat + satVariation));
    
    scale[step.name] = hslToHex(actualHue, actualSat, step.lightness);
  });

  return scale;
}

function generateColors(theme, seed) {
  const random = new SeededRandom(seed);
  
  // Base saturation varies by theme
  const baseSaturation = theme.contrastRatio === 'high' ? 80 : 60;
  
  const colors = {
    primary: generateColorScale(theme.primaryHue, baseSaturation, theme, random),
    secondary: generateColorScale(theme.secondaryHue, baseSaturation, theme, random),
    accent: generateColorScale(theme.accentHue, baseSaturation, theme, random),
  };

  // Generate semantic colors
  colors.success = generateColorScale(140, 60, theme, random); // Green
  colors.warning = generateColorScale(40, 80, theme, random);  // Orange
  colors.error = generateColorScale(0, 70, theme, random);     // Red
  colors.info = generateColorScale(210, 60, theme, random);    // Blue

  // Generate neutral/gray scale
  const neutralHue = theme.primaryHue + random.nextFloat(-10, 10);
  colors.neutral = generateColorScale(neutralHue, 10, theme, random);

  return colors;
}

module.exports = {
  generateColors,
  hslToHex,
  hslToRgb,
  rgbToHex,
};
