export default class BadRequestError extends Error {
    constructor() {
        super("BadRequest error");
    }
}