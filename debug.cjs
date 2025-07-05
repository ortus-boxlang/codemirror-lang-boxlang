const { BoxLangLanguage } = require('./dist/boxlang.js');

// Test cases for debugging
const testCases = {
  'safe-nav': `obj?.property;
result?.value?.nested;`,
  
  'spread': `...array;
sum(...numbers);
[1, 2, ...rest];`,
  
  'function-defaults': `function greet(string name = "World", int count = 1) {
    return "Hello " & name & " (" & count & ")";
}`,
  
  'property-long': `class{
  property name="firstName" type="string" default="boxlang";
}`,
  
  'field-access': `obj.class;
obj.function;
obj.default;
this.x = value;`,

  'custom': '' // Can be set via command line or modified directly
};

function analyzePosition(code, position) {
  console.log(`\nAnalyzing position ${position}:`);
  console.log(`Character: '${code[position] || 'EOF'}'`);
  console.log(`Context: "${code.slice(Math.max(0, position - 5), position + 6)}"`);
  console.log(`Before: "${code.slice(Math.max(0, position - 10), position)}"`);
  console.log(`After: "${code.slice(position, Math.min(code.length, position + 10))}"`);
}

function debugParse(testName, code) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`Testing: ${testName.toUpperCase()}`);
  console.log(`${'='.repeat(60)}`);
  console.log('Code:');
  console.log(code);
  console.log(`\nLength: ${code.length} characters`);
  
  // Show character positions for first 50 characters
  console.log('\nCharacter positions:');
  for (let i = 0; i < Math.min(code.length, 50); i++) {
    console.log(`${i.toString().padStart(2)}: '${code[i]}'`);
  }
  
  try {
    const tree = BoxLangLanguage.parser.parse(code);
    console.log('\n✅ PARSED SUCCESSFULLY!');
    
    const treeString = tree.toString();
    console.log('\nParse Tree:');
    console.log(treeString);
    
    // Check for warnings (⚠ symbols)
    if (treeString.includes('⚠')) {
      console.log('\n⚠️  WARNING: Parse tree contains warning symbols (⚠)');
      const warnings = treeString.match(/⚠\([^)]*\)/g) || [];
      console.log('Warnings found:', warnings);
    } else {
      console.log('\n✅ No warnings in parse tree');
    }
    
    return { success: true, tree: treeString };
    
  } catch (error) {
    console.log('\n❌ PARSE FAILED!');
    console.log('Error:', error.message);
    
    // Extract position from error message
    const positionMatch = error.message.match(/at (\d+)/);
    if (positionMatch) {
      const position = parseInt(positionMatch[1]);
      analyzePosition(code, position);
    }
    
    return { success: false, error: error.message };
  }
}

// Main execution
function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('BoxLang Grammar Debug Tool');
    console.log('Usage:');
    console.log('  node debug.cjs <test-name>');
    console.log('  node debug.cjs custom "your code here"');
    console.log('\nAvailable tests:', Object.keys(testCases).filter(k => k !== 'custom').join(', '));
    return;
  }
  
  const testName = args[0];
  let code;
  
  if (testName === 'custom' && args[1]) {
    code = args[1];
  } else if (testCases[testName]) {
    code = testCases[testName];
  } else {
    console.error(`Unknown test: ${testName}`);
    console.log('Available tests:', Object.keys(testCases).join(', '));
    return;
  }
  
  if (!code.trim()) {
    console.error('No code to test!');
    return;
  }
  
  const result = debugParse(testName, code);
  
  console.log('\n' + '='.repeat(60));
  console.log(result.success ? '✅ SUMMARY: Parse successful' : '❌ SUMMARY: Parse failed');
  console.log('='.repeat(60));
}

// Export for reuse
module.exports = { debugParse, testCases, analyzePosition };

// Run if called directly
if (require.main === module) {
  main();
}
