import express from 'express'
//import {protect} from '../middleware/authMiddleware.js'
import { sendFeedback } from '../controllers/feedbackController.js'
const router = express.Router()

router.route("/send").post(sendFeedback);

export default router