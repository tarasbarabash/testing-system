export default class User {
    constructor(username, mail, role, created) {
        this._username = username;
        this._mail = mail;
        this._role = role;
        this._created = created;
    }

    get username() {
        return this._username;
    }

    get mail() {
        return this._mail;
    }

    get role() {
        return this._role;
    }

    get created() {
        return this._created;
    }

    set username(username) {
        this._username = username;
    }
}