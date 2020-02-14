import chai from "chai";
import chaiHttp from "chai-http";
import "dotenv/config";
import mongoose from "mongoose";

chai.use(chaiHttp);
chai.should();

import auth from "./auth";
import quiz from "./quiz";


after(async () => {
    await mongoose.connection.db.dropDatabase();
})