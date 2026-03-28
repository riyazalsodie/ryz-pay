import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

async function main() {
    const connectionString = process.env.DATABASE_URL!
    const pool = new pg.Pool({ connectionString })
    const adapter = new PrismaPg(pool)
    const prisma = new PrismaClient({ adapter })

    try {
        const u = await prisma.user.upsert({
            where: { email: 'admin@ryzpay.com' },
            update: {},
            create: {
                email: 'admin@ryzpay.com',
                name: 'Admin',
                role: 'admin'
            }
        });
        console.log('User found/created:', u.id);

        const t = await prisma.transaction.upsert({
            where: { id: '7qwbSv7Cz4p9m5qURVZg' },
            update: { status: 'PENDING' },
            create: {
                id: '7qwbSv7Cz4p9m5qURVZg',
                paymentId: '7qwbSv7Cz4p9m5qURVZg',
                amount: 2200,
                currency: 'BDT',
                status: 'PENDING',
                userId: u.id,
                method: 'Manual'
            }
        });
        console.log('Transaction seeded:', t.id);

    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
        await pool.end();
    }
}

main();
