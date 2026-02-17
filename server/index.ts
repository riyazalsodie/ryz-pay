import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { swagger } from '@elysiajs/swagger';
import * as Sentry from "@sentry/bun";
import { auth } from './auth';
import { prisma } from '../src/lib/db';

Sentry.init({
    dsn: process.env.SENTRY_DSN || "",
    tracesSampleRate: 1.0,
});

const app = new Elysia()
    .use(cors())
    .use(swagger())
    .onError(({ error, code }) => {
        Sentry.captureException(error);
        console.error(`Elysia Error [${code}]:`, error);
        return { error: error.message };
    })
    .all('/api/auth/*', (ctx) => auth.handler(ctx.request))
    .get('/', () => 'Elysia Backend with Sentry is running')
    .group('/api', (app) =>
        app.get('/payment-methods', async () => {
            try {
                // Try to get from DB
                const methods = await prisma.paymentMethod.findMany({
                    where: { active: true }
                });
                if (methods.length > 0) return methods;

                // Fallback to mock data if DB is empty but connected
                throw new Error("No payment methods found in DB");
            } catch (error: any) {
                console.warn("DB Connection failed or empty, returning mock data for build/dev:", error.message);
                Sentry.captureException(error);

                // Hardcoded fallback for build/dev stability
                return [
                    { name: 'bKash', icon: 'bkash.png', active: true, config: {} },
                    { name: 'Nagad', icon: 'nagad.png', active: true, config: {} },
                    { name: 'Rocket', icon: 'rocket.png', active: true, config: {} },
                    { name: 'Upay', icon: 'upay.png', active: true, config: {} },
                ];
            }
        })
            .post('/transactions', async ({ body }: { body: any }) => {
                const { amount, currency, method, userId } = body;
                try {
                    return await prisma.transaction.create({
                        data: {
                            amount,
                            currency,
                            method,
                            userId,
                            status: 'PENDING'
                        }
                    });
                } catch (error) {
                    Sentry.captureException(error);
                    throw error;
                }
            })
    )
    .listen(3001);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
