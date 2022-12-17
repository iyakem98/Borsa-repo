import Feedback from '../models/feedbackModel.js'
import Comment from '../models/commentModel.js'
import generateToken from '../utils/generateToken.js'
import asyncHandler from 'express-async-handler'




// /api/feedback/send

const sendFeedback = asyncHandler(async(req, res) => {
    const {user_id, traveler_id, rating, comment} = await req.body;
  
    //const user = await User.findOne({user_id})

    //const traveler = await User.findOne({traveler_email})

    console.log(user_id);
    console.log(traveler_id);
   
    if (!user_id) {
        res.status(400)
        throw new Error ('Rating provided by non-existent user')
    }

    // if (!traveler) {
    //     res.status(400)
    //     throw new Error ('Rating non-existent traveler')
    // }

    const feedback = await Comment.create(
        {
            user_id,
            rating,
            comment

        }
    )


    if (feedback) {
        res.status(201).json ({
            message: "Success"
        })

    }

    else {
        res.status(400)
        throw new Error ('Invalid data for feedback')
    }
})

export {sendFeedback}