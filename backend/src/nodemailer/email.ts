import { sendMail } from './nodemailer.config';
import { VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, PASSWORD_CHANGED_EMAIL_TEMPLATE } from './nodemailerTemplate';


interface PasswordChangeMeta {
    ip?: string;
    device?: string;
    city?: string;
    country?: string;
    userAgent?: string;
}


export const sendverificationEmail = async (email: string, verificationCode: string) => {

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

export const sendForgetEmail = async (email: string, resetURL: string) => {
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
export const sendResetEmail = async (email: string) => {

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

export const sendPasswordChangedEmail = async (
    user: { name?: string; email: string },
    meta: PasswordChangeMeta = {}
) => {
    try {
        const now = new Date();
        const ethiopiaTime = new Date(now.toLocaleString('en-US', { timeZone: 'Africa/Addis_Ababa' }));

        const formattedDate = ethiopiaTime.toLocaleDateString('en-GB', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

        const formattedTime = ethiopiaTime.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });

        const location = meta.city
            ? `${meta.city}, ${meta.country || 'Ethiopia'}`
            : 'Addis Ababa, Ethiopia';

        const device = meta.device || meta.userAgent?.includes('Mobile')
            ? 'Mobile Device'
            : 'Desktop/Laptop';

        const html = PASSWORD_CHANGED_EMAIL_TEMPLATE
            .replace(/{userName}/g, user.name || user.email.split('@')[0])
            .replace(/{date}/g, formattedDate)
            .replace(/{time}/g, formattedTime)
            .replace(/{timeZone}/g, 'EAT (Eastern Africa Time)')
            .replace(/{device}/g, device)
            .replace(/{location}/g, location)
            .replace(/{ipAddress}/g, meta.ip || 'Not detected')
            .replace(/{supportLink}/g, `${process.env.FRONTEND_URL}/contact`)
            .replace(/{loginLink}/g, `${process.env.FRONTEND_URL}/login`);

        await sendMail({
            sendTo: user.email,
            subject: 'Your password was changed',
            html,
        });

        console.log(`Password changed email sent to ${user.email}`);
    } catch (error) {
        console.error('Error sending password changed email:', error);
    }
};