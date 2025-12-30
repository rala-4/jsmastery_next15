import { NextResponse } from "next/server";

import Account from "@/database/account.model";
import { NotFoudError, ValidationError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { APIErrorResponse } from "@/types/globals";
import { AccountSchema } from "@/lib/validaios";
import handleError from "@/lib/handlers/errors";

export async function POST(request: Request) {
  const { providerAccountId } = await request.json();

  try {
    await dbConnect();

    const validatedData = AccountSchema.partial().safeParse({
      providerAccountId,
    });
    if (!validatedData.success)
      throw new ValidationError(validatedData.error.flatten().fieldErrors);

    const account = await Account.findOne({ providerAccountId });
    if (!account) throw new NotFoudError("Account");

    return NextResponse.json(
      {
        success: true,
        data: account,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
