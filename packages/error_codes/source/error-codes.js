/**
 * Class for throwing application-specific errors
 */
export class ErrorCodes {

    static UnexpectedInput = new ErrorCodes(1, "UNEXPECTED INPUT", "input provided to the operation was unexpected")

    /**
     * Create and throw an error
     * @param {number} code - error code  
     * @param {string} title - message at the start of the exception  
     * @param {string} description - more description of the error
     * @param {string} [message] - optional message to add to the description 
     */
    constructor(code, title, description, message = "") {
        this.code = code;
        this.title = title;
        this.description = description;
        this.message = message;
    }

    throw(){
        throw new Error(this.code, `${this.title}\n${this.description}/n${this.message}`);
    }
}