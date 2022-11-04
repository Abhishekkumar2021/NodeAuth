const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const session = require("express-session");
const routes = require("./routes/user");
const path = require("path");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static('public'))

app.use(session({secret:"SecretKey", resave:false, saveUninitialized:false, cookie:{
    maxAge:1000
}}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", routes);
app.use((err,req,res,next)=>{
    const {status = 500,message = "Something went wrong"} = err;
    res.status(status).send(message);
})
app.listen(3000, () => {
    console.log("Server running on port 3000");
});

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connection opened!");
    })
    .catch((err) => {
        console.log("Connection failed!");
        console.log(err.message);
    })
