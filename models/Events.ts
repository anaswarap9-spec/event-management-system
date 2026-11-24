import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
    {
        eventName: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        eventDate: {
            type: Date,
            required: true
        },

        venue: {
            type: String,
            required: true
        },

        eventType: {
            type: String,
            required: true
        },

        status: {
            type: String,
            required: true
        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Event =
    mongoose.models.Event ||
    mongoose.model("Event", eventSchema);

export default Event;