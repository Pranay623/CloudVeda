import mongoose from 'mongoose';

const ImageDataSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    skintone: {
        type: String,
        enum: ['Fair', 'Medium', 'Olive', 'Dark'],
    },
    expression:{
        type: String,
        enum: ['Happy', 'Neutral', 'Stressed', 'Sad', 'Anxious', 'Calm'],
    },
    skin_texture:{
        type: String,
        enum: ['Dry', 'Oily', 'Combination', 'Normal'],
    },
    dark_circles:{
        type: String,
        enum: ['Yes', 'No'],
    },
    spots:{
        type: String,
        enum: ['Yes', 'No'],
    },
    wrinkles:{
        type: String,
        enum: ['Yes', 'No'],
    },
    face_shape:{
        type: String,
        enum: ['Round', 'Oval', 'Square', 'Heart', 'Diamond'],
    },
    symmetry:{
        type: String,
        enum: ['Yes', 'No'],
    },
    health_index:{
        type: String,
        enum: ['Good', 'Average', 'Poor'],
    },

})

export default mongoose.model('ImageData', ImageDataSchema);