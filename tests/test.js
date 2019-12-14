import chai from "chai";
import chaiHttp from "chai-http";
import app from "../src/index";

chai.use(chaiHttp);
chai.should();

describe("General", () => {
    describe("GET /", (done) => {
        it("should return Hello World object", (done) => {
            chai.request(app).get("/").end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an("object").that.includes({ "hello": "world" });
                done();
            })
        })
        it("should be 404", (done) => {
            chai.request(app).get("/hello-world").end((err, res) => {
                res.should.have.status(404);
                done();
            })
        })
    })
})