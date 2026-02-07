#!/usr/bin/env node

const { Command } = require('commander');
const chalk = require('chalk');
const { generateDesignSystem } = require('../lib/generator');
const { listThemes } = require('../lib/themes');
const { generatePreview } = require('../lib/preview');
const { version } = require('../package.json');
const path = require('path');

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
  .option('--theme-file <path>', 'Load theme from a custom JSON file')
  .option('-s, --seed <seed>', 'Seed for deterministic generation', 'hackathon')
  .option('-o, --output <dir>', 'Output directory', './design-system')
  .option('-f, --format <formats...>', 'Output formats (css, json, js, tailwind)', ['css', 'json', 'tailwind'])
  .option('--no-components', 'Skip component token generation')
  .option('--stdout', 'Print design system as JSON to stdout (no file writes)')
  .option('--preview', 'Also generate an HTML preview file')
  .action((options) => {
    const isStdout = options.stdout;

    if (!isStdout) {
      console.log(chalk.cyan.bold('\n🎨 MindCore · Atlas\n'));
      console.log(chalk.gray('Generating design system...\n'));
    }

    try {
      const result = generateDesignSystem(options);

      if (isStdout) {
        // JSON to stdout — no file writes, no decorative output
        console.log(JSON.stringify(result.designSystem, null, 2));
        return;
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

      // Generate preview if requested
      if (options.preview) {
        const previewPath = path.join(result.outputDir, 'preview.html');
        generatePreview(result.designSystem, previewPath);
        console.log(chalk.gray('  -'), chalk.white('preview.html'));

        // Auto-open in browser
        const { exec } = require('child_process');
        const openCmd = process.platform === 'win32' ? 'start' :
                        process.platform === 'darwin' ? 'open' : 'xdg-open';
        exec(`${openCmd} "${previewPath}"`);
      }

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
  .command('preview')
  .description('Generate an HTML preview of a design system')
  .option('-t, --theme <theme>', 'Theme to preview', 'cyberpunk')
  .option('--theme-file <path>', 'Load theme from a custom JSON file')
  .option('-s, --seed <seed>', 'Seed for deterministic generation', 'hackathon')
  .option('-o, --output <path>', 'Output HTML file path', './design-system/preview.html')
  .action((options) => {
    console.log(chalk.cyan.bold('\n🎨 MindCore · Atlas - Preview\n'));

    try {
      // Generate the design system (without writing token files)
      const result = generateDesignSystem({
        ...options,
        stdout: true, // skip file writes
      });

      const previewPath = path.resolve(options.output);
      generatePreview(result.designSystem, previewPath);

      console.log(chalk.green('✓'), 'Preview generated:', chalk.white(previewPath));

      // Auto-open in browser
      const { exec } = require('child_process');
      const openCmd = process.platform === 'win32' ? 'start' :
                      process.platform === 'darwin' ? 'open' : 'xdg-open';
      exec(`${openCmd} "${previewPath}"`);
    } catch (error) {
      console.error(chalk.red('✗'), 'Error generating preview:', error.message);
      process.exit(1);
    }
  });

program
  .command('watch')
  .description('Watch for changes and re-generate design system')
  .option('-c, --config <path>', 'Config file to watch', 'atlas.config.json')
  .option('-o, --output <dir>', 'Output directory', './design-system')
  .action((options) => {
    const fs = require('fs');
    console.log(chalk.cyan.bold('\n🎨 MindCore · Atlas - Watch Mode\n'));
    console.log(chalk.gray(`Watching ${options.config} for changes...\n`));

    const configPath = path.resolve(options.config);

    // Initial generation
    const runGen = () => {
      try {
        let config = {};
        if (fs.existsSync(configPath)) {
          config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        }
        generateDesignSystem({ ...options, ...config });
        console.log(chalk.green(`✓ [${new Date().toLocaleTimeString()}]`), 'Design system updated');
      } catch (e) {
        console.error(chalk.red('✗'), 'Update failed:', e.message);
      }
    };

    runGen();
    fs.watchFile(configPath, (curr, prev) => {
      if (curr.mtime !== prev.mtime) {
        runGen();
      }
    });
  });

program
  .command('themes')
  .description('List available themes/stories')
  .option('--json', 'Output as JSON')
  .action((options) => {
    const themes = listThemes();
    if (options.json) {
      console.log(JSON.stringify(themes, null, 2));
      return;
    }
    console.log(chalk.cyan.bold('\n🎨 Available Themes\n'));
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
