import User from "@/database/user.model";
import handleError from "@/lib/handlers/errors";
import { ValidationError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { UserSchema } from "@/lib/validaios";
import { APIErrorResponse } from "@/types/globals";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const users = await User.find();
    return NextResponse.json({ success: true, data: users }, { status: 200 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const validatedData = UserSchema.safeParse(body);
    if (!validatedData.success) {
      throw new ValidationError(validatedData.error.flatten().fieldErrors);
    }
    const { email, username } = validatedData.data;
    const exsitingUser = await User.findOne({ email });
    if (exsitingUser) {
      throw new Error("this email user is exsit");
    }
    const exsitingusername = await User.findOne({ username });
    if (exsitingusername) {
      throw new Error("this email username is exsit");
    }
    const newUser = await User.create(validatedData.data);
    return NextResponse.json({ success: true, data: newUser }, { status: 201 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
