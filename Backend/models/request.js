import mongoose from "mongoose";

const RequestLogSchema = new mongoose.Schema({
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    request_type: {
      type: String,
      enum: ["Health Analysis", "Data Submission", "Feedback", "Query", "Other"],
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
      default: Date.now,
    },
    completion: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed", "Failed"],
      default: "Pending",
    },
    response_data: {
      type: Object, // Stores the result or response associated with the request, if any
      default: null,
    },
    additional_info: {
      type: Object, // Optional field for storing additional metadata about the request
      default: null,
    },
  });
  
  const RequestLog = mongoose.model("RequestLog", RequestLogSchema);
  
  export default RequestLog;