import { parser } from "./dist/index.js";

const code = `
function test( 
    arg1, 
    arg2 = "string", 
    arg3 = 4, 
    arg4 = [1,2,3],
    arg5 = { key: "value" },
    arg6 = #expression#,
    arg7 = "#expression#"
) {
    return "test";
}
`;

console.log("Testing function with default parameters...");
const tree = parser.parse(code);
console.log("Parse tree:\n", tree.toString());

// Check if parsing was successful
if (tree.length === code.length) {
    console.log("✅ Successfully parsed function with default parameters!");
} else {
    console.log("❌ Parse failed or incomplete");
}
