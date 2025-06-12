// utils/ApiResponse.ts
export default class ApiResponse {
  public status: number;
  public data: any;
  public message: string;
  public success: boolean;

  /**
   * Constructor for ApiResponse class.
   *
   * @param status - The status code of the response.
   * @param data - The data to be included in the response.
   * @param message - The message associated with the response.
   */
  constructor(status: number, data: any, message: string = 'Success') {
    this.status = status;
    this.data = data;
    this.message = message;
    this.success = status < 400;
  }
}