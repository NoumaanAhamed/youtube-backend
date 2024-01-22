class ApiResponse {
  statusCode: number;
  message: string;
  data?: null | any;
  success: boolean = true;

  constructor(
    statusCode: number,
    message: string = "Success",
    data?: null | any
  ) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.success = statusCode < 400;
  }
}

const successApiResponse = new ApiResponse(400);
console.log(successApiResponse);

export { ApiResponse };
