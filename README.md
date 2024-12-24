# First Lambda

This is a project to learn how to create a programming language.
The grammar is defined and then [Langium](https://langium.org/) is used to to create an abstract syntax tree (AST) and a VS Code extension with syntax hightlighting and auto-completion.
The language itself "First Lambda" is based on lambda calculus and intended to be a small and simple language.

## Setup

1. Setup Langium on your machine: https://www.npmjs.com/package/langium
2. Clone this repo
3. Build using the task in vscode (or execute `npm run langium:generate && npm run build` in a terminal)
4. Run the resulting program in vscode, to start a new vscode window which has the extension for 'First Lambda' loaded
5. In this new vscode window, open a .fla file in the example/ directory to try out syntax highlighting and auto-completion
