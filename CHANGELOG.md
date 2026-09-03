# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

* * *

## [Unreleased]

### Added

- Range operators: `..`, `..<`, `>..`, `>..<`
- Spread (`...`) and shorthand keys in struct literals (`{ a, ...rest }`)
- Object and array destructuring assignment (`{ a, b: renamed, ...rest } = obj`, `[ a, ...rest ] = arr`)
- `set{...}` and `sb{...}` / `stringbuilder{...}` soft-keyword literals
- Two-variable `for (item, index in arr)` / `for (key, value in struct)` loops

### Fixed

- `for (x in y)` enhanced-for statements now use BoxLang's actual `in` syntax instead of Java's `:` syntax
- `struct`, `query`, `array`, `date`, `component`, `number`, `any`, `string`, and `numeric` can now be used as plain variable names again, not just type names
- The highlighting layers the grammars depend on (`@external propSource` from `./highlight` and `./highlight-template`) now actually exist, so the package builds and its test suite runs

### First Version
