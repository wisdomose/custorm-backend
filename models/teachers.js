const mongoose = require("mongoose");
const {Schema} = mongoose;

const subject = new Schema({
    subject:{type:String, required:true},
    class:[{type:String, required:true}]
})

const contact = new Schema({
    name:{type:String, required:true},
    contact:{type:String, required:true}
})

const teacher = new Schema({
    profilePic:{type:String, default:undefined},
    username:{type:String, required:true},
    password:{type:String, required:true},
    surname:{type:String, required:true},
    firstname:{type:String, required:true},
    lastname:{type:String},
    accountType:{type:String, required:true}, //can be primary, secondary or both
    blocked:{type:Boolean, default:false},
    createdAt:{type:Date, default:Date.now},
    dateAppointed:{type:Date},
    dateResigned:{type:Date, default:undefined},
    reasonOfLeave:{type:String, default:undefined},
    dateOfBirth:{type:Date, required:true},
    subjects:{
        type:[subject],
        default:undefined
    },
    formTeacher:{type:String, default:undefined},
    contacts:{
        type:[contact],
        default:undefined
    },
});

Teacher = mongoose.model("Staff", teacher);
module.exports = Teacher;