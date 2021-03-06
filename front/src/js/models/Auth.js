import request from "../models/Request";
import User from "./User";

export const authStates = {
    authorised: 1,
    guest: 2
}

class Auth {
    constructor() {
        this._token = localStorage.getItem("token");
    }

    async isAuthenticated() {
        try {
            const { name, role, created, error, mail } = await request.call({
                reqMethod: "GET",
                link: "/auth/validateToken"
            });
            if (!error) {
                this._user = new User(name, mail, role, created);
                this._state = authStates.authorised;
            } else this._state = authStates.guest;
        } catch (error) {
            console.log(error);
        }
    }

    async login({ mail, password }) {
        try {
            const { name, role, created, token, error, code } = await request.call({
                reqMethod: "POST",
                link: "/auth/login",
                data: {
                    mail,
                    password
                }
            });
            if (!error) {
                this._token = token;
                this._user = new User(name, mail, role, created);
                this._state = authStates.authorised;
                localStorage.setItem("token", token);
                return this._user;
            }
            return { error, code };
        } catch (err) {
            console.log(err);
        }
    }

    async signup({ name, password, mail }) {
        try {
            const { role, created, token, error, code } = await request.call({
                reqMethod: "POST",
                link: "/auth/signup",
                data: {
                    mail,
                    password,
                    name,
                    role: 3
                }
            });
            if (!error) {
                this._token = token;
                this._state = authStates.authorised;
                this._user = new User(name, mail, role, created);
                localStorage.setItem("token", token);
                return this._user;
            }
            return { error, code };
        } catch (err) {
            console.log(err);
        }
    }

    async logout() {
        try {
            const { success, error } = await request.call({
                reqMethod: "GET",
                link: "/auth/logout"
            });
            if (success) {
                this._token = undefined;
                this._user = undefined;
                this._state = authStates.guest;
                localStorage.removeItem("token");
                return success;
            }
            return error;
        } catch (err) {
            console.log(err);
        }
    }

    get user() {
        return this._user;
    }

    set username(username) {
        this._user.username = username;
    }

    get state() {
        return this._state;
    }

    get token() {
        return this._token;
    }
}

export const auth = new Auth();