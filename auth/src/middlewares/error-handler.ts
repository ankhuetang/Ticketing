import { Request, Response, NextFunction } from "express"
import { CustomError } from "../../errors/custom-error";

//4 params vi day la error-handler middleware
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log('Something went wrong', err);

    if (err instanceof CustomError) {

        return res.status(err.statusCode).send({errors: err.serializeErrors()})
    }

    res.status(400).send({
        errors: [{message: 'Something went wrong'}]
    })
}