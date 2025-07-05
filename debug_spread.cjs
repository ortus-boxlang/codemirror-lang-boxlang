const { BoxLangLanguage } = require( "./dist/boxlang.js" );

const code = `...array;
sum(...numbers);
[1, 2, ...rest];`;

console.log( "Testing Spread Operator:" );
console.log( "Code:", code );
console.log( "Length:", code.length );

// Character position analysis
console.log( "\nCharacter positions:" );
for ( let i = 0; i < Math.min( code.length, 30 ); i++ ) {
	console.log( `${i}: '${code[i]}'` );
}

try {
	const tree = BoxLangLanguage.parser.parse( code );
	console.log( "\nParsed successfully!" );
	console.log( "Tree:", tree.toString() );
} catch ( error ) {
	console.error( "\nParse error:", error.message );
	console.log( `Character at position 8: '${code[8]}'` );
	console.log( `Context around position 8: "${code.slice( 5, 12 )}"` );
}
