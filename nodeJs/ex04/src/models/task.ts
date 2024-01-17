import { Schema, model } from "mongoose";

const taskSchema = new Schema({
  name: { type: String, required: true },
  done: { type: Boolean, default: false },
  checklist: {
    type: Schema.Types.ObjectId,
    ref: "Checklist",
    required: true,
  },
});

export default model("Task", taskSchema);
