import { Schema, model, Document } from "mongoose";

interface Task extends Document {
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
