#!/usr/bin/env node

const { Command } = require('commander');
const chalk = require('chalk');
const inquirer = require('inquirer');
const { generateDesignSystem } = require('../lib/generator');
const { listThemes, recommendThemes } = require('../lib/themes');
const { generateSmartTheme } = require('../lib/ml/theme-generator');
const { generateBrandStory } = require('../lib/ml/copy-writer');
const { version } = require('../package.json');

const program = new Command();

program
  .name('atlas')
  .description('MindCore · Atlas: CLI-first design accelerator for hackathons\n\nQuick Start: atlas g -i    (Interactive mode)')
  .version(version);

const fs = require('fs');
const path = require('path');

// Default action when no command specified - show quick help
program.action(() => {
  console.log(chalk.cyan.bold('\n🎨 MindCore · Atlas\n'));
  console.log(chalk.white('Design system generator for hackathons\n'));
  console.log(chalk.gray('Quick Commands:'));
  console.log(chalk.white('  atlas generate -i       ') + chalk.gray('# Interactive mode'));
  console.log(chalk.white('  atlas gen --smart       ') + chalk.gray('# Smart AI Generation mode'));
  console.log(chalk.white('  atlas gen --theme cyberpunk') + chalk.gray('# Generate with specific theme'));
  console.log(chalk.white('  atlas themes            ') + chalk.gray('# List all available themes'));
  console.log(chalk.white('  atlas recommend         ') + chalk.gray('# Get theme recommendations\n'));
  console.log(chalk.gray('Run ') + chalk.cyan('atlas --help') + chalk.gray(' for detailed options\n'));
});

