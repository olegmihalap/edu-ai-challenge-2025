const assert = require('assert');
const { Enigma } = require('./enigma');

// Test case 1: Basic encryption and decryption
function testBasicEncryption() {
  const enigma = new Enigma(
    [0, 1, 2], // Rotor IDs
    [0, 0, 0], // Rotor positions
    [0, 0, 0], // Ring settings
    [] // No plugboard pairs
  );
  
  const message = "HELLO";
  const encrypted = enigma.process(message);
  // Новый экземпляр для расшифровки
  const enigma2 = new Enigma(
    [0, 1, 2],
    [0, 0, 0],
    [0, 0, 0],
    []
  );
  const decrypted = enigma2.process(encrypted);
  
  assert.strictEqual(decrypted, message, "Decryption should return original message");
}

// Test case 2: With plugboard
function testWithPlugboard() {
  const plugboard = [['A', 'B'], ['C', 'D']];
  const enigma = new Enigma(
    [0, 1, 2],
    [0, 0, 0],
    [0, 0, 0],
    plugboard
  );
  
  const message = "HELLO";
  const encrypted = enigma.process(message);
  const enigma2 = new Enigma(
    [0, 1, 2],
    [0, 0, 0],
    [0, 0, 0],
    plugboard
  );
  const decrypted = enigma2.process(encrypted);
  
  assert.strictEqual(decrypted, message, "Decryption with plugboard should return original message");
}

// Test case 3: Different rotor positions
function testDifferentPositions() {
  const positions = [1, 2, 3];
  const enigma = new Enigma(
    [0, 1, 2],
    positions,
    [0, 0, 0],
    []
  );
  
  const message = "HELLO";
  const encrypted = enigma.process(message);
  const enigma2 = new Enigma(
    [0, 1, 2],
    positions,
    [0, 0, 0],
    []
  );
  const decrypted = enigma2.process(encrypted);
  
  assert.strictEqual(decrypted, message, "Decryption with different positions should return original message");
}

// Test case 4: Different ring settings
function testRingSettings() {
  const rings = [1, 2, 3];
  const enigma = new Enigma(
    [0, 1, 2],
    [0, 0, 0],
    rings,
    []
  );
  
  const message = "HELLO";
  const encrypted = enigma.process(message);
  const enigma2 = new Enigma(
    [0, 1, 2],
    [0, 0, 0],
    rings,
    []
  );
  const decrypted = enigma2.process(encrypted);
  
  assert.strictEqual(decrypted, message, "Decryption with ring settings should return original message");
}

// Test case 5: Different rotor combinations
function testRotorCombinations() {
  const rotors = [2, 1, 0];
  const enigma = new Enigma(
    rotors, // Different rotor order
    [0, 0, 0],
    [0, 0, 0],
    []
  );
  
  const message = "HELLO";
  const encrypted = enigma.process(message);
  const enigma2 = new Enigma(
    rotors,
    [0, 0, 0],
    [0, 0, 0],
    []
  );
  const decrypted = enigma2.process(encrypted);
  
  assert.strictEqual(decrypted, message, "Decryption with different rotor order should return original message");
}

// Test case 6: Long message with spaces and special characters
function testLongMessage() {
  const enigma = new Enigma(
    [0, 1, 2],
    [0, 0, 0],
    [0, 0, 0],
    []
  );
  
  const message = "HELLO WORLD! 123";
  const encrypted = enigma.process(message);
  const enigma2 = new Enigma(
    [0, 1, 2],
    [0, 0, 0],
    [0, 0, 0],
    []
  );
  const decrypted = enigma2.process(encrypted);
  
  assert.strictEqual(decrypted, message, "Decryption of long message should return original message");
}

// Test case 7: Double stepping mechanism
function testDoubleStepping() {
  const positions = [0, 16, 16]; // Positions that will trigger double stepping
  const enigma = new Enigma(
    [0, 1, 2],
    positions,
    [0, 0, 0],
    []
  );
  
  const message = "A".repeat(10); // Test multiple steps
  const encrypted = enigma.process(message);
  const enigma2 = new Enigma(
    [0, 1, 2],
    positions,
    [0, 0, 0],
    []
  );
  const decrypted = enigma2.process(encrypted);
  
  assert.strictEqual(decrypted, message, "Decryption with double stepping should return original message");
}

// Test case 8: Multiple plugboard pairs
function testMultiplePlugboardPairs() {
  const plugboard = [['A', 'B'], ['C', 'D'], ['E', 'F'], ['G', 'H'], ['I', 'J']];
  const enigma = new Enigma(
    [0, 1, 2],
    [0, 0, 0],
    [0, 0, 0],
    plugboard
  );
  
  const message = "HELLO";
  const encrypted = enigma.process(message);
  const enigma2 = new Enigma(
    [0, 1, 2],
    [0, 0, 0],
    [0, 0, 0],
    plugboard
  );
  const decrypted = enigma2.process(encrypted);
  
  assert.strictEqual(decrypted, message, "Decryption with multiple plugboard pairs should return original message");
}

// Test case 9: Case sensitivity
function testCaseSensitivity() {
  const enigma = new Enigma(
    [0, 1, 2],
    [0, 0, 0],
    [0, 0, 0],
    []
  );
  
  const message = "HeLlO";
  const encrypted = enigma.process(message);
  const enigma2 = new Enigma(
    [0, 1, 2],
    [0, 0, 0],
    [0, 0, 0],
    []
  );
  const decrypted = enigma2.process(encrypted);
  
  assert.strictEqual(decrypted, message.toUpperCase(), "Decryption should handle case sensitivity correctly");
}

// Test case 10: Non-alphabetic characters
function testNonAlphabetic() {
  const enigma = new Enigma(
    [0, 1, 2],
    [0, 0, 0],
    [0, 0, 0],
    []
  );
  
  const message = "HELLO! 123";
  const encrypted = enigma.process(message);
  const enigma2 = new Enigma(
    [0, 1, 2],
    [0, 0, 0],
    [0, 0, 0],
    []
  );
  const decrypted = enigma2.process(encrypted);
  
  assert.strictEqual(decrypted, message.toUpperCase(), "Decryption should preserve non-alphabetic characters");
}

// Run all tests
console.log("Running Enigma machine tests...");

try {
  testBasicEncryption();
  testWithPlugboard();
  testDifferentPositions();
  testRingSettings();
  testRotorCombinations();
  testLongMessage();
  testDoubleStepping();
  testMultiplePlugboardPairs();
  testCaseSensitivity();
  testNonAlphabetic();
  
  console.log("All tests passed successfully!");
} catch (error) {
  console.error("Test failed:", error.message);
  process.exit(1);
} 