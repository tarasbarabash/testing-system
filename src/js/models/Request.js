import axios from "axios";
import AuthError from "../errors/AuthError";
import { auth } from "./Auth";

class Request {
    constructor() {
        this.endpoint = `https://nameless-ridge-74946.herokuapp.com/api`;
    }

    async call({ reqMethod, link, data }) {
        const req = {
            method: reqMethod,
            url: `${this.endpoint}${link}`,
            data,
            validateStatus: () => true,
        };
        if (auth.token) req.headers = { 'Authorization': "Bearer " + auth.token };
        const response = await axios(req);
        if (response.data.error && response.data.code === 403) throw new AuthError();
        return response.data;
    }
}

export default new Request();