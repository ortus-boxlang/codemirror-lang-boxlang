import { parser } from "./boxlang.grammar";
import {
	continuedIndent, indentNodeProp, delimitedIndent, foldNodeProp, foldInside,
	LRLanguage, LanguageSupport
} from "@codemirror/language";

// / A language provider for the BoxLang script grammar, based on the
// / [Lezer Java parser](https://github.com/lezer-parser/java), extended with
// / BoxLang-specific syntax, highlighting, and indentation information.
export const BoxLangLanguage = LRLanguage.define( {
	name   : "boxlang",
	parser : parser.configure( {
		props : [
			indentNodeProp.add( {
				IfStatement  : continuedIndent( { except: /^\s*({|else\b)/ } ),
				TryStatement : continuedIndent( { except: /^\s*({|catch|finally)\b/ } ),
				SwitchBlock  : context => {
					const after = context.textAfter, closed = /^\s*\}/.test( after ), isCase = /^\s*(case|default)\b/.test( after );
					return context.baseIndent + ( closed ? 0 : isCase ? 1 : 2 ) * context.unit;
				},
				Block        : delimitedIndent( { closing: "}" } ),
				BlockComment : () => null,
				Statement    : continuedIndent( { except: /^{/ } )
			} ),

			foldNodeProp.add( {
				["Block SwitchBlock ClassBody ConstructorBody InterfaceBody"] : foldInside,
				BlockComment( tree ) { return { from: tree.from + 2, to: tree.to - 2 }; }
			} )
		]
	} ),

	languageData : {
		commentTokens : { line: "//", block: { open: "/*", close: "*/" } },
		indentOnInput : /^\s*(?:case |default:|\{|\})$/
	}
} );

// / BoxLang language support.
export function boxlang() {
	return new LanguageSupport( BoxLangLanguage );
}