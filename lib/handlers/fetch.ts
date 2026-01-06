import { ActionResponse } from "@/types/globals";
import { RequestError } from "../http-errors";
import logger from "../logger";
import handleError from "./errors";
interface FetchOptions extends RequestInit {
  timeout?: number;
}
function isError(error: unknown): error is Error {
  return error instanceof Error;
}
export async function fetchHandler<T>(
  url: string,
  options: FetchOptions = {}
): Promise<ActionResponse<T>> {
  const {
    headers: customHeaders = {},
    timeout = 10000,
    ...restOptions
  } = options;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  const headers = { ...defaultHeaders, ...customHeaders };
  const config: RequestInit = {
    ...restOptions,
    headers,
    signal: controller.signal,
  };
  try {
    const response = await fetch(url, config);
    clearTimeout(id);
    if (!response.ok) {
      throw new RequestError(
        response.status,
        `http error status: ${response.status}`
      );
    }
    return await response.json();
  } catch (err) {
    const error = isError(err) ? err : new Error("unknown Error");
    if (error.name === "AbortError") {
      logger.warn(`Request timed out for ${url}`);
    } else {
      logger.error(`Fetch error for ${url}: ${error.message}`);
    }
    return handleError(error) as ActionResponse<T>;
  }
}
