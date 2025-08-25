const mongoose = require("mongoose")

const MeetupSchema = new mongoose.Schema({
    eventTitle: {
        type: String,
        required: true
    },
    host: {
        type: String,
        required: true
    },
    eventImageUrl: {
        type: String,
        required: true
    },
    startDateTime: { type: Date, required: true },
    endDateTime: { type: Date, required: true },
    address: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    speakers: [{
        speakerName: {
            type: String,
            required: true
        },
        speakerDesignation: {
            type: String,
            required: true
        },
        speakerImageUrl: {
            type: String,
            required: true
        }
    }],
    mode: {
        type: String,
        enum: ["Online", "Offline", "Both"],
        required: true
    },
    eventDetails: {
        type: String,
        required: true
    },
    dressCode: String,
    ageRestrictions: Number,
    eventTags: [{type:String}]
}, {timestamps: true})

const MeetUp = mongoose.model("Meetup", MeetupSchema);

module.exports = MeetUp;