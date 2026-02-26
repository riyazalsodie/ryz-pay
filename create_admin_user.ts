import { auth } from "./server/auth";
import { prisma } from "./src/lib/db";

async function main() {
  console.log("Creating admin user...");
  try {
    const user = await auth.api.signUpEmail({
      body: {
        email: "admin@gmail.com",
        password: "admin123",
        name: "Admin User",
      },
    });

    if (user) {
      console.log("User created:", user);

      const dbUser = await prisma.user.findUnique({
        where: { email: "admin@gmail.com" },
      });

      if (dbUser) {
        await prisma.user.update({
          where: { id: dbUser.id },
          data: { role: "admin" },
        });
        console.log("User role updated to admin.");
        console.log("Email: admin@gmail.com");
        console.log("Password: admin123");
      } else {
        console.error("User not found in DB after creation.");
      }
    }
  } catch (e) {
    console.error("Error creating user:", e);
    const dbUser = await prisma.user.findUnique({
      where: { email: "admin@gmail.com" },
    });
    if (dbUser) {
      await prisma.user.update({
        where: { id: dbUser.id },
        data: { role: "admin" },
      });
      console.log("User already exists. Role updated to admin.");
      console.log("Email: admin@gmail.com");
    }
  }
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
