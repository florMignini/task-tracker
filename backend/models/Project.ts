import mongoose from "mongoose";
import { project } from "../interfaces";

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      require: true,
    },
    description: {
      type: String,
      trim: true,
      require: true,
    },
    Deadline: {
      type: {
        Date,
        default: Date.now(),
      },
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    colaborators: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);


const Project = mongoose.models.Project || mongoose.model<project>("User", projectSchema);

export default Project;