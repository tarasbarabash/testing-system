import request from "../models/Request";
import AuthError from "../errors/AuthError";
import User from "./User";

const authStates = {
    authorised: 1,
    guest: 2
}

class Auth {
    constructor() {
        this._state = authStates.guest;
        this._token = localStorage.getItem("token");
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
                this._user = new User(name, mail, role, created);
                localStorage.setItem("token", token);
                return this._user;
            }
            return { error, code };
        } catch (err) {
            console.log(err);
        }
    }

    get user() {
        return this._user;
    }

    get state() {
        return this._state;
    }

    get token() {
        return this._token;
    }
}

export default new Auth();