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
    .onAfterHandle(({ error }) => {
        if (error) Sentry.captureException(error);
    })
    .all('/api/auth/*', (ctx) => auth.handler(ctx.request))
    .get('/', () => 'Elysia Backend with Sentry is running')
    .group('/api', (app) =>
        app.get('/payment-methods', async () => {
            try {
                return await prisma.paymentMethod.findMany({
                    where: { active: true }
                });
            } catch (error) {
                Sentry.captureException(error);
                throw error;
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
