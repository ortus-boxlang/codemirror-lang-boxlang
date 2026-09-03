import { styleTags, tags as t } from "@lezer/highlight";

// / Highlighting for the BoxLang template grammar (src/boxlang-template.grammar),
// / used for .bxm template files with bx: tags and embedded script islands.
// /
// / Known limitations of the current ("basic support") template grammar this
// / maps onto:
// /  - tagName/attributeName/identifier are lowercase (inlined) rules, so tag
// /    names, attribute names, and script identifiers don't produce their own
// /    tree nodes and can't be individually colorized yet.
// /  - "<" ">" and "/" are shared, context-insensitive tokens used both as tag
// /    delimiters and as comparison/division operators inside embedded script
// /    expressions, so they are intentionally left untagged to avoid
// /    mis-highlighting one role as the other.
export const BoxLangTemplateHighlighting = styleTags( {
	TextContent     : t.content,
	TemplateComment : t.blockComment,
	bx              : t.keyword,

	StringLiteral        : t.string,
	IntegerLiteral       : t.integer,
	FloatingPointLiteral : t.float,
	BooleanLiteral       : t.bool,
	null                 : t.null,

	"if else while break continue return throw" : t.controlKeyword,
	var                                         : t.definitionKeyword,

	"<= >= == !=" : t.compareOperator,
	"&& ||"       : t.logicOperator,
	"+ - * / %"   : t.arithmeticOperator,
	"&"           : t.operator,
	"++ --"       : t.updateOperator,
	"!"           : t.logicOperator,
	"="           : t.definitionOperator,

	"( )" : t.paren,
	"[ ]" : t.squareBracket,
	"{ }" : t.brace,
	"."   : t.derefOperator,
	", ;" : t.separator,
	":"   : t.punctuation,
	"#"   : t.special( t.brace )
} );
