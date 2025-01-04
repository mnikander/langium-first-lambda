import { beforeAll, describe, expect, test } from "vitest";
import { EmptyFileSystem, type LangiumDocument } from "langium";
import { expandToString as s } from "langium/generate";
import { parseHelper } from "langium/test";
import { createFirstLambdaServices } from "../../src/language/first-lambda-module.js";
import { Model, isModel } from "../../src/language/generated/ast.js";

let services: ReturnType<typeof createFirstLambdaServices>;
let parse:    ReturnType<typeof parseHelper<Model>>;
let document: LangiumDocument<Model> | undefined;

beforeAll(async () => {
    services = createFirstLambdaServices(EmptyFileSystem);
    parse = parseHelper<Model>(services.FirstLambda);

    // activate the following if your linking test requires elements from a built-in library, for example
    // await services.shared.workspace.WorkspaceManager.initializeWorkspace([]);
});

describe('Parsing tests', () => {

    test('parse variables', async () => {
        document = await parse(`
            let x = 5
            let y = x
        `);

        // check for absensce of parser errors the classic way:
        //  deacivated, find a much more human readable way below!
        // expect(document.parseResult.parserErrors).toHaveLength(0);

        expect(
            // here we use a (tagged) template expression to create a human readable representation
            //  of the AST part we are interested in and that is to be compared to our expectation;
            // prior to the tagged template expression we check for validity of the parsed document object
            //  by means of the reusable function 'checkDocumentValid()' to sort out (critical) typos first;
            checkDocumentValid(document) || s`
                Variables:
                  ${document.parseResult.value?.variables?.map(v => v.name)?.join('\n')}
            `
        ).toBe(s`
            Variables:
              x
              y
        `);
    });

    test('parse function', async () => {
        document = await parse(`
            let answer = lambda -> 42          # nilary function definition
        `);

        expect(
            checkDocumentValid(document) || s`
                Variables:
                  ${document.parseResult.value?.variables?.map(v => v.name)?.join('\n')}
            `
        ).toBe(s`
            Variables:
              answer
        `);
    });
});

function checkDocumentValid(document: LangiumDocument): string | undefined {
    return document.parseResult.parserErrors.length && s`
        Parser errors:
          ${document.parseResult.parserErrors.map(e => e.message).join('\n  ')}
    `
        || document.parseResult.value === undefined && `ParseResult is 'undefined'.`
        || !isModel(document.parseResult.value) && `Root AST object is a ${document.parseResult.value.$type}, expected a '${Model}'.`
        || undefined;
}
