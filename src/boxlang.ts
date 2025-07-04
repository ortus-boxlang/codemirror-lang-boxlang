import { parser } from "./boxlang.grammar";
import {
	flatIndent, continuedIndent, indentNodeProp, delimitedIndent, foldNodeProp, foldInside,
	LRLanguage, LanguageSupport
} from "@codemirror/language";

// / A language provider based on the [Lezer Java
// / parser](https://github.com/lezer-parser/java), extended with
// / highlighting and indentation information.
export const BoxLangLanguage = LRLanguage.define( {
	name   : "java",
	parser : parser.configure( {
		props : [
			indentNodeProp.add( {
				IfStatement      : continuedIndent( { except: /^\s*({|else\b)/ } ),
				TryStatement     : continuedIndent( { except: /^\s*({|catch|finally)\b/ } ),
				LabeledStatement : flatIndent,
				SwitchBlock      : context => {
					const after = context.textAfter, closed = /^\s*\}/.test( after ), isCase = /^\s*(case|default)\b/.test( after );
					return context.baseIndent + ( closed ? 0 : isCase ? 1 : 2 ) * context.unit;
				},
				Block        : delimitedIndent( { closing: "}" } ),
				BlockComment : () => null,
				Statement    : continuedIndent( { except: /^{/ } )
			} ),

			foldNodeProp.add( {
				["Block SwitchBlock ClassBody ElementValueArrayInitializer ModuleBody EnumBody " +
         "ConstructorBody InterfaceBody ArrayInitializer"] : foldInside,
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