program
  .command('generate')
  .alias('gen')
  .alias('g')
  .description('Generate a complete design system')
  .option('-t, --theme <theme>', 'Theme/story to base the design on')
  .option('-s, --seed <seed>', 'Seed for deterministic generation')
  .option('-o, --output <dir>', 'Output directory', './design-system')
  .option('-i, --interactive', 'Interactive mode with questions')
  .option('--smart', 'Use AI to generate theme and story from description')
  .option('-k, --keywords <text>', 'Keywords/Description for AI generation')
  .action(async (options) => {
    console.log(chalk.cyan.bold('\n🎨 MindCore · Atlas\n'));

    // Smart Mode
    if (options.smart) {
      const inquirer = require('inquirer');
      let description = options.keywords;
      let projectName = options.seed || 'my-hackathon-project';

      if (!description) {
        console.log(chalk.magenta('🧠 Smart Mode Active'));
        const answers = await inquirer.prompt([
          {
            type: 'input',
            name: 'projectName',
            message: 'Project Name:',
            default: projectName,
            when: !options.seed
          },
          {
            type: 'input',
            name: 'description',
            message: 'Describe your project idea (the more detail, the better):',
            validate: input => input.length > 3 ? true : 'Please provide a description.'
          }
        ]);
        description = answers.description;
        if (answers.projectName) projectName = answers.projectName;
        if (!options.seed) options.seed = projectName;
      }

      try {
        const themeKey = await generateSmartTheme(description);
        options.theme = themeKey;
        console.log(chalk.green(`✓ AI selected theme: ${chalk.bold(themeKey)}`));

        const story = await generateBrandStory(projectName, description);
        console.log(chalk.magenta('\n✨ AI Brand Story:'));
        console.log(chalk.italic(`"${story}"`) + '\n');

        // Save story to options for potential usage? 
        // For now, just logging it is a huge UX upgrade.
      } catch (err) {
        console.error(chalk.yellow('⚠ AI Generation failed, falling back to defaults:'), err.message);
      }
    }
    // Interactive mode if no theme specified or --interactive flag (and not smart mode resolved)
    else if (!options.theme || options.interactive) {
      const inquirer = require('inquirer');

      console.log(chalk.gray('Let\'s create your design system!\n'));

      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'projectName',
          message: 'What\'s your project name?',
          default: 'my-app'
        },
        {
          type: 'input',
          name: 'keywords',
          message: 'Describe your project (e.g., "fintech app", "gaming platform"):',
          default: ''
        }
      ]);

      // Get recommendations
      const recommendations = require('../lib/themes').recommendThemes(answers.keywords);

      const themeChoices = recommendations.slice(0, 6).map(rec => ({
        name: `${rec.details.name} - ${rec.details.description}`,
        value: rec.theme
      }));

      const themeAnswer = await inquirer.prompt([{
        type: 'list',
        name: 'theme',
        message: 'Choose a design theme:',
        choices: themeChoices,
        pageSize: 10
      }]);

      const seedAnswer = await inquirer.prompt([{
        type: 'input',
        name: 'seed',
        message: 'Project seed (for deterministic colors, use project name):',
        default: answers.projectName
      }]);

      options.theme = themeAnswer.theme;
      options.seed = seedAnswer.seed;

      console.log('');
    }

    // Set defaults
    if (!options.theme) options.theme = 'cyberpunk';
    if (!options.seed) options.seed = 'hackathon';
    if (!options.format) options.format = ['css', 'json'];

    console.log(chalk.gray('Generating design system...\n'));

    try {
      const result = generateDesignSystem(options);

      // Save copies to global output ../output
      try {
        const globalOutputDir = path.resolve(process.cwd(), '../output');
        if (!fs.existsSync(globalOutputDir)) {
          fs.mkdirSync(globalOutputDir);
        }

        // We know result.filesGenerated contains paths relative to outputDir or absolute?
        // Let's assume they are absolute or relative to CWD.
        // Actually, looking at the code, result.outputDir is the target.

        // Copy the entire output directory content or just the listed files
        // Let's create a subfolder in global output for atlas to avoid collisions
        const globalAtlasDir = path.join(globalOutputDir, 'hackatlas');
        if (!fs.existsSync(globalAtlasDir)) {
          fs.mkdirSync(globalAtlasDir, { recursive: true });
        }

        result.filesGenerated.forEach(file => {
          // file path is likely relative to CWD or absolute.
          // generator usually returns paths relative to CWD or absolute output paths.
          // If we assume `result.outputDir` is where they are.
          const srcPath = path.resolve(process.cwd(), file);
          const fileName = path.basename(file);
          const destPath = path.join(globalAtlasDir, fileName);
          fs.copyFileSync(srcPath, destPath);
        });
        console.log(chalk.green('✓'), `Copied output to ${globalAtlasDir}`);
      } catch (err) {
        console.error(chalk.yellow('⚠'), 'Could not save to global output:', err.message);
      }

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
      console.log(chalk.gray('  Mood: ' + theme.mood));
      console.log(chalk.gray('  Best for: ' + theme.useCase + '\n'));
    });
  });

program
  .command('recommend')
  .description('Get theme recommendations based on your project')
  .option('-k, --keywords <keywords>', 'Keywords describing your project')
  .action(async (options) => {
    console.log(chalk.cyan.bold('\n🎨 MindCore · Atlas Theme Recommender\n'));

    let keywords = options.keywords;

    if (!keywords) {
      const answers = await inquirer.prompt([{
        type: 'input',
        name: 'keywords',
        message: 'Describe your project (e.g., "fintech productivity app" or "blockchain gaming"):',
        default: 'web app'
      }]);
      keywords = answers.keywords;
    }

    const recommendations = recommendThemes(keywords);

    console.log(chalk.green('\n✨ Top Recommendations:\n'));
    recommendations.slice(0, 5).forEach((rec, i) => {
      const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : '  ';
      console.log(`${medal} ${chalk.white.bold(rec.details.name)} ${rec.score > 0 ? chalk.gray(`(score: ${rec.score})`) : ''}`);
      console.log(chalk.gray('     ' + rec.details.description));
      console.log(chalk.gray('     Use: ') + chalk.cyan(`atlas gen --theme ${rec.theme}\n`));
    });
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
