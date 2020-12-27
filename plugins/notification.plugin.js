const axios = require('axios').default;
module.exports = function Notification(schema){

    schema.post(["save", "findByIdAndUpdate"],()=>{
        console.log("opt");
    })
    schema.pre(["save", "findByIdAndUpdate"],()=>{
        axios.post("localhost:5000/notification/create", 
            {message:"updated"}
        )
            .then(response=>console.log("succesful"))
            .catch(error=>console.log(error))
    })
}