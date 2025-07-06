import typescript from "rollup-plugin-ts";
import { lezer } from "@lezer/generator/rollup";

export default [
	// Main BoxLang grammar
	{
		input    : "src/boxlang.ts",
		external : id => id !== "tslib" && !/^(\.?\/|\w:)/.test( id ),
		output   : [
			{ file: "dist/boxlang.cjs", format: "cjs" },
			{ file: "dist/boxlang.js", format: "es" }
		],
		plugins : [
			lezer(),
			typescript()
		]
	},
	// BoxLang template grammar
	{
		input    : "src/boxlang-template.ts",
		external : id => id !== "tslib" && !/^(\.?\/|\w:)/.test( id ),
		output   : [
			{ file: "dist/boxlang-template.cjs", format: "cjs" },
			{ file: "dist/boxlang-template.js", format: "es" }
		],
		plugins : [
			lezer(),
			typescript()
		]
	}
];
