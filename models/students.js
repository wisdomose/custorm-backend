const mongoose = require("mongoose");
const {Schema} = mongoose;

const result = new Schema({
    subject:{type:String, required:true},
    score:{type:Number, required:true},
});

const subject = new Schema({
    subject:{type:String}
})

const contact = new Schema({
    name:{type:String, required:true},
    contact:{type:String, required:true}
})

const student = new Schema({
    username:{type:String, required:true},
    password:{type:String, required:true},
    surname:{type:String, required:true},
    firstname:{type:String, required:true},
    lastname:{type:String, required:true},
    class:{type:String, required:true},
    paid:{type:Boolean, default:false},
    createdAt:{type:Date, default:Date.now},
    dateOfBirth:{type:Date, required:true},
    contacts:{
        type:[contact],
        default:undefined
    },
    subjectCombination:{
        type:[subject],
        default:undefined
    },
    midTerm:{
        type:[result],
        default:undefined
    },
    examination:{
        type:[result],
        default:undefined
    }
});

Student = mongoose.model("Student", student);
module.exports = Student;