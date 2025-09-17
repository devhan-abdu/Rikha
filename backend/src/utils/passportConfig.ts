import { Profile, Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { VerifyCallback } from 'passport-google-oauth20';
import passport from 'passport';
import prisma from '../config/prisma';
import { randomBytes } from 'crypto';
import dotenv from 'dotenv';
dotenv.config();


passport.use(new GoogleStrategy({
    clientID: process.env.CLIENTID as string,
    clientSecret: process.env.CLIENTSECRET as string,
    callbackURL: process.env.CALLBACK_URL as string,
    scope: ['profile', 'email'],
    state: true,
},
    async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
    try {
        const data = profile._json as {
            email: string;
            given_name?: string;
            family_name?: string;
            picture?: string;
        };

        let user = await prisma.user.findUnique({
            where: { email: data.email }
        });

        if (!user) {
            const newUser = await prisma.user.create({
                data: {
                    name: data.given_name ??'',
                    email: data.email,
                    password: randomBytes(20).toString('hex'),
                    verified: true,
                },
            });

            return done(null, newUser);
        }

        return done(null, user);
    } catch (error) {
        return done(error as Error, undefined);
    }
    
}));

passport.serializeUser((user: any, done) => {
    done(null,user.id);
})

passport.deserializeUser(async (id: number , done) =>{
    try {
       const user = await prisma.user.findUnique({ where: {id}});
       done(null , user || null)
    } catch(err) {
      done(err, null)
    }
})