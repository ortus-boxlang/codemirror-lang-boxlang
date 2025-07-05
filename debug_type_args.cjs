const { BoxLangLanguage } = require('./dist/boxlang.js');

const code = `class Box <T> {
  private T theObject;
  public Box( T arg) { theObject = arg; }
  // more code
}`;

console.log('Testing type arguments:');
console.log('Code:', code);
console.log('Length:', code.length);

// Character position analysis
console.log('\nCharacter positions:');
for (let i = 30; i < Math.min(code.length, 50); i++) {
  console.log(`${i}: '${code[i]}'`);
}

try {
  const tree = BoxLangLanguage.parser.parse(code);
  console.log('\nParsed successfully!');
  console.log('Tree:', tree.toString());
} catch (error) {
  console.error('\nParse error:', error.message);
  console.log(`Character at position 37: '${code[37]}'`);
  console.log(`Context around position 37: "${code.slice(33, 43)}"`);
}
