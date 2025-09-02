import {sendMail } from './nodemailer.config';
import { VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } from './nodemailerTemplate';

export const sendverificationEmail = async (email:string, verificationCode:string) => {
    
    try {
         await sendMail({
            sendTo: email,
            subject: 'verify your email',
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationCode),
        })
    } catch (error) {
        console.error('error sending verfication', error)
        throw new Error(`Error sending verifcation email`)
    }

}


export const sendForgetEmail = async (email:string, resetURL:string) => {
    try {
        const response = await sendMail({
            sendTo: email,
            subject: 'Reset your password',
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
        })

    } catch (error) {
        console.error('error sending verfication', error)
        throw new Error(`Error sending password reset email`)
    }
}
export const sendResetEmail = async (email:string) => {

    try {
        const response = await sendMail({
            sendTo: email,
            subject: 'Your password was reset successfully',
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
        })

    } catch (error) {
        console.error('error sending verfication', error)
        throw new Error(`Error sending  reset success email`)

    }
}