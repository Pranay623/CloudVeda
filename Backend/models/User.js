import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    points: {
        type: Number,
        default: 50,
    },
    roles: {
        type: String,
        enum: ["patient", "expert"],
        default: "patient",
    },
    status:{
        type: String,
        enum: ["Pending", "Approved", "Denied"],
        default: "Pending",
    }
},
{timestamps: true}
);

export default mongoose.model("User", UserSchema);

