import { parser } from "./boxlang-template.grammar";
import {
	continuedIndent, indentNodeProp, delimitedIndent, foldNodeProp, foldInside,
	LRLanguage, LanguageSupport
} from "@codemirror/language";

// / A language provider for BoxLang templating language (.bxm files)
// / based on the BoxLang template grammar, with support for template tags,
// / script islands, and template-specific syntax highlighting.
export const BoxLangTemplateLanguage = LRLanguage.define( {
	name   : "boxlang-template",
	parser : parser.configure( {
		props : [
			indentNodeProp.add( {
				IfStatement  : continuedIndent( { except: /^\s*({|else\b)/ } ),
				TryStatement : continuedIndent( { except: /^\s*({|catch|finally)\b/ } ),
				SwitchBlock  : context => {
					const after = context.textAfter, closed = /^\s*\}/.test( after ), isCase = /^\s*(case|default)\b/.test( after );
					return context.baseIndent + ( closed ? 0 : isCase ? 1 : 2 ) * context.unit;
				},
				Block           : delimitedIndent( { closing: "}" } ),
				BxTag           : delimitedIndent( { closing: ">" } ),
				BxScriptTag     : delimitedIndent( { closing: "</bx:script>" } ),
				BxOutputTag     : delimitedIndent( { closing: "</bx:output>" } ),
				BlockComment    : () => null,
				TemplateComment : () => null,
				scriptStatement : continuedIndent( { except: /^{/ } )
			} ),

			foldNodeProp.add( {
				["Block SwitchBlock BxTag BxScriptTag BxOutputTag ArrayInitializer ElementValueArrayInitializer"] : foldInside,
				BlockComment( tree ) { return { from: tree.from + 2, to: tree.to - 2 }; },
				TemplateComment( tree ) { return { from: tree.from + 5, to: tree.to - 4 }; }
			} )
		]
	} ),

	languageData : {
		commentTokens : { line: "//", block: { open: "/*", close: "*/" } },
		indentOnInput : /^\s*(?:case |default:|\{|\}|<\/bx:|<bx:)$/
	}
} );

// / BoxLang template language support for .bxm files.
export function boxlangTemplate() {
	return new LanguageSupport( BoxLangTemplateLanguage );
}
