import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: {type: String},
    owners: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    numberOfBuyers: { type: Number, default: 0 },
    content: [{ title: String }],
    stack: [{namestack: String, nameSubstack: String}]
}, { timestamps: true });

export default mongoose.model("Course", CourseSchema);