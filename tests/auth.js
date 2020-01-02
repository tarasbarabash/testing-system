import chai from "chai";
import errorCodes from "../src/static/errorCodes.json";
import app from "../src/index";

const testMail = "test@test.com";
const testPassword = "test";

describe("Auth", () => {
    describe("Signup", () => {
        let signupRequest;
        beforeEach(() => {
            signupRequest = chai.request(app).post("/api/auth/signup").type("json");
        })
        it("should create a new user", (done) => {
            signupRequest.send({
                mail: testMail,
                password: testPassword,
                role: 1,
                name: "New user"
            }).end(async (err, res) => {
                res.status.should.eq(200);
                res.body.should.have.property("token");
                done();
            })
        })
        it("should return a non-unique mail error", (done) => {
            signupRequest.send({
                mail: testMail,
                password: testPassword,
                role: 1,
                name: "New user"
            }).end(async (err, res) => {
                res.status.should.eq(502);
                res.body.should.include({ "code": errorCodes.nonuniqueMail })
                done();
            })
        })
    })
    describe("Login", () => {
        let loginRequest;
        beforeEach(() => {
            loginRequest = chai.request(app).post("/api/auth/login").type("json");
        })
        it("should return user with token", (done) => {
            loginRequest.send({
                mail: testMail,
                password: testPassword
            }).end((err, res) => {
                res.status.should.eq(200);
                res.body.should.have.property("token");
                done();
            })
        });
        it("should return a mail error", (done) => {
            loginRequest.send({
                mail: "random@mail.com",
                password: "password"
            }).end((err, res) => {
                res.status.should.eq(502);
                res.body.should.include({ "code": errorCodes.mailNotFound })
                done();
            })
        })
        it("should return an invalid mail error", (done) => {
            loginRequest.send({
                mail: "mail",
                password: "password"
            }).end((err, res) => {
                res.status.should.eq(502);
                res.body.should.include({ "code": errorCodes.invalidInput })
                done();
            })
        })
        it("should return an invalid mail-pass pair error", (done) => {
            loginRequest.send({
                mail: testMail,
                password: "password"
            }).end((err, res) => {
                res.status.should.eq(502);
                res.body.should.include({ "code": errorCodes.passMailNotFound })
                done();
            })
        })
    })
    describe("Logout", () => {
        let token, logoutRequest;
        beforeEach(async () => {
            const { body: { token: obtainedToken } } = await chai.request(app).post("/api/auth/login").type("json").send({
                mail: testMail,
                password: testPassword
            });
            logoutRequest = chai.request(app);
            token = obtainedToken;
        })
        it("should end requested session", (done) => {
            logoutRequest.get("/api/auth/logout").set("Authorization", `Bearer ${token}`).end((err, res) => {
                res.body.should.include({ success: true });
                done();
            })
        })
        it("should end all sessions", (done) => {
            logoutRequest.get("/api/auth/endAllSessions").set("Authorization", `Bearer ${token}`).end((err, res) => {
                res.body.should.include({ success: true });
                done();
            })
        })
    })
})