import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { Body, Controller, Post, Response, Route } from 'tsoa';

// **** Types **** //

interface ILoginReq {
  email: string;
  password: string;
}

// **** Functions **** //

@Route('Auth')
export class AuthController extends Controller {
  /**
   * Login a user.
   */
  @Post('login')
  @Response(HttpStatusCodes.OK)
  public login(@Body() requestBody: ILoginReq) {
    // Setup Admin Cookie
    // ...
    console.log(requestBody);
  }

  /**
   * Logout the user.
   */
  @Response(HttpStatusCodes.OK)
  @Post('logout')
  public logout() {
    // ...
    return;
  }
}
