import { Body, Controller, Delete, Get, Post, Query, Route } from "tsoa";

interface LoginRequest {
  email: string;
  password: string;
}

@Route()
export class ApiController extends Controller {

  @Get()
  public helloWorld() {
    return "Hello world!"
  }

  /**
   * Login a user.
   */
  @Post("login")
  public login(@Body() requestBody: LoginRequest) {
    // ...
    console.log(requestBody);

    return (requestBody)
  }

  @Delete("delete")
  public delete(@Query() id: string) {
    return "deleted";
  }

  /**
   * Logout the user.
   */
  @Post("logout")
  public logout() {
    // ...
    return;
  }
}
