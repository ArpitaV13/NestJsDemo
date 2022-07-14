import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

@Injectable({})

export class AuthService
{
    constructor(private prisma:PrismaService){}

    async signup(dto:AuthDto){
        //generate the password hash
        const hash=await argon.hash(dto.password);

        //save the new user in db
        try{
        const user=await this.prisma.user.create({
            data:{
                email:dto.email,
                hash,
            },
            
        });
        //deleting the hash code because it is not a good practice
        delete user.hash;
        //return the saved user
        return user;
    }
    catch(error){
        if(error instanceof PrismaClientKnownRequestError)
        {
            if(error.code==='P2002'){
                throw new ForbiddenException("Credentials taken",)   
            }
        }
        throw error;
    }       
    }

    async login(dto:AuthDto){
        // find the user by email
        const user=await this.prisma.user.findUnique({
            where :{
                email:dto.email,
            },
        });

        // if the user does not exists throw exception
        if(!user ) throw new ForbiddenException("Credentials Incorrect");

        // compare password
        
        //if the password incorrect throw exception

        //return back the user
        return user;
    }
}


