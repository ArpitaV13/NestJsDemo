import { Body, Controller, ParseIntPipe, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";

@Controller('auth')

export class AuthController{
    constructor(private authservice:AuthService) {}

        @Post('login')
        login(){
            return this.authservice.login();
        }

        @Post('signup')
        signup(@Body() dto:AuthDto){
          return this.authservice.signup(dto);
        }
    
}