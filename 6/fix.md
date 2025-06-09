# Enigma Machine Implementation Bugs and Fixes

## Bug 1: Incorrect Rotor Stepping Mechanism
**Original Code:**
```javascript
stepRotors() {
  if (this.rotors[2].atNotch()) this.rotors[1].step();
  if (this.rotors[1].atNotch()) this.rotors[0].step();
  this.rotors[2].step();
}
```

**Fixed Code:**
```javascript
stepRotors() {
  // Double step mechanism
  const middleRotorAtNotch = this.rotors[1].atNotch();
  const rightRotorAtNotch = this.rotors[2].atNotch();
  
  if (middleRotorAtNotch) {
    this.rotors[0].step();
    this.rotors[1].step();
  } else if (rightRotorAtNotch) {
    this.rotors[1].step();
  }
  this.rotors[2].step();
}
```

**Explanation:** The original implementation had an incorrect rotor stepping mechanism. The Enigma machine uses a "double step" mechanism where the middle rotor steps when either the right rotor is at its notch position OR when the middle rotor itself is at its notch position. The fixed version properly implements this mechanism by checking both conditions and stepping the rotors accordingly.

## Bug 2: Incorrect Rotor Forward/Backward Pass
**Original Code:**
```javascript
forward(c) {
  const idx = mod(alphabet.indexOf(c) + this.position - this.ringSetting, 26);
  return this.wiring[idx];
}

backward(c) {
  const idx = this.wiring.indexOf(c);
  return alphabet[mod(idx - this.position + this.ringSetting, 26)];
}
```

**Fixed Code:**
```javascript
forward(c) {
  const idx = mod(alphabet.indexOf(c) + this.position - this.ringSetting, 26);
  const out = this.wiring[idx];
  return alphabet[mod(alphabet.indexOf(out) - this.position + this.ringSetting, 26)];
}

backward(c) {
  const idx = mod(alphabet.indexOf(c) + this.position - this.ringSetting, 26);
  const out = alphabet[this.wiring.indexOf(alphabet[mod(idx, 26)])];
  return alphabet[mod(alphabet.indexOf(out) - this.position + this.ringSetting, 26)];
}
```

**Explanation:** The original implementation had incorrect rotor transformations. The fixed version properly handles the rotor position and ring setting adjustments in both forward and backward passes. The key changes are:
1. In forward pass: After getting the output from the wiring, we need to adjust for the rotor position and ring setting
2. In backward pass: We need to properly handle the position and ring setting adjustments when looking up the character in the wiring

## Bug 3: Missing Plugboard Application
**Original Code:**
```javascript
encryptChar(c) {
  if (!alphabet.includes(c)) return c;
  this.stepRotors();
  c = plugboardSwap(c, this.plugboardPairs);
  // ... rotor processing ...
  return c;
}
```

**Fixed Code:**
```javascript
encryptChar(c) {
  if (!alphabet.includes(c)) return c;
  
  this.stepRotors();
  
  // Plugboard
  c = plugboardSwap(c, this.plugboardPairs);
  
  // Forward through rotors
  for (let i = this.rotors.length - 1; i >= 0; i--) {
    c = this.rotors[i].forward(c);
  }
  
  // Reflector
  c = REFLECTOR[alphabet.indexOf(c)];
  
  // Backward through rotors
  for (let i = 0; i < this.rotors.length; i++) {
    c = this.rotors[i].backward(c);
  }
  
  // Plugboard again
  c = plugboardSwap(c, this.plugboardPairs);
  
  return c;
}
```

**Explanation:** The original implementation was missing the second plugboard application. In the Enigma machine, the plugboard is applied both before and after the rotor processing. The fixed version properly applies the plugboard transformation at both the beginning and end of the encryption process.

These fixes make the implementation more accurate to the historical Enigma machine's behavior, particularly in terms of rotor stepping, character transformation through the rotors, and plugboard application. 