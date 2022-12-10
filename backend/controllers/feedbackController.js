import Feedback from '../models/feedbackModel.js'
import Comment from '../models/commentModel.js'
import generateToken from '../utils/generateToken.js'
import asyncHandler from 'express-async-handler'




// /api/users/feedback/

const sendFeedback = asyncHandler(async(req, res) => {
    const {user_email, traveler_email, rating, comment} = await req.body

    const user = await User.findOne({user_email})

    const traveler = await User.findOne({traveler_email})

   
    if (!user) {
        res.status(400)
        throw new Error ('Rating provided by non-existent user')
    }

    if (!traveler) {
        res.status(400)
        throw new Error ('Rating non-existent traveler')
    }

    if (userNameTaken) {
        res.status(400)
        throw new Error ('Username Taken! put in another one')
    }

    // const user = await User.create({
    //     firstName,
    //     lastName,
    //     email,
    //     password,
    //     userName,
    //     isTraveler,
    //     profilePic,
    //     city,
    //     country,
    // })

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