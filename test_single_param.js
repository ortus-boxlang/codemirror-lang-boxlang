import { BoxLangLanguage } from "./dist/boxlang.js";

// Test single parameter without parentheses
const testCases = [
	{
		name : "Lambda single param without parentheses",
		code : "var lambda = x -> x * 2;"
	},
	{
		name : "Closure single param without parentheses",
		code : "var closure = x => x * 2;"
	},
	{
		name : "Lambda single param with parentheses",
		code : "var lambda = (x) -> x * 2;"
	},
	{
		name : "Closure single param with parentheses",
		code : "var closure = (x) => x * 2;"
	}
];

console.log( "Testing single parameter syntax...\n" );

testCases.forEach( testCase => {
	console.log( `Testing: ${testCase.name}` );
	console.log( `Code: ${testCase.code}` );

	try {
		const tree = BoxLangLanguage.parser.parse( testCase.code );
		console.log( "✅ Parse successful:", tree.toString() );
	} catch ( error ) {
		console.error( "❌ Parse error:", error.message );
	}
	console.log( "---\n" );
} );
