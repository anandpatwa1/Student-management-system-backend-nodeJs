const mongoose = require('mongoose')

const studentsSchema = new mongoose.Schema({
    name : {
        type : String,
        require : [true , 'please fill name']
    },
    email : {
        type : String,
        require : [true , 'please fill email'],
        unique : true
    },
    password : {
        type : String,
        require : [true , 'please fill password']
    },
    isAdmin : {
        type : Boolean,
        default : false
    }
},{
    timestamps : true
})

module.exports = mongoose.model('Students' , studentsSchema)