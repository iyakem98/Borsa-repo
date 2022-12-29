import mongoose from 'mongoose'
import bcrypt from "bcryptjs";

const adminSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
        
    }
});

adminSchema.methods.matchPassword = async function(enteredPassword) {
    console.log(this.password)
    return await bcrypt.compare(enteredPassword, this.password)
}


const Admin = mongoose.model('Admin', adminSchema);

export default Admin