import { mailtrapClient, sender } from './mailtrap.config';
import { VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } from './mailtrapTemplate';

export const sendverificationEmail = async (email:string, verificationCode:string) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: 'verify your email',
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationCode),
            category: "Email Verification"
        })
        console.log('email success', response)
    } catch (error) {
        console.error('error sending verfication', error)
        throw new Error(`Error sending verifcation email:${error}`)
    }

}


export const sendForgetEmail = async (email:string, resetURL:string) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: 'Reset your password',
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: "password reset"
        })
        console.log('email success', response)

    } catch (error) {
        console.error('error sending verfication', error)
        // throw new Error(`Error sending password reset email:${error}`)
    }
}
export const sendResetEmail = async (email:string) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: 'Your password was reset successfully',
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "password-reset-success"

        })
        console.log('email success', response)

    } catch (error) {
        console.error('error sending verfication', error)
        // throw new Error(`Error sending  reset success email:${error}`)

    }
}