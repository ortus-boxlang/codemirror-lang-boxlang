const { parser } = require( "./dist/index.cjs" );

const code = `function greet(string name = "World", int count = 1) {
    return "Hello " & name & " (" & count & ")";
}`;

console.log( "Testing function with default parameters:" );
console.log( "Code:", code );
console.log( "Length:", code.length );

// Character position analysis
console.log( "\nCharacter positions:" );
for ( let i = 0; i < Math.min( code.length, 50 ); i++ ) {
	console.log( `${i}: '${code[i]}'` );
}

try {
	const tree = parser.parse( code );
	console.log( "\nParsed successfully!" );
	console.log( "Tree:", tree.toString() );
} catch ( error ) {
	console.error( "\nParse error:", error.message );
	console.log( `Character at position 22: '${code[22]}'` );
	console.log( `Context around position 22: "${code.slice( 18, 28 )}"` );
}
