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
        result: {
            type:[result],
            default:undefined
        },
        remarks:[
            // {classTeachersRemark:{type:String}},
            // {HeadTeachersRemark:{type:String}},
            // {resumptionDate:{type:Date, default:Date.now}},
            // {date:{type:Date, default:Date.now}},
            // {totalScore:{type:Number}},
            // {marksObtainable:{type:Number}},
            // {position:{type:Number}},
            // {average:{type:Number}}
        ],
    },
    examination:{
        result: {
            type:[result],
            default:undefined
        },
        remarks:[
            // {classTeachersRemark:{type:String}},
            // {HeadTeachersRemark:{type:String}},
            // {resumptionDate:{type:Date}},
            // {date:{type:Date}},
            // {totalScore:{type:Number}},
            // {marksObtainable:{type:Number}},
            // {position:{type:Number}},
            // {average:{type:Number}}
        ],
    }
});

Student = mongoose.model("Student", student);
module.exports = Student;