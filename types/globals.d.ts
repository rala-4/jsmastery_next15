import { NextResponse } from "next/server";

export interface Tag {
  _id: string;
  name: string;
}
export interface Author {
  _id: string;
  name: string;
  image?: string;
}
export interface Question {
  _id: string;
  title: string;
  description?: string;
  tags: Tag[];
  upvotes: number;
  answers: number;
  views: number;
  createdAt: Date;
  author: Author;
}
type ActionResponse<T = null> = {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    details?: Record<string, string[]>;
  };
  status: number;
};
type SccessResponse<T = null> = ActionResponse & { success: true };
type ErrorResponse<T = undefined> = ActionResponse & { success: false };
type APIErrorResponse = NextResponse<ErrorResponse>;
type APIResponse<T = null> = NextResponse<SccessResponse<T> | ErrorResponse>;
