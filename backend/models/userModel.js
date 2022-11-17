import mongoose from 'mongoose'
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    userName: {
        type: String,
        required: true,
        unique: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
        
    },

    isTraveler: {
        type: Boolean,
        required: true,
        default: false
    },

    city: {
        type: String,
        required: true,
        default: "Addis Ababa"
    },
    
    country: {
        type: String,
        required: true,
        default: "Ethiopia"
    },

    profilePic: {
        type: String,
        required: true, 
        default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },

    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },

    

    
}, {
    timestamps: true,

})

userSchema.methods.matchPassword = async function(enteredPassword) {
    console.log(this.password)
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) {
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User