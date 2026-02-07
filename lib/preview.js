/**
 * HTML preview generator for design system tokens
 * Creates a self-contained HTML file showing all generated tokens visually
 */

const fs = require('fs');
const path = require('path');

function generatePreview(designSystem, outputPath) {
  const { colors, typography, spacing, components } = designSystem;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${designSystem.theme || 'Design System'} - Preview</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: ${typography.fonts ? typography.fonts.primary : '-apple-system, BlinkMacSystemFont, sans-serif'};
    background: ${colors.neutral ? colors.neutral['50'] : '#f9fafb'};
    color: ${colors.neutral ? colors.neutral['900'] : '#111827'};
    padding: 2rem;
    line-height: 1.6;
  }
  h1 { font-size: 2rem; margin-bottom: 0.5rem; }
  h2 { font-size: 1.5rem; margin: 2rem 0 1rem; border-bottom: 2px solid ${colors.primary ? colors.primary['500'] : '#6366f1'}; padding-bottom: 0.5rem; }
  h3 { font-size: 1.1rem; margin: 1rem 0 0.5rem; }
  .meta { color: #6b7280; margin-bottom: 2rem; }
  .section { margin-bottom: 2rem; }

  /* Color swatches */
  .color-group { margin-bottom: 1.5rem; }
  .color-group-label { font-weight: 600; margin-bottom: 0.5rem; text-transform: capitalize; }
  .swatches { display: flex; flex-wrap: wrap; gap: 4px; }
  .swatch {
    width: 60px; height: 60px; border-radius: 8px;
    display: flex; align-items: flex-end; justify-content: center;
    font-size: 0.65rem; padding: 4px; color: white; text-shadow: 0 1px 2px rgba(0,0,0,0.5);
    border: 1px solid rgba(0,0,0,0.1);
  }

  /* Typography scale */
  .type-sample { margin-bottom: 0.75rem; display: flex; align-items: baseline; gap: 1rem; }
  .type-label { min-width: 80px; font-size: 0.75rem; color: #6b7280; }

  /* Spacing scale */
  .spacing-bar { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.25rem; }
  .spacing-label { min-width: 60px; font-size: 0.75rem; color: #6b7280; text-align: right; }
  .spacing-visual { height: 16px; background: ${colors.primary ? colors.primary['400'] : '#818cf8'}; border-radius: 4px; }

  /* Components */
  .component-row { display: flex; flex-wrap: wrap; gap: 1rem; margin-bottom: 1rem; align-items: center; }
  .btn { padding: 10px 24px; border-radius: 8px; font-weight: 600; font-size: 0.95rem; border: 2px solid transparent; cursor: pointer; transition: 0.15s; }
  .btn-primary { background: ${colors.primary ? colors.primary['500'] : '#6366f1'}; color: white; }
  .btn-secondary { background: ${colors.neutral ? colors.neutral['200'] : '#e5e7eb'}; color: ${colors.neutral ? colors.neutral['800'] : '#1f2937'}; }
  .btn-outline { background: transparent; border-color: ${colors.primary ? colors.primary['500'] : '#6366f1'}; color: ${colors.primary ? colors.primary['500'] : '#6366f1'}; }
  .btn-ghost { background: transparent; color: ${colors.primary ? colors.primary['500'] : '#6366f1'}; }
  .input-demo { padding: 10px 14px; border: 2px solid ${colors.neutral ? colors.neutral['300'] : '#d1d5db'}; border-radius: 8px; font-size: 0.95rem; width: 260px; }
  .input-demo:focus { outline: none; border-color: ${colors.primary ? colors.primary['500'] : '#6366f1'}; }
  .card-demo { background: white; border-radius: 12px; padding: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); max-width: 300px; }
  .card-demo h4 { margin-bottom: 0.5rem; }
  .card-demo p { font-size: 0.9rem; color: #6b7280; }
  .badge { display: inline-block; padding: 2px 10px; border-radius: 12px; font-size: 0.8rem; font-weight: 600; background: ${colors.primary ? colors.primary['100'] : '#e0e7ff'}; color: ${colors.primary ? colors.primary['700'] : '#4338ca'}; }

  /* Alert */
  .alert-demo { padding: 12px 16px; border-radius: 8px; font-size: 0.9rem; margin-bottom: 0.5rem; }
  .alert-info { background: ${colors.info ? colors.info['50'] : '#eff6ff'}; border: 1px solid ${colors.info ? colors.info['200'] : '#bfdbfe'}; color: ${colors.info ? colors.info['900'] : '#1e3a5f'}; }
  .alert-success { background: ${colors.success ? colors.success['50'] : '#f0fdf4'}; border: 1px solid ${colors.success ? colors.success['200'] : '#bbf7d0'}; color: ${colors.success ? colors.success['900'] : '#14532d'}; }
  .alert-warning { background: ${colors.warning ? colors.warning['50'] : '#fffbeb'}; border: 1px solid ${colors.warning ? colors.warning['200'] : '#fde68a'}; color: ${colors.warning ? colors.warning['900'] : '#78350f'}; }
  .alert-error { background: ${colors.error ? colors.error['50'] : '#fef2f2'}; border: 1px solid ${colors.error ? colors.error['200'] : '#fecaca'}; color: ${colors.error ? colors.error['900'] : '#7f1d1d'}; }

  /* Tooltip */
  .tooltip-wrap { position: relative; display: inline-block; }
  .tooltip-demo { position: absolute; bottom: 110%; left: 50%; transform: translateX(-50%); background: ${colors.neutral ? colors.neutral['900'] : '#111'}; color: ${colors.neutral ? colors.neutral['50'] : '#fff'}; padding: 4px 10px; border-radius: 6px; font-size: 0.78rem; white-space: nowrap; pointer-events: none; }
  .tooltip-demo::after { content:''; position:absolute; top:100%; left:50%; transform:translateX(-50%); border:5px solid transparent; border-top-color:${colors.neutral ? colors.neutral['900'] : '#111'}; }

  /* Modal (inline preview) */
  .modal-demo { background: white; border-radius: 12px; padding: 1.5rem; box-shadow: 0 8px 30px rgba(0,0,0,0.15); max-width: 340px; border: 1px solid ${colors.neutral ? colors.neutral['200'] : '#e5e7eb'}; }
  .modal-demo-header { font-weight: 700; font-size: 1.1rem; border-bottom: 1px solid ${colors.neutral ? colors.neutral['200'] : '#e5e7eb'}; padding-bottom: 0.75rem; margin-bottom: 0.75rem; }
  .modal-demo-body { font-size: 0.9rem; color: #6b7280; margin-bottom: 0.75rem; }
  .modal-demo-footer { border-top: 1px solid ${colors.neutral ? colors.neutral['200'] : '#e5e7eb'}; padding-top: 0.75rem; display: flex; gap: 0.5rem; justify-content: flex-end; }

  /* Table */
  .table-demo { border-collapse: collapse; width: 100%; max-width: 500px; border-radius: 8px; overflow: hidden; border: 1px solid ${colors.neutral ? colors.neutral['200'] : '#e5e7eb'}; }
  .table-demo th { background: ${colors.neutral ? colors.neutral['100'] : '#f3f4f6'}; color: ${colors.neutral ? colors.neutral['700'] : '#374151'}; font-size: 0.8rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; padding: 10px 14px; text-align: left; border-bottom: 2px solid ${colors.neutral ? colors.neutral['200'] : '#e5e7eb'}; }
  .table-demo td { padding: 10px 14px; font-size: 0.9rem; border-bottom: 1px solid ${colors.neutral ? colors.neutral['100'] : '#f3f4f6'}; }
  .table-demo tr:hover td { background: ${colors.primary ? colors.primary['50'] : '#eef2ff'}; }
</style>
</head>
<body>
<h1>${designSystem.theme || 'Design System'} Preview</h1>
<p class="meta">Generated by MindCore Atlas | Seed: ${designSystem.seed || 'default'} | ${new Date().toLocaleDateString()}</p>

<h2>Colors</h2>
<div class="section">
${generateColorSwatches(colors)}
</div>

<h2>Typography</h2>
<div class="section">
${generateTypographyPreview(typography)}
</div>

<h2>Spacing Scale</h2>
<div class="section">
${generateSpacingPreview(spacing)}
</div>

<h2>Components</h2>
<div class="section">
<h3>Buttons</h3>
<div class="component-row">
  <button class="btn btn-primary">Primary</button>
  <button class="btn btn-secondary">Secondary</button>
  <button class="btn btn-outline">Outline</button>
  <button class="btn btn-ghost">Ghost</button>
</div>

<h3>Input</h3>
<div class="component-row">
  <input class="input-demo" type="text" placeholder="Type something..." />
</div>

<h3>Card</h3>
<div class="component-row">
  <div class="card-demo">
    <h4>Card Title</h4>
    <p>A sample card component using the generated design tokens.</p>
    <br/>
    <span class="badge">Badge</span>
  </div>
</div>

<h3>Alerts</h3>
<div style="max-width:500px">
  <div class="alert-demo alert-info">ℹ️ This is an informational alert message.</div>
  <div class="alert-demo alert-success">✓ Operation completed successfully.</div>
  <div class="alert-demo alert-warning">⚠ Please review before proceeding.</div>
  <div class="alert-demo alert-error">✗ Something went wrong. Please try again.</div>
</div>

<h3>Tooltip</h3>
<div class="component-row">
  <div class="tooltip-wrap">
    <button class="btn btn-primary">Hover me</button>
    <div class="tooltip-demo">Tooltip text</div>
  </div>
</div>

<h3>Modal</h3>
<div class="component-row">
  <div class="modal-demo">
    <div class="modal-demo-header">Confirm Action</div>
    <div class="modal-demo-body">Are you sure you want to proceed? This action cannot be undone.</div>
    <div class="modal-demo-footer">
      <button class="btn btn-ghost" style="padding:6px 16px;font-size:0.85rem">Cancel</button>
      <button class="btn btn-primary" style="padding:6px 16px;font-size:0.85rem">Confirm</button>
    </div>
  </div>
</div>

<h3>Table</h3>
<table class="table-demo">
  <thead><tr><th>Name</th><th>Role</th><th>Status</th></tr></thead>
  <tbody>
    <tr><td>Alice</td><td>Engineer</td><td><span class="badge">Active</span></td></tr>
    <tr><td>Bob</td><td>Designer</td><td><span class="badge">Active</span></td></tr>
    <tr><td>Charlie</td><td>Manager</td><td><span class="badge" style="background:${colors.warning ? colors.warning['100'] : '#fef3c7'};color:${colors.warning ? colors.warning['800'] : '#92400e'}">Away</span></td></tr>
  </tbody>
</table>
</div>

<script>
document.querySelectorAll('.input-demo').forEach(el => {
  el.addEventListener('focus', () => el.style.borderColor = '${colors.primary ? colors.primary['500'] : '#6366f1'}');
  el.addEventListener('blur', () => el.style.borderColor = '${colors.neutral ? colors.neutral['300'] : '#d1d5db'}');
});
</script>
</body>
</html>`;

  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(outputPath, html, 'utf8');
  return outputPath;
}

function generateColorSwatches(colors) {
  let html = '';
  const colorGroups = ['primary', 'secondary', 'accent', 'neutral', 'error', 'success', 'warning'];

  for (const group of colorGroups) {
    if (!colors[group]) continue;
    html += `<div class="color-group">
  <div class="color-group-label">${group}</div>
  <div class="swatches">`;

    const shades = colors[group];
    if (typeof shades === 'object') {
      for (const [shade, value] of Object.entries(shades)) {
        html += `\n    <div class="swatch" style="background:${value}">${shade}</div>`;
      }
    }
    html += `\n  </div>\n</div>\n`;
  }
  return html;
}

function generateTypographyPreview(typography) {
  let html = '';
  const sizes = typography.fontSize || {};
  const entries = Object.entries(sizes);

  if (entries.length === 0) return '<p>No typography tokens generated.</p>';

  for (const [name, size] of entries) {
    const px = typeof size === 'number' ? `${size}px` : size;
    html += `<div class="type-sample">
  <span class="type-label">${name} (${px})</span>
  <span style="font-size:${px}">The quick brown fox</span>
</div>\n`;
  }
  return html;
}

function generateSpacingPreview(spacing) {
  let html = '';
  const scale = spacing.scale || spacing;

  if (typeof scale !== 'object') return '<p>No spacing tokens generated.</p>';

  const entries = Object.entries(scale).slice(0, 15); // limit for preview
  for (const [name, value] of entries) {
    const numValue = parseFloat(value) || 0;
    const widthPx = numValue * 16; // convert rem to px for visual
    html += `<div class="spacing-bar">
  <span class="spacing-label">${name}: ${value}</span>
  <div class="spacing-visual" style="width:${Math.min(widthPx, 600)}px"></div>
</div>\n`;
  }
  return html;
}

module.exports = { generatePreview };
