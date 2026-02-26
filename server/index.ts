import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import * as Sentry from "@sentry/bun";
import { auth } from "./auth";
import { prisma } from "../src/lib/db";

Sentry.init({
  dsn: process.env.SENTRY_DSN || "",
  tracesSampleRate: 1.0,
});

const app = new Elysia()
  .use(
    cors({
      origin: true,
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"],
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    }),
  )
  .all("/api/auth/*", async (ctx) => {
    return await auth.handler(ctx.request);
  })
  .use(swagger())
  .onError(({ error, code }) => {
    Sentry.captureException(error);
    console.error(`Elysia Error [${code}]:`, error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return { error: errorMessage };
  })
  .get("/", () => "Elysia Backend with Sentry is running")
  .group("/api", (app) =>
    app
      .get("/payment-methods", async () => {
        try {
          const methods = await prisma.paymentMethod.findMany({
            where: { active: true },
          });
          if (methods.length > 0) return methods;
          throw new Error("No payment methods found in DB");
        } catch (error: any) {
          console.warn(
            "DB Connection failed or empty, returning mock data for build/dev:",
            error.message,
          );
          Sentry.captureException(error);
          return [
            { name: "bKash", icon: "bkash.png", active: true, config: {} },
            { name: "Nagad", icon: "nagad.png", active: true, config: {} },
            { name: "Rocket", icon: "rocket.png", active: true, config: {} },
            { name: "Upay", icon: "upay.png", active: true, config: {} },
          ];
        }
      })
      .get("/transactions", async () => {
        try {
          return await prisma.transaction.findMany({
            include: {
              user: {
                select: {
                  name: true,
                  email: true,
                },
              },
            },
            orderBy: {
              createdAt: "desc",
            },
          });
        } catch (error) {
          Sentry.captureException(error);
          throw error;
        }
      })
      .post("/transactions", async ({ body }: { body: any }) => {
        const { amount, currency, method, userId } = body;
        try {
          return await prisma.transaction.create({
            data: {
              amount,
              currency,
              method,
              userId,
              status: "PENDING",
            },
          });
        } catch (error) {
          Sentry.captureException(error);
          throw error;
        }
      })
      .get("/gateways", async () => {
        try {
          return await prisma.gateway.findMany({
            orderBy: { createdAt: "desc" },
          });
        } catch (error: any) {
          console.warn("DB Connection failed for gateways:", error.message);
          Sentry.captureException(error);
          return [];
        }
      })
      .get("/gateways/:id", async ({ params }: { params: { id: string } }) => {
        try {
          const gateway = await prisma.gateway.findUnique({
            where: { id: params.id },
          });
          if (!gateway) throw new Error("Gateway not found");
          return gateway;
        } catch (error: any) {
          console.warn("DB Connection failed for gateway:", error.message);
          Sentry.captureException(error);
          return null;
        }
      })
      .post("/gateways", async ({ body }: { body: any }) => {
        try {
          return await prisma.gateway.create({
            data: body,
          });
        } catch (error) {
          Sentry.captureException(error);
          throw error;
        }
      })
      .put(
        "/gateways/:id",
        async ({ params, body }: { params: { id: string }; body: any }) => {
          try {
            return await prisma.gateway.update({
              where: { id: params.id },
              data: body,
            });
          } catch (error) {
            Sentry.captureException(error);
            throw error;
          }
        },
      )
      .patch(
        "/gateways/:id/status",
        async ({ params, body }: { params: { id: string }; body: any }) => {
          try {
            return await prisma.gateway.update({
              where: { id: params.id },
              data: { status: body.status },
            });
          } catch (error) {
            Sentry.captureException(error);
            throw error;
          }
        },
      )
      .delete(
        "/gateways/:id",
        async ({ params }: { params: { id: string } }) => {
          try {
            return await prisma.gateway.delete({
              where: { id: params.id },
            });
          } catch (error) {
            Sentry.captureException(error);
            throw error;
          }
        },
      )
      .get("/admin/customers", async () => {
        try {
          const customers = await prisma.user.findMany({
            where: { role: "user" },
            orderBy: { createdAt: "desc" },
          });
          return { customers, total: customers.length };
        } catch (error) {
          Sentry.captureException(error);
          return { customers: [], total: 0 };
        }
      })
      .get("/admin/invoices", async () => {
        try {
          return { invoices: [], total: 0 };
        } catch (error) {
          Sentry.captureException(error);
          return { invoices: [], total: 0 };
        }
      })
      .get("/admin/payment-links", async () => {
        try {
          return { links: [], total: 0 };
        } catch (error) {
          Sentry.captureException(error);
          return { links: [], total: 0 };
        }
      })
      .get("/admin/sms-data", async () => {
        try {
          return { smsData: [], total: 0 };
        } catch (error) {
          Sentry.captureException(error);
          return { smsData: [], total: 0 };
        }
      }),
  )
  .listen({
    port: process.env.PORT || 3201,
    hostname: "0.0.0.0",
  });

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
