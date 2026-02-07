#!/usr/bin/env node

const { Command } = require('commander');
const chalk = require('chalk');
const { generateDesignSystem } = require('../lib/generator');
const { listThemes } = require('../lib/themes');
const { version } = require('../package.json');

const program = new Command();

program
  .name('atlas')
  .description('MindCore · Atlas: CLI-first design accelerator for hackathons')
  .version(version);

program
  .command('generate')
  .alias('gen')
  .description('Generate a complete design system')
  .option('-t, --theme <theme>', 'Theme/story to base the design on', 'cyberpunk')
  .option('-s, --seed <seed>', 'Seed for deterministic generation', 'hackathon')
  .option('-o, --output <dir>', 'Output directory', './design-system')
  .option('-f, --format <formats...>', 'Output formats (css, json, js)', ['css', 'json'])
  .option('--no-components', 'Skip component token generation')
  .action((options) => {
    console.log(chalk.cyan.bold('\n🎨 MindCore · Atlas\n'));
    console.log(chalk.gray('Generating design system...\n'));
    
    try {
      const result = generateDesignSystem(options);
      
      console.log(chalk.green('✓'), 'Design system generated successfully!');
      console.log(chalk.gray('  Output directory:'), chalk.white(result.outputDir));
      console.log(chalk.gray('  Theme:'), chalk.white(result.theme));
      console.log(chalk.gray('  Seed:'), chalk.white(result.seed));
      console.log(chalk.gray('  Files generated:'), chalk.white(result.filesGenerated.length));
      
      console.log(chalk.cyan('\n📦 Generated files:'));
      result.filesGenerated.forEach(file => {
        console.log(chalk.gray('  -'), chalk.white(file));
      });
      
      console.log(chalk.yellow('\n💡 Next steps:'));
      console.log(chalk.gray('  1. Import the generated tokens into your project'));
      console.log(chalk.gray('  2. Use the design system consistently across components'));
      console.log(chalk.gray('  3. Re-run with the same seed to maintain coherence\n'));
    } catch (error) {
      console.error(chalk.red('✗'), 'Error generating design system:', error.message);
      process.exit(1);
    }
  });

program
  .command('themes')
  .description('List available themes/stories')
  .action(() => {
    console.log(chalk.cyan.bold('\n🎨 Available Themes\n'));
    
    const themes = listThemes();
    themes.forEach(theme => {
      console.log(chalk.white.bold(theme.name));
      console.log(chalk.gray('  ' + theme.description));
      console.log(chalk.gray('  Mood: ' + theme.mood + '\n'));
    });
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
