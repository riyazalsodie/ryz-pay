import { auth } from './server/auth'
import { prisma } from './src/lib/db'

async function main() {
    console.log("Creating admin user...")
    const email = "a@gmail.com"
    const password = "admin123"
    const name = "Admin User"

    try {
        // Attempt to create the user
        const result = await auth.api.signUpEmail({
            body: {
                email,
                password,
                name
            }
        })
        
        if (result) {
            console.log("User created successfully.")
        }
    } catch (e) {
        console.log("User might already exist or error occurred:", e.message)
    }

    // Now update the role to admin regardless of whether it was just created or already existed
    try {
        const dbUser = await prisma.user.findUnique({
            where: { email }
        })
        
        if (dbUser) {
            await prisma.user.update({
                where: { id: dbUser.id },
                data: { role: "admin" }
            })
            console.log(`User ${email} role updated to 'admin'.`)
            console.log(`Credentials:`)
            console.log(`Email: ${email}`)
            console.log(`Password: ${password}`)
        } else {
            console.error(`User ${email} not found in DB even after attempted creation.`)
        }
    } catch (e) {
        console.error("Error updating user role:", e)
    }
}

main()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect()
    })
