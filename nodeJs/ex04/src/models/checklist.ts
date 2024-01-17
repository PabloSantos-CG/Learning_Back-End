import mongoose, { Schema } from "mongoose";

const checklistSchema = new Schema({
  name: { type: String, required: true },
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
});

export default mongoose.model("Checklist", checklistSchema);