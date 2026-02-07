/**
 * Generates a design theme name based on a text description.
 * @param {string} description - The user's description of their project/vibe.
 * @returns {Promise<string>} - The key of the matching theme.
 */
const themeGenerator = {
    async suggestTheme(description) {
        try {
            console.log('🔮 Consulting the oracle (loading ML model)...');
            console.log('  - Loading AI classification model...');

            const { pipeline } = await import('@xenova/transformers');
            // We'll use a zero-shot classification model to map the description to a "vibe"
            const classifier = await pipeline('zero-shot-classification', 'Xenova/mobilebert-uncased-mnli');

            const vibeMap = {
                'cyberpunk neon high-tech': 'cyberpunk',
                'minimalist clean corporate white': 'minimal',
                'retro pixel-art nostalgic 8-bit': 'retrowave',
                'nature organic green sustainability': 'nature',
                'playful colorful vibrant fun': 'pastel',
                'dark luxury elegant premium': 'neonoir',
                'utilitarian brutalist raw industrial': 'industrial',
                'warm energetic sunset social': 'sunset',
                'cool crisp medical enterprise': 'arctic',
                'professional trustworthy business': 'corporate'
            };

            const vibes = Object.keys(vibeMap);

            const output = await classifier(description, vibes);
            const bestVibe = output.labels[0];

            console.log(`✨ Detected vibe: ${bestVibe} (Confidence: ${Math.round(output.scores[0] * 100)}%)`);

            return vibeMap[bestVibe] || 'cyberpunk';
        } catch (error) {
            console.error('⚠ AI Theme Detection failed:', error.message);
            return 'cyberpunk'; // Fallback
        }
    }
};

module.exports = themeGenerator;
