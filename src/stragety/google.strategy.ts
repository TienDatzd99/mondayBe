/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-google-oauth20";
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(private  configService: ConfigService) {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID || 'google-client-id',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ,
            callbackURL: 'http://localhost:8080/auth/google/callback',
            scope: ['email', 'profile'],
        });
    }
    async validate(accessToken: string, refreshToken: string, profile: any, done: any) {
        const { name, emails, photos } = profile;
        const user = {
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
            picture: photos[0].value,
        };
        done(null, user);
    }
}