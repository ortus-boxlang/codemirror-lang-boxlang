import { styleTags, tags as t } from "@lezer/highlight";

// / Highlighting for the BoxLang script grammar (src/boxlang.grammar), adapted
// / from @lezer/java's highlighting and extended with BoxLang-specific
// / operators, literals, and constructs.
export const BoxLangHighlighting = styleTags( {
	null                                                                                               : t.null,
	instanceof                                                                                         : t.operatorKeyword,
	castAs                                                                                             : t.operatorKeyword,
	this                                                                                               : t.self,
	"new super void"                                                                                   : t.keyword,
	"class interface extends implements var function"                                                  : t.definitionKeyword,
	"import as include template"                                                                       : t.moduleKeyword,
	"switch while for in if else case default do break continue return try catch finally throw assert" : t.controlKeyword,
	["public private protected abstract static final strictfp synchronized native transient volatile " +
   "package remote throws"] : t.modifier,
	"param bx" : t.keyword,

	IntegerLiteral            : t.integer,
	FloatingPointLiteral      : t.float,
	"StringLiteral TextBlock" : t.string,
	CharacterLiteral          : t.character,
	LineComment               : t.lineComment,
	BlockComment              : t.blockComment,
	BooleanLiteral            : t.bool,
	PrimitiveType             : t.standard( t.typeName ),
	TypeName                  : t.typeName,
	Identifier                : t.variableName,
	"MethodName/Identifier"   : t.function( t.variableName ),
	"PropertyName/Identifier" : t.propertyName,
	Definition                : t.definition( t.variableName ),

	ArithOp             : t.arithmeticOperator,
	LogicOp             : t.logicOperator,
	BitwiseOp           : t.bitwiseOperator,
	BitwiseComplementOp : t.bitwiseOperator,
	CompareOp           : t.compareOperator,
	AssignOp            : t.definitionOperator,
	UpdateOp            : t.updateOperator,
	PowerOp             : t.arithmeticOperator,
	IntDivOp            : t.arithmeticOperator,
	ModOp               : t.arithmeticOperator,
	StringConcatOp      : t.operator,
	ElvisOp             : t.logicOperator,
	SafeNavOp           : t.derefOperator,
	SpreadOp            : t.punctuation,
	RangeOp             : t.operator,

	// BoxLang legacy CFML-style word operators (EQ, CONTAINS, AND, XOR, etc.)
	BoxLangCompareOp        : t.compareOperator,
	BoxLangContainsOp       : t.operatorKeyword,
	BoxLangDoesNotContainOp : t.operatorKeyword,
	BoxLangNotOp            : t.operatorKeyword,
	BoxLangXorOp            : t.operatorKeyword,
	BoxLangEqvOp            : t.operatorKeyword,
	BoxLangImpOp            : t.operatorKeyword,
	BoxLangLogicOp          : t.operatorKeyword,

	Asterisk : t.punctuation,
	Label    : t.labelName,
	"( )"    : t.paren,
	"[ ]"    : t.squareBracket,
	"{ }"    : t.brace,
	"."      : t.derefOperator,
	", ; :"  : t.separator,
	"#"      : t.special( t.brace ),
	"-> =>"  : t.function( t.punctuation ),
	"..."    : t.punctuation,

	// set{1,2,3} / sb{"..."} / stringbuilder{"..."} soft-keyword literals
	SetLiteralKeyword    : t.keyword,
	StringBuilderKeyword : t.keyword,

	// bx:component name=... / <bx:tag> style tags
	"ComponentName/Identifier" : t.tagName,
	ComponentAttributeName     : t.attributeName,

	// param/property attribute names
	ParamName             : t.propertyName,
	PropertyAttributeName : t.propertyName,

	// Template islands (basic support)
	TemplateDelimiter : t.meta
} );
