import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

const connectionString = process.env.DATABASE_URL!
const pool = new pg.Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
    const methods = [
        { name: 'bKash', icon: 'bkash.png', active: true, config: JSON.stringify({ type: 'personal' }) },
        { name: 'Nagad', icon: 'nagad.png', active: true, config: JSON.stringify({ type: 'personal' }) },
        { name: 'Rocket', icon: 'rocket.png', active: true, config: JSON.stringify({ type: 'personal' }) },
        { name: 'Upay', icon: 'upay.png', active: true, config: JSON.stringify({ type: 'personal' }) },
    ]

    for (const method of methods) {
        await prisma.paymentMethod.upsert({
            where: { name: method.name },
            update: {
                ...method,
                updatedAt: new Date()
            },
            create: method,
        })
    }
    console.log('Seed completed.')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
