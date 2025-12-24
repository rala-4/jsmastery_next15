export class RequestError extends Error {
  statusCode: number;
  //(e.g., email: ["Required", "Invalid format"])
  errors?: Record<string, string[]>;
  constructor(
    statusCode: number,
    message: string,
    errors?: Record<string, string[]>
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.name = "RequestError";
  }
}
export class ValidationError extends RequestError {
  constructor(fieldErros: Record<string, string[]>) {
    const message = ValidationError.formatFieldErrors(fieldErros);
    super(400, message, fieldErros);
    this.name = "ValidationError";
  }
  static formatFieldErrors(errors: Record<string, string[]>): string {
    const formattedMessage = Object.entries(errors).map(([field, messages]) => {
      const fieldName = field.charAt(0).toUpperCase() + field.slice(1);
      if (messages[0] === "Required") {
        return `${fieldName} is required`;
      } else {
        return messages.join("and");
      }
    });
    return formattedMessage.join(",");
  }
}
export class NotFoudError extends RequestError {
  constructor(resource: string) {
    super(404, `${resource} not found`);
    this.name = "NotFoudError";
  }
}
export class ForbiddenError extends RequestError {
  constructor(message: string = "Forbidden") {
    super(403, message);
    this.name = "ForbiddenError";
  }
}
export class UnauthorizedError extends RequestError {
  constructor(message: string = "Unauthorized") {
    super(401, message);
    this.name = "UnauthorizedError";
  }
}
