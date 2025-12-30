import { NextResponse } from "next/server";

import Account from "@/database/account.model";
import { NotFoudError, ValidationError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { APIErrorResponse } from "@/types/globals";
import handleError from "@/lib/handlers/errors";
import { AccountSchema } from "@/lib/validaios";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) throw new NotFoudError("Account");

  try {
    await dbConnect();

    const account = await Account.findById(id);
    if (!account) throw new NotFoudError("Account");

    return NextResponse.json(
      {
        success: true,
        data: account,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) throw new NotFoudError("Account");

  try {
    await dbConnect();
    const body = await request.json();

    const validatedData = AccountSchema.partial().safeParse(body);
    if (!validatedData.success)
      throw new ValidationError(validatedData.error.flatten().fieldErrors);

    const updatedAccount = await Account.findByIdAndUpdate(id, validatedData, {
      new: true,
    });
    if (!updatedAccount) throw new NotFoudError("Account");

    return NextResponse.json(
      {
        success: true,
        data: updatedAccount,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) throw new NotFoudError("Account");

  try {
    await dbConnect();

    const deletedAccount = await Account.findByIdAndDelete(id);
    if (!deletedAccount) throw new NotFoudError("Account");

    return NextResponse.json(
      { success: true, data: deletedAccount },
      { status: 204 }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
