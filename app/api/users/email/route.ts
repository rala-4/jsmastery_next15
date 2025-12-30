import User from "@/database/user.model";
import handleError from "@/lib/handlers/errors";
import { NotFoudError, ValidationError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { UserSchema } from "@/lib/validaios";
import { APIErrorResponse } from "@/types/globals";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email } = await request.json();
  try {
    await dbConnect();
    const validatedData = UserSchema.partial().safeParse({ email });
    if (!validatedData.success)
      throw new ValidationError(validatedData.error.flatten().fieldErrors);
    const user = await User.findOne({ email });
    if (!user) throw new NotFoudError("User");
    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
