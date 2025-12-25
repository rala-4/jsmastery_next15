// app/api/login/route.ts
// import { NextResponse } from "next/server";
// import { formatResponse } from "@/lib/utils"; // importing your function

// export async function POST(req: Request) {
//   try {
//     // ... logic that might fail ...
//     throw new Error("Database connection failed");
//   } catch (error) {
//     // We are in an API Route, so we use type "api"
//     return formatResponse("api", 500, "Internal Server Error", {
//       system: ["Db failed"],
//     });
//   }
// }

import { NextResponse } from "next/server";
import { RequestError, ValidationError } from "../http-errors";
import { ZodError } from "zod";

export type ResponseType = "api" | "server";

export const formatResponse = (
  responseType: ResponseType,
  status: number,
  message: string,
  errors?: Record<string, string[]> | undefined
) => {
  const responseContent = {
    success: false,
    error: { message, details: errors },
  };
  return responseType === "api"
    ? NextResponse.json(responseContent, { status })
    : { status, ...responseContent };
};
const handleError = (error: unknown, responseType: ResponseType = "server") => {
  if (error instanceof RequestError) {
    return formatResponse(
      responseType,
      error.statusCode,
      error.message,
      error.errors
    );
  }
  if (error instanceof ZodError) {
    const validationError = new ValidationError(
      //flatern to get only one array if we have array of array
      error.flatten().fieldErrors as Record<string, string[]>
    );
    return formatResponse(
      responseType,
      validationError.statusCode,
      validationError.message,
      validationError.errors
    );
  }
  if (error instanceof Error) {
    return formatResponse(responseType, 500, error.message);
  }
  return formatResponse(responseType, 500, "Unexpected error");
};
export default handleError;
