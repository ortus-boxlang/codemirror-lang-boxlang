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
				IfStatement     : continuedIndent( { except: /^\s*({|else\b)/ } ),
				Block           : delimitedIndent( { closing: "}" } ),
				BxTag           : delimitedIndent( { closing: ">" } ),
				BxScriptTag     : delimitedIndent( { closing: "</bx:script>" } ),
				TemplateComment : () => null
			} ),

			foldNodeProp.add( {
				["Block BxTag BxScriptTag"] : foldInside,
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
