// prisma/seed.mjs
import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'changeme';

async function main() {
  console.log('Running seed script...');

  // Create roles
  const roles = ['admin', 'user'];
  for (const name of roles) {
    await prisma.role.upsert({
      where: { name },
      update: {},
      create: { name },
    });
    console.log(`Role ensured: ${name}`);
  }

  // Hash password
  const hashed = await bcrypt.hash(ADMIN_PASSWORD, 10);

  // Create or update admin user
  const admin = await prisma.user.upsert({
    where: { email: ADMIN_EMAIL },
    update: {
      password: hashed,
      role: { connect: { name: 'admin' } },
    },
    create: {
      email: ADMIN_EMAIL,
      password: hashed,
      role: { connect: { name: 'admin' } },
    },
  });

  console.log('Admin user upserted:', admin.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

