const mongoose = require("mongoose");
// const Notification = require("../plugins/notification.plugin");
const {Schema} = mongoose;

const general = new Schema({
    term:{type:Number, required:true},
    subjects:{
        toyland:[],
        wonderland:[],
        merryland:[],
        primary:[],
        jss:[]
    }
})


// general.plugin(Notification);

// module.exports = general;

const generalStats = mongoose.model("statistic", general);
module.exports = generalStats;