import express from 'express'
const router = express.Router()
import {authUser, getUserProfile, registerUser, updateUserProfile, getTravelers, getConsumers, getUsers, getUserById, deleteUser, updateUser} from '../controllers/userController.js'
import {protect} from '../middleware/authMiddleware.js'


router.route ('/').post(registerUser).get(protect, admin, getUsers)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
router.route('/travelers').get(getTravelers)
router.route('/consumers').get(getConsumers)
router.route('/:id').delete(protect, admin, deleteUser).get(protect, admin, getUserById).put(protect, admin, updateUser)



export default router 