import 'dotenv/config';
import { generateAccessToken, generateRefreshToken } from '../utils/generateToken'
import { randomInt , randomBytes } from 'crypto';
import prisma from '../config/prisma'
import bcrypt from 'bcrypt'
import { sendverificationEmail  ,sendForgetEmail ,sendResetEmail} from '../mailtrap/email';
import { AppError } from '../utils/AppError';




export async function registerUser(name:string , password:string , email:string){

    const user = await prisma.user.findUnique({
        where:{email:email}
    })
      if(user) throw new AppError('User already exists with this email' , 409);
         const hashedpwd = await bcrypt.hash(password, 10);
        
        const otpCode = randomInt(100000, 999999).toString();
        const otpExpires = new Date(Date.now() + 1 * 60 * 60 * 1000);
       
       await prisma.user.create({
            data:{
                name,
                email,
                password:hashedpwd,
                verified:false,
                otpCode,
                otpExpires,
            }
         })
    await sendverificationEmail(email, otpCode);


}

export async function verifyOtp(otp:string) {
    const foundUser = await prisma.user.findFirst({
        where:{
            otpCode:otp,
            otpExpires:{
                gt:new Date()
            }
        }
    })
    if (!foundUser) throw new AppError('otp invalid or expired' ,400);

    const accessToken = generateAccessToken( foundUser.role , foundUser.id);
    const refreshToken = generateRefreshToken(foundUser.id);

    // modifing user
    await prisma.user.update({
        where:{id:foundUser.id},
        data:{
            verified:true,
            otpCode:null,
            otpExpires:null,
            refreshToken:refreshToken
            
        }
    })
    return {user:{id:foundUser.id , email:foundUser.email , name:foundUser.name} , tokens:{accessToken , refreshToken}};
}

export async function login(email:string , password:string){
        const user = await prisma.user.findUnique({
            where:{email}
        })

        if(!user) throw new AppError('user not found' , 404);
        const isMatch = await bcrypt.compare(password ,user.password)
        if(!isMatch) throw new AppError('password is incorrect' , 400);
        if(user.verified === false) throw new AppError('Please verify your email before logging in' , 403); 


        const accessToken =generateAccessToken(user.role , user.id)
        const refreshToken = generateRefreshToken(user.id)
        
         await prisma.user.update({
        where:{id:user.id},
        data:{
            refreshToken:refreshToken
            
        }
    })
            return {user:{id:user.id , email:user.email , name:user.name} , tokens:{accessToken , refreshToken}};

}

// export async function logout(refreshToken) {
//     const foundUser = userRepo.findUserByRefresh(refreshToken)
//     if(foundUser){
//         delete foundUser.refreshToken;
//         userRepo.updateUser(foundUser);
//         await userRepo.save();
//         return true;
//     }
//      return false;
// }

// export async function forgetPwd(email){
//     const foundUser= userRepo.findUserByEmail(email)
//     if(!foundUser) throw new Error('user not found')
//      const resetToken=randomBytes(20).toString("hex");
//      const restPwdExpireAt= Date.now()  + 1*60*60*1000;
//      const currentUser={...foundUser ,resetToken,restPwdExpireAt}
//       userRepo.updateUser(currentUser);
//       await userRepo.save();

//      await sendForgetEmail(email ,`${process.env.CLIENT_END_POINT}/api/auth/forget-pass/${resetToken}`)  
// }
// export async function restPwd(token , pwd){
//     const foundUser= userRepo.findUserByToken(token)
//     if(!foundUser || foundUser.restPwdExpireAt < Date.now()) throw new Error('user not found or token expired')
//      const hashedpwd = await bcrypt.hash(pwd, 10); 
     
//      const currentUser= {...foundUser , password:hashedpwd ,resetToken:undefined , restPwdExpireAt:undefined}
//      userRepo.updateUser(currentUser);
//      await userRepo.save();
//      await sendResetEmail(email)  
// }