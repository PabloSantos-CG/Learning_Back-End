import { Schema, model } from "mongoose";

interface Task {
  name: string;
  done: boolean;
  checklist: Schema.Types.ObjectId;
}

const taskSchema = new Schema<Task>({
  name: { type: String, required: true },
  done: { type: Boolean, default: false },
  checklist: {
    type: Schema.Types.ObjectId,
    ref: "Checklist",
    required: true,
  },
});

const modelName = "Task";

export default model<Task>(modelName, taskSchema);
