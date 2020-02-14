export default class ApiError extends Error {
    constructor(message, code, responseCode) {
        super(message);
        this.code = code;
        this.name = this.constructor.name;
        this.responseCode = responseCode;
    }
}