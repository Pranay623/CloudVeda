import mongoose from "mongoose";

const hairAnalysisSchema = new mongoose.Schema({
    baldness_level: { type: String, default: 'Not Available' },
    hair_coverage: { type: String, default: 'Not Available' }
  });
  
  const hairlineAnalysisSchema = new mongoose.Schema({
    hairline_position: { type: Number, default: 0 },
    hairline_status: { type: String, default: 'Normal' }
  });
  
  const skinAnalysisSchema = new mongoose.Schema({
    dark_circles: { 
      type: String, 
      default: 'Not Available', 
      enum: ['Present', 'Absent', 'Not Available']

    },
    expression: { 
      type: String, 
      default: 'Neutral', 
      enum: ['Neutral', 'Angry', 'Happy', 'Sad', 'Not Available']
    },
    face_shape: { 
      type: String, 

      default: 'Not Available', 

      enum: ['Oval', 'Square', 'Round', 'Heart', 'Not Available']
    },
    health_index: { 
      type: String, 
      default: 'Not Available'
    },
    skin_texture: { 
      type: String, 
      default: 'Smooth', 
      enum: ['Smooth', 'Rough', 'Dry', 'Oily', 'Not Available']
    },
    skin_tone: { 
      type: String, 
      default: 'Not Available', 
      enum: ['Fair', 'Dark', 'Medium', 'Olive', 'Not Available']
    },
    spots: { 
      type: String, 
      default: '0 spots detected'
    },
    wrinkles: { 
      type: String, 
      default: 'Not Available', 

      enum: ['Few', 'Moderate', 'Severe', 'Not Available']
    }
  });
  
  const nailAnalysisSchema = new mongoose.Schema({
    nail_color: { type: String, default: '#000000' }
  });
  
  const healthAnalysisSchema = new mongoose.Schema({
    user_id: { type: String, required: true }, // Add user_id field here
    expert_id: { type: String, required: true }, // Add user_id field here
    hair_analysis: { type: hairAnalysisSchema, default: () => ({}) },
    hairline_analysis: { type: hairlineAnalysisSchema, default: () => ({}) },
    skin_analysis: { type: skinAnalysisSchema, default: () => ({}) },
    nail_analysis: { type: nailAnalysisSchema, default: () => ({}) },
    expert_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  });
  
  const HealthAnalysis = mongoose.model('HealthAnalysis', healthAnalysisSchema);

  export default HealthAnalysis