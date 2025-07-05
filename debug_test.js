import { BoxLangLanguage } from "./dist/boxlang.js";

const code = `result ?: defaultValue;
name ?: "Anonymous";
getValue() ?: 0;`;

console.log( "Testing Elvis operator:", code );
console.log( "Character positions:" );
for ( let i = 0; i < code.length; i++ ) {
	console.log( `${i}: '${code[i]}'` );
}

try {
	const tree = BoxLangLanguage.parser.parse( code );
	console.log( "Parse successful:", tree.toString() );
} catch ( error ) {
	console.error( "Parse error:", error.message );
}

// Test just the first line
console.log( "\n--- Testing first line only ---" );
try {
	const tree1 = BoxLangLanguage.parser.parse( "result ?: defaultValue;" );
	console.log( "First line:", tree1.toString() );
} catch ( error ) {
	console.error( "First line error:", error.message );
}
