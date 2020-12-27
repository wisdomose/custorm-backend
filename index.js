const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app=express()
app.use(express.json())
app.use(cors());

app.listen(process.env.PORT || 1000,  ()=>console.log("server running"))

mongoose.connect(process.env.CONNECTION_STRING,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }, ()=>console.log("app connected successfully"));

app.use("/student/primary", require("./routes/primaryStudent.route"))
app.use("/student/secondary", require("./routes/seniorStudent.route"))
app.use("/general", require("./routes/general.route"))
app.use("/teacher", require("./routes/teachers.route"))
app.use("/notification", require("./routes/notification.route"))