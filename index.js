const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app=express()
app.use(express.json())
app.use("*", cors({
    origin:["http://localhost:3000", "http://localhost:3000/"]
}));

app.listen(process.env.PORT || 1000,  ()=>console.log("server running"))

mongoose.connect(process.env.CONNECTION_STRING,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }, ()=>console.log("app connected successfully"));

app.use("/student", require("./routes/student.route"))