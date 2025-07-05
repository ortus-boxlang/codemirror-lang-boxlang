import { BoxLangLanguage } from "./dist/boxlang.js";

// Test both lambda (->) and closure (=>) expressions
const testCases = [
	{
		name : "Lambda with ->",
		code : "var lambda = (x) -> x * 2;"
	},
	{
		name : "Closure with =>",
		code : "var closure = (x) => x * 2;"
	},
	{
		name : "Lambda with block",
		code : "var lambda = (x) -> { return x * 2; };"
	},
	{
		name : "Closure with block",
		code : "var closure = (x) => { return x * 2; };"
	},
	{
		name : "Lambda without params",
		code : 'var lambda = () -> "hello";'
	},
	{
		name : "Closure without params",
		code : 'var closure = () => "hello";'
	}
];

console.log( "Testing Lambda and Closure expressions...\n" );

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
