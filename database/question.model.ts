import { model, models, Schema, Types } from "mongoose";

export interface IQustion {
  author: Types.ObjectId;
  title: string;
  content: string;
  upvotes: number;
  downvotes: number;
  tags: Types.ObjectId[];
  views: number;
  answers: number;
}
const QuestionSchema = new Schema<IQustion>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  author: { type: Schema.Types.ObjectId, ref: "User" },
});
const Question = models?.Question || model("Question", QuestionSchema);
export default Question;
