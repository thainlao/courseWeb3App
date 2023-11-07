import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    isActivated: {type: Boolean, default: false},
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    activationLink: {type: String},
    achievements: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Achivments'}],
    purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Courses'}],
}, {timestamps: true},)

export default mongoose.model("User", UserSchema)