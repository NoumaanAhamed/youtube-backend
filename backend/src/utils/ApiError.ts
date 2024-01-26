class ApiError extends Error {
  statusCode: number;
  errors: string[] | { message: string }[];
  data?: null | any;
  success: boolean = false;
  message: string;

  constructor(
    statusCode: number,
    message: string = "Something went wrong",
    errors: string[] | { message: string }[] = [],
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.data = null;
    this.message = message;
    this.success = false;

    if (stack) {
      // use provided stack trace
      this.stack = stack;
    } else {
      // capture stack trace
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };

// let flag = false;

// if (flag) {
//   throw new ApiError(404, "User not found");
// } else {
//   throw new Error("Server Error");
// }
