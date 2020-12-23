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


const remark = new Schema({
        classTeachersRemark: {type:String, required:true},
        HeadTeachersRemark: {type:String, required:true},
        totalScore: {type:Number, required:true},
        marksObtainable: {type:Number, required:true},
        position: {type:Number, required:true},
        average: {type:Number, required:true},
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
    adminNumber: {type:String, required:true},
    contacts:{
        type:[contact],
        default:undefined
    },
    subjectCombination:{
        type:[subject],
        default:undefined
    },
    midTerm:{
        result: {
            type:[result],
            default:undefined
        },
        remarks: remark,
    },
    examination:{
        result: {
            type:[result],
            default:undefined
        },
        remarks:remark,
    }
});

Student = mongoose.model("Student", student);
module.exports = Student;