import chai from "chai";
import Question from "../src/models/Question";
import Quiz from "../src/models/Quiz";
import { Types } from "mongoose";
import app from "../src/index";

describe("Quiz", () => {
    let userToken;
    before(async () => {
        const options = [];
        const questions = [];
        for (let i = 0; i < 2; i++)
            options.push({ value: `Option - ${i}`, correct: i === 2 });
        for (let i = 0; i < 3; i++)
            questions.push(await new Question({ title: `Question - ${i}`, options }));
        for (let i = 0; i < 2; i++) {
            const quiz = await new Quiz({
                name: `Quiz - ${i}`,
                complexity: 1,
                accessibleTo: [i + 1],
                questions,
                creator: new Types.ObjectId("5df69f048570f881ef3fcb58")
            }).save();
        }
        const { body: { token: obtainedToken } } = await chai.request(app).post("/api/auth/login").send({
            mail: "test@test.com",
            password: "test"
        });
        userToken = obtainedToken;
    })
    it("should create a new quiz", (done) => {
        chai.request(app).post("/api/quiz/new").set("Authorization", `Bearer ${userToken}`).type("json").send(
            {
                "name": "Quiz - 12",
                "complexity": 1,
                "questions": [{
                    "title": "Hello",
                    "options": [{ "value": "Hello - 1", "correct": false },
                    { "value": "Hello - 2", "correct": true },
                    { "value": "Hello - 3", "correct": false }]
                },
                {
                    "title": "Hello - 2",
                    "options": [{ "value": "Hello - 1", "correct": false },
                    { "value": "Hello - 2", "correct": true },
                    { "value": "Hello - 3", "correct": false }]
                },
                {
                    "title": "Hello - 3",
                    "options": [{ "value": "Hello - 1", "correct": false },
                    { "value": "Hello - 2", "correct": true },
                    { "value": "Hello - 3", "correct": false }]
                }]
            }
        ).then((res) => {
            res.body.success.should.equal(true);
            done();
        })
    })
    it("should return all accessible quizzes", (done) => {
        chai.request(app).get("/api/quiz").set("Authorization", `Bearer ${userToken}`).send().then((res) => {
            res.body.total.should.equal(1);
            done();
        })
    })
})