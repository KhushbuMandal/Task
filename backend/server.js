require ("dotenv").config();
const express = require('express')
var cors = require("cors")
const app = express();
const router = require("./router/auth-router")
const connectDb = require("./utils/db")


//app.use(cors());

app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());

app.use("/api/auth" , router)

const PORT = 5000;

connectDb().then(() => {
    app.listen (PORT , () => {
        console.log(`server is running at port : ${PORT}`);
    })
})