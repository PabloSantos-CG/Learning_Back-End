import { Schema, model } from "mongoose";

interface Checklist {
  name: string;
  tasks: [Schema.Types.ObjectId];
}

const checklistSchema = new Schema<Checklist>({
  name: { type: String, required: true },
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
});

const modelName = "Checklist";

export default model<Checklist>(modelName, checklistSchema);
