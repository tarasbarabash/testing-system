import bodyParser from "body-parser";
import mongoose from "mongoose";

export const initMiddleware = (app) => {
    app.use(bodyParser.json());
}

export const startApp = (app) => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`App is running on ${port}`));
}

export const initDB = () => {
    mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }).then(() => {
        console.log(`A connection to the db is established!`);
    }).catch(err => {
        console.log(err);
    });
}