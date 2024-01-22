class ApiError extends Error {
  statusCode: number;
  errors: string[] | { message: string }[];
  data?: null | any;
  success: boolean = false;

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
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

// const apiError = new ApiError(404, "Not Found");
// console.log(apiError);
