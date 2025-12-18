import { model, models, Schema, Types } from "mongoose";

export interface IAnswer {
  author: Types.ObjectId;
  content: string;
  question: Types.ObjectId;
  upvotes: number;
  downvotes: number;
}
const AnswerSchema = new Schema<IAnswer>(
  {
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    question: { type: Schema.Types.ObjectId, ref: "Question", required: true },
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
  },
  { timestamps: true }
);
const Answer = models?.Answer || model<IAnswer>("Answer", AnswerSchema);
export default Answer;
