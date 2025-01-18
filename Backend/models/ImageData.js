import mongoose from 'mongoose';

const ImageDataSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    video: {
        type: String,
      },
      images: {
        type: [String],
      },
    expert_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }

})

export default mongoose.model('ImageData', ImageDataSchema);