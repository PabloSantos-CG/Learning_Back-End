import { Document, Schema, model } from "mongoose";

export interface PhraseInterface extends Document {
  author: string;
  txt: string;
}

const PhraseSchema = new Schema<PhraseInterface>({
  author: { type: String, required: true },
  txt: { type: String }
});

const modelName = "Phrase";
export default model<PhraseInterface>(modelName, PhraseSchema);