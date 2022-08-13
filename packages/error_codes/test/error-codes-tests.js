import * as bob from '../source/error-codes.js';

class ErrorCodeTest {

    constructor() {
        this.throwUnexpectedInput();
    }

    throwUnexpectedInput() {
        console.log("issues");
        try {
            (new bob).ErrorCodes.UnexpectedInput.throw();
        } catch (error) {
            return console.log('success: error is of type UnexpectedInupt')
        }
        console.error(thrownError)
    }
}