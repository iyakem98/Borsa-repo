import mongoose from 'mongoose'

const feedbackSchema = mongoose.Schema ({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }, 

    score: {
        type: Number
    },

    // comments: [{
    //     type: String,
    //     ref: Comment
    // }]
})

const Feedback = mongoose.model('Feedback', feedbackSchema)

export default Feedback