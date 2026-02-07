/**
 * Seeded random number generator for deterministic output
 * Using a simple LCG (Linear Congruential Generator) algorithm
 */

class SeededRandom {
  constructor(seed) {
    // Convert string seed to number if needed
    if (typeof seed === 'string') {
      this.seed = this.hashString(seed);
    } else {
      this.seed = seed;
    }
    this.current = this.seed;
  }

  hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }

  // Generate next random number between 0 and 1
  next() {
    // LCG parameters (from Numerical Recipes)
    const a = 1664525;
    const c = 1013904223;
    const m = Math.pow(2, 32);
    
    this.current = (a * this.current + c) % m;
    return this.current / m;
  }

  // Generate random integer between min and max (inclusive)
  nextInt(min, max) {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }

  // Generate random float between min and max
  nextFloat(min, max) {
    return this.next() * (max - min) + min;
  }

  // Choose random item from array
  choice(array) {
    return array[this.nextInt(0, array.length - 1)];
  }

  // Shuffle array deterministically
  shuffle(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = this.nextInt(0, i);
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
}

module.exports = SeededRandom;
