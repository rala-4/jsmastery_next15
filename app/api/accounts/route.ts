import Account from "@/database/account.model";
import handleError from "@/lib/handlers/errors";
import { ForbiddenError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { AccountSchema } from "@/lib/validaios";
import { APIErrorResponse } from "@/types/globals";
import { NextResponse } from "next/server";
import { success } from "zod";

export async function GET() {
  try {
    await dbConnect();
    const accounts = await Account.find();
    return NextResponse.json(
      { success: true, data: accounts },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const validatedData = AccountSchema.parse(body);
    const exsitingAccount = await Account.findOne({
      provider: validatedData.provider,
      providerAccountId: validatedData.providerAccountId,
    });
    if (exsitingAccount)
      throw new ForbiddenError(
        "An account has the same provider account id is exsit"
      );
    const newAccount = await Account.create(validatedData);
    return NextResponse.json(
      { success: true, data: newAccount },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
