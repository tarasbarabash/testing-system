import ApiError from "./ApiError";

export default class InvalidValueError extends ApiError {
    constructor(value) {
        super(`Invalid ${value}`, 1);
        this.name = this.constructor.name;
    }
}