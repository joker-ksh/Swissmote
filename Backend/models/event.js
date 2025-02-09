const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    date : {
        type : Date,
        required : true,
    },
    category : {
        type : String,
        required : true,
    },
    attendees : {
        type : Number,
        required : true,
    },
    createdBy : {
        type : String,
        required : true,
    },
});

const Event = mongoose.model('Event',eventSchema);
module.exports = Event;