import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon';

@Injectable({})

export class AuthService
{
    constructor(private prisma:PrismaService){}
    login(){
        return "I am logged in";
    }
    async signup(dto:AuthDto){
        //generate the password hash
        const hash=await argon.hash(dto.password);

        //save the new user in db
        const user=await this.prisma.user.create({
            data:{
                email:dto.email,
                hash,
            },
        });
        //return the saved user
        return user;

        return "I am signed in";
    }
}


