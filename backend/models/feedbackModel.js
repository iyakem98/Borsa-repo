import mongoose from 'mongoose'


const feedbackSchema = mongoose.Schema (
    {
        user: { //THIS SHOULD BE CHANGED TO TRAVELER
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            unique: true
        }, 

        score: {
            type: Number
        },
        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }]

    },
    {
        timestamps: true
    }
)


const Feedback = mongoose.model('Feedback', feedbackSchema)

export default Feedback