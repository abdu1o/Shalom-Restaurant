import { prisma } from './prisma-client';
import { hashSync } from 'bcrypt';

async function create() {
    await prisma.user.createMany({
        data: [
            {
                fullName: "test",
                email: "test_email@gmail.com",
                password: hashSync('22222', 10),
                verified: true,
                role: "User"
            },
            {
                fullName: "testAdmin",
                email: "admin@gmail.com",
                password: hashSync('11111', 10),
                verified: true,
                role: "Admin"
            },
        ]
    });
    
}

async function destroy() {
    await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
}

async function main() {
    try {
        await destroy();
        await create();
    } catch (e) {
        console.error(e);
    }
}

main().then(async () => {
    await prisma.$disconnect();
}).catch(async(e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});