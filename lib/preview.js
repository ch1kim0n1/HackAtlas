/**
 * Interactive Design System Preview Generator
 */

const fs = require('fs');
const path = require('path');

function generatePreview(designSystem, outputDir) {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MindCore · Atlas Design System</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = ${JSON.stringify(require('./output').generateTailwindConfig(designSystem))}
    </script>
    <style>
        body { font-family: 'Inter', sans-serif; background-color: #0f172a; color: #f8fafc; }
        .swatch { transition: transform 0.2s; cursor: pointer; }
        .swatch:hover { transform: scale(1.05); }
        .toast {
            position: fixed; bottom: 20px; right: 20px;
            background: #22c55e; color: white; padding: 10px 20px;
            border-radius: 8px; transform: translateY(100px);
            transition: transform 0.3s;
        }
        .toast.show { transform: translateY(0); }
    </style>
</head>
<body class="p-8">
    <div id="toast" class="toast">Copied to clipboard!</div>
    
    <header class="mb-12 border-b border-gray-700 pb-8">
        <h1 class="text-4xl font-bold mb-2">MindCore · Atlas</h1>
        <p class="text-gray-400">Design System: <span class="text-primary-400">${designSystem.theme}</span></p>
    </header>

    <main class="max-w-7xl mx-auto space-y-16">
        
        <!-- Colors -->
        <section>
            <h2 class="text-2xl font-bold mb-6 flex items-center">
                <span class="bg-primary-500 w-8 h-8 rounded-lg mr-3"></span>
                Color Palette
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                ${Object.entries(designSystem.colors).map(([colorName, shades]) => `
                <div class="bg-gray-800 rounded-xl p-4 border border-gray-700">
                    <h3 class="capitalize font-bold mb-4 text-gray-300">${colorName}</h3>
                    <div class="space-y-2">
                        ${Object.entries(shades).map(([shade, value]) => `
                        <div class="flex items-center gap-3 group cursor-pointer" 
                             onclick="copyClass('bg-${colorName}-${shade}')">
                            <div class="swatch w-12 h-12 rounded-lg shadow-lg" style="background-color: ${value}"></div>
                            <div class="flex-1">
                                <div class="text-sm font-mono text-gray-400 group-hover:text-white transition-colors">
                                    ${shade}
                                </div>
                                <div class="text-xs text-gray-600 font-mono">${value}</div>
                            </div>
                            <code class="text-xs text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                bg-${colorName}-${shade}
                            </code>
                        </div>
                        `).join('')}
                    </div>
                </div>
                `).join('')}
            </div>
        </section>

        <!-- Typography -->
        <section>
            <h2 class="text-2xl font-bold mb-6">Typography</h2>
            <div class="bg-gray-800 rounded-xl p-8 border border-gray-700 space-y-8">
                <div>
                    <h1 class="text-6xl font-bold mb-4 text-primary-500">Heading 1</h1>
                    <h2 class="text-5xl font-bold mb-4 text-secondary-500">Heading 2</h2>
                    <h3 class="text-4xl font-bold mb-4">Heading 3</h3>
                    <h4 class="text-3xl font-bold mb-4">Heading 4</h4>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <p class="text-xl mb-4 text-gray-300">Body Large</p>
                        <p class="text-gray-400">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                    </div>
                    <div>
                        <p class="text-base mb-4 text-gray-300">Body Regular</p>
                        <p class="text-gray-400 text-sm">
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                            nisi ut aliquip ex ea commodo consequat.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Components -->
        <section>
            <h2 class="text-2xl font-bold mb-6">Components</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <!-- Buttons -->
                <div class="bg-gray-800 rounded-xl p-8 border border-gray-700">
                    <h3 class="text-lg font-bold mb-6 text-gray-400">Buttons</h3>
                    <div class="flex flex-wrap gap-4">
                        <button class="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-lg transition-colors">
                            Primary Action
                        </button>
                        <button class="bg-secondary-500 hover:bg-secondary-600 text-white px-6 py-2 rounded-lg transition-colors">
                            Secondary Action
                        </button>
                        <button class="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors">
                            Cancel
                        </button>
                    </div>
                </div>

                <!-- Cards -->
                <div class="bg-gray-800 rounded-xl p-8 border border-gray-700">
                    <h3 class="text-lg font-bold mb-6 text-gray-400">Card</h3>
                    <div class="bg-gray-900 rounded-lg p-6 border border-gray-700 shadow-xl">
                        <div class="w-12 h-12 bg-primary-500/20 text-primary-500 rounded-lg flex items-center justify-center mb-4 text-2xl">
                            🚀
                        </div>
                        <h4 class="text-xl font-bold mb-2">Feature Card</h4>
                        <p class="text-gray-400 mb-4">
                            This is how a standard card component looks with your generated tokens.
                        </p>
                        <a href="#" class="text-primary-400 hover:text-primary-300 font-medium">Learn more →</a>
                    </div>
                </div>
            </div>
        </section>

    </main>

    <script>
        function copyClass(text) {
            navigator.clipboard.writeText(text);
            const toast = document.getElementById('toast');
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 2000);
        }
    </script>
</body>
</html>`;

  fs.writeFileSync(path.join(outputDir, 'preview.html'), html);
  console.log('✨ Preview generated at: ' + path.join(outputDir, 'preview.html'));
}

module.exports = { generatePreview };
