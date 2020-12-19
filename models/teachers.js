const mongoose = require("mongoose");
const {Schema} = mogoose;

const subject = new Schema({
    subject:{type:subject}
})

const teacher = new Schema({
    username:{type:String, required:true},
    password:{type:String, required:true},
    surname:{type:String, required:true},
    firstname:{type:String, required:true},
    lastname:{type:String, required:true},
    blocked:{type:Boolean, default:false},
    createdAt:{type:Date, default:Date.now},
    dateResigned:{type:Date, default:undefined},
    dateOfBirth:{type:Date, required:true},
    subjectCombination:{
        type:[subject],
        default:[]
    }
});

Teacher = mongoose.model("Teacher", teacher);
module.exports = Teacher;