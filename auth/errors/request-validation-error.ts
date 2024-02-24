import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError {
    statusCode = 400
    constructor(public errors: ValidationError[]) { //private keyword coi nhu automatically init atribute errors
        super('Invalid request parameter');

        //only because we are extending a built in class
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializeErrors() {
        return this.errors.map( error => {
            return {message: error.msg, field: error.type === "field" ? error.path : ""}
        })
    }
}
