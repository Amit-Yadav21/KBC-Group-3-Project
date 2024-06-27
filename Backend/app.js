import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import router from './router/router.js';

const app = express();

// connect cors HTTP method 
// app.use(cors('*'));
app.use(cors({
    origin: true,
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true
}));

app.use(bodyParser.json())
app.use(cookieParser())
app.use('/', router);

// connect momgoDB campass Backend API
mongoose.connect('mongodb+srv://amit21:SLb3cF41HdHgsdfL@cluster0.lvclbz1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    dbName:"KBC_Game"
})
.then(() => {
    console.log("Database connection established");
})
.catch((err) => {
    console.error("Database connection error:", err);
});

app.get("/", (req, res) => {
    console.log("done");
    res.status(200).send({
        message: "ok"
    });
});

app.listen(5555, () => {
    console.log("server is working on 3000");
});