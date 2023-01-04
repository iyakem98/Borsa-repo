import mongoose from 'mongoose'


const commentSchema = mongoose.Schema (
    {
        user: { //THIS SHOULD BE CHANGED TO CONSUMER
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            unique: true
        }, 

        score: {
            type: Number
        }, 

        comment: {
            type: String
        }
    }, 
    {
        timestamps: true
    }
);

const Comment = mongoose.model('Comment', commentSchema);

export default Comment
