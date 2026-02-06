import { config as loadEnv } from 'dotenv';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/authz-prisma';

loadEnv({ path: 'apps/authz-service/.env.authz-service' });

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const financeAdmin = await prisma.role.upsert({
    where: { key: 'FINANCE_ADMIN' },
    update: {},
    create: { key: 'FINANCE_ADMIN' },
  });

  const accountant = await prisma.role.upsert({
    where: { key: 'ACCOUNTANT' },
    update: {},
    create: { key: 'ACCOUNTANT' },
  });

  const readInvoice = await prisma.permission.upsert({
    where: { key: 'invoice:read' },
    update: {},
    create: { key: 'invoice:read' },
  });

  const approveInvoice = await prisma.permission.upsert({
    where: { key: 'invoice:approve' },
    update: {},
    create: { key: 'invoice:approve' },
  });

  await prisma.rolePermission.upsert({
    where: {
      roleId_permissionId: {
        roleId: financeAdmin.id,
        permissionId: readInvoice.id,
      },
    },
    update: {},
    create: { roleId: financeAdmin.id, permissionId: readInvoice.id },
  });

  await prisma.rolePermission.upsert({
    where: {
      roleId_permissionId: {
        roleId: financeAdmin.id,
        permissionId: approveInvoice.id,
      },
    },
    update: {},
    create: { roleId: financeAdmin.id, permissionId: approveInvoice.id },
  });

  await prisma.rolePermission.upsert({
    where: {
      roleId_permissionId: {
        roleId: accountant.id,
        permissionId: readInvoice.id,
      },
    },
    update: {},
    create: { roleId: accountant.id, permissionId: readInvoice.id },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
