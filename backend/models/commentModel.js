import mongoose from 'mongoose'

const commentSchema = mongoose.Schema ({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }, 

    score: {
        type: Number
    }, 

    comment: {
        type: String
    }
})

const Comment = mongoose.model('Comment', commentSchema);

export default Comment