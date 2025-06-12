// utils/ApiError.ts
export default class ApiError extends Error {
  public status: number;
  public data: null;
  public message: string;
  public success: boolean;
  public errors: any[];

  /**
   * Constructor for ApiError class.
   *
   * @param status - The status code of the error.
   * @param message - The error message (default: 'Something went wrong').
   * @param errors - Array of errors (default: empty).
   * @param stack - The stack trace (default: empty).
   */
  constructor(
    status: number,
    message: string = 'Something went wrong',
    errors: any[] = [],
    stack: string = ''
  ) {
    super(message);
    this.status = status;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors;
    
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}