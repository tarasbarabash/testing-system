import bodyParser from "body-parser";
import mongoose from "mongoose";

export const initMiddleware = (app) => {
    app.use(bodyParser.json());
}

export const startApp = (app) => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.info(`App is running on ${port}`));
}

export const initDB = async () => {
    let dbUri = process.env.DB_URI;
    const isTesting = process.env.NODE_ENV === "test";
    if (isTesting) {
        const server = new (require("mongodb-memory-server").MongoMemoryServer)();
        dbUri = await server.getConnectionString();
    }
    mongoose.connect(dbUri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }).then(() => {
        if (!isTesting)
            console.info(`A connection to the db is established!`);
    }).catch(err => {
        console.info(err);
    });
}