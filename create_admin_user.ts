import { auth } from './server/auth'
import { prisma } from './src/lib/db'

async function main() {
    console.log("Creating admin user...")
    try {
        const user = await auth.api.signUpEmail({
            body: {
                email: "admin@ryzpay.com",
                password: "password123",
                name: "Admin User"
            }
        })
        
        if (user) {
            console.log("User created:", user)
            
            // Update role to admin
            // The user object might be wrapped in a response or be the user itself
            // Let's check the user email to find the ID
            
            const dbUser = await prisma.user.findUnique({
                where: { email: "admin@ryzpay.com" }
            })
            
            if (dbUser) {
                await prisma.user.update({
                    where: { id: dbUser.id },
                    data: { role: "admin" }
                })
                console.log("User role updated to admin.")
                console.log("Email: admin@ryzpay.com")
                console.log("Password: password123")
            } else {
                console.error("User not found in DB after creation.")
            }
        }
    } catch (e) {
        console.error("Error creating user:", e)
        // If user already exists, try to update role
        const dbUser = await prisma.user.findUnique({
            where: { email: "admin@ryzpay.com" }
        })
         if (dbUser) {
            await prisma.user.update({
                where: { id: dbUser.id },
                data: { role: "admin" }
            })
            console.log("User already exists. Role updated to admin.")
            console.log("Email: admin@ryzpay.com")
            // Password is unknown if already exists, but we can try to sign in or just reset it if needed.
            // But we can't reset password easily without knowing the hashing.
            // However, we can create a NEW admin if this one fails.
        }
    }
}

main()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect()
    })
