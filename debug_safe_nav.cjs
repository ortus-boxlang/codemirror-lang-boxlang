const { BoxLangLanguage } = require( "./dist/boxlang.js" );

const code = `obj?.property;
result?.value?.nested;`;

console.log( "Testing Safe Navigation Operator:" );
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
	console.log( `Character at position 5: '${code[5]}'` );
	console.log( `Context around position 5: "${code.slice( 2, 8 )}"` );
}
