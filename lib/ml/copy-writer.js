/**
 * Generates a brand story/tagline.
 * @param {string} name - Project name.
 * @param {string} description - Project description.
 * @returns {Promise<string>} - A short brand story.
 */
const copyWriter = {
  async generateStory(name, description) {
    try {
      console.log('✍️  Summoning the muse (loading ML model)...');
      console.log('  - Loading AI generation model...');
      const { pipeline } = await import('@xenova/transformers');

      // LaMini-Flan-T5 is great for instruction following and small enough for local execution
      const generator = await pipeline('text2text-generation', 'Xenova/LaMini-Flan-T5-783M');

      const prompt = `Write a short, exciting, 2-sentence marketing hook for a hackathon project called "${name}". 
  Project Description: ${description}
  Tone: Innovative, Bold, Impactful.
  Hook:`;

      const output = await generator(prompt, {
        max_new_tokens: 60,
        temperature: 0.7,
        repetition_penalty: 1.2
      });

      return output[0].generated_text;
    } catch (error) {
      console.error('⚠ AI Story Generation failed:', error.message);
      return `The ultimate solution for ${description}. Built with ${name}.`;
    }
  }
};

module.exports = copyWriter;
