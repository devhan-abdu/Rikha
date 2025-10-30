import prisma from "../config/prisma"

export const checkAccount = async (providerId: string, provider: string, email: string, name: string) => {

    const oauthAccount = await prisma.oAuthAccount.findUnique({
        where: { providerId },
        include: { user: true }
    })
    if (oauthAccount) return oauthAccount.user

    const existingUser = await prisma.user.findUnique({
        where: { email }
    })
    if (existingUser) {
        await prisma.oAuthAccount.create({
            data: {
                provider,
                providerId,
                userId: existingUser.id
            }
        })
        return existingUser
    } else {
        const newUser = await prisma.user.create({
            data: {
                email: email,
                name: name,
                verified: true,
                oauthAccounts: {
                    create: { provider, providerId }
                }
            }
        })

        return newUser
    }
}