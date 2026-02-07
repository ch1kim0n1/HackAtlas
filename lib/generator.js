/**
 * Main design system generator
 * Orchestrates all subsystems to create a complete design system
 */

const { getTheme, loadCustomTheme } = require('./themes');
const { generateColors } = require('./colors');
const { generateTypography } = require('./typography');
const { generateSpacingAndSizing } = require('./spacing');
const { generateComponentTokens } = require('./components');
const { writeOutputFiles } = require('./output');

function generateDesignSystem(options) {
  const {
    theme: themeName = 'cyberpunk',
    themeFile,
    seed = 'hackathon',
    output: outputDir = './design-system',
    format: formats = ['css', 'json'],
    components: includeComponents = true,
    stdout: stdoutMode = false,
  } = options;

  // Get theme configuration (custom file takes priority)
  const theme = themeFile ? loadCustomTheme(themeFile) : getTheme(themeName);
  
  // Generate all subsystems
  const colors = generateColors(theme, seed);
  const typography = generateTypography(theme, seed);
  const spacing = generateSpacingAndSizing(theme, seed);
  
  // Build complete design system
  const designSystem = {
    meta: {
      generator: 'MindCore · Atlas',
      version: '1.0.0',
      generated: new Date().toISOString(),
    },
    theme: themeName,
    seed: seed,
    colors,
    typography,
    spacing,
  };
  
  // Generate component tokens if requested
  if (includeComponents) {
    designSystem.components = generateComponentTokens(colors, typography, spacing, theme);
  }
  
  // Stdout mode: print JSON and skip file writing
  if (stdoutMode) {
    return {
      designSystem,
      outputDir,
      theme: themeFile ? theme.name : themeName,
      seed,
      filesGenerated: [],
    };
  }

  // Write output files
  const filesGenerated = writeOutputFiles(
    designSystem,
    outputDir,
    formats,
    includeComponents
  );

  return {
    designSystem,
    outputDir,
    theme: themeFile ? theme.name : themeName,
    seed,
    filesGenerated,
  };
}

module.exports = {
  generateDesignSystem,
};
