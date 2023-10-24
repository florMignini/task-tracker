import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import { user } from "../interfaces/user-interface";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    token: {
        type: String,
    },
    confirm: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
})

//hashing password
userSchema.pre('save', async function(next) {
    if(!this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSalt(10);
   this.password = await bcrypt.hash(this.password, salt)
   
});


//password comparison function
userSchema.methods.comparePassword = async function(candidatePassword:string) {
    return await bcrypt.compare(candidatePassword, this.password);
}

const User = mongoose.models.User || mongoose.model<user>("User", userSchema);

export default User;