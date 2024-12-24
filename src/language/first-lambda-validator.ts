// import type { ValidationAcceptor, ValidationChecks } from 'langium';
// import type { FirstLambdaAstType, LetStatement } from './generated/ast.js';
import type { ValidationChecks } from 'langium';
import type { FirstLambdaAstType } from './generated/ast.js';
import type { FirstLambdaServices } from './first-lambda-module.js';

/**
 * Register custom validation checks.
 */
export function registerValidationChecks(services: FirstLambdaServices) {
    const registry = services.validation.ValidationRegistry;
    const validator = services.validation.FirstLambdaValidator;
    const checks: ValidationChecks<FirstLambdaAstType> = {
        // Person: validator.checkPersonStartsWithCapital
    };
    registry.register(checks, validator);
}

/**
 * Implementation of custom validations.
 */
export class FirstLambdaValidator {

    // checkPersonStartsWithCapital(person: Person, accept: ValidationAcceptor): void {
    //     if (person.name) {
    //         const firstChar = person.name.substring(0, 1);
    //         if (firstChar.toUpperCase() !== firstChar) {
    //             accept('warning', 'Person name should start with a capital.', { node: person, property: 'name' });
    //         }
    //     }
    // }

}
