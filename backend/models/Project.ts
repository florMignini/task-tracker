import mongoose, { Schema } from "mongoose";
import { project } from "../interfaces";

const projectSchema = new Schema(
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
    deadline: {
      type: {
        String,
      },
    },
    client: {
      type: String,
      trim: true,
      require: true,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    collaborator: [
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


 const Project = mongoose.models.Project || mongoose.model<project>("Project", projectSchema);

export default Project;