import { BoxLangLanguage } from "./dist/boxlang.js";

// Test the full lambda and closure expressions
const code = `var lambda = (x) -> x * 2;
var closure = (y) => y + 1;
var singleLambda = x -> x * 2;
var singleClosure = y => y + 1;
var blockLambda = (a, b) -> { return a + b; };
var blockClosure = (a, b) => { return a - b; };`;

console.log( "Testing full lambda and closure expressions:" );
console.log( "Length:", code.length );
console.log( "Character at position 31:", code[31], "Context:", code.substring( 29, 35 ) );

try {
	const tree = BoxLangLanguage.parser.parse( code );
	console.log( "Parse successful!" );
	console.log( "Tree:", tree.toString() );
} catch ( error ) {
	console.log( "Parse error:", error.message );
}
