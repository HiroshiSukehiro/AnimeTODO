import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()


async function main() {

  const alice = await prisma.user.create({
    data: {
      username: "anime",
      email: 'alice@prisma.io',
      passwordHash: 'e2r3erhgy4gtdfergh',
      tasks: {
        create: {
          name: 'Check out Prisma with Next.js',
          description: 'https://www.prisma.io/nextjs',
          expires: new Date().toISOString(),
          isCompleted: false,
          status: 'IN_WORK'
        },
      },
    },
  })

  const bob = await prisma.user.create({
    data: {
      username: 'Hentai',
      email: 'bob@prisma.io',
      passwordHash: 'SDfgdhryu46y46yhge5tr',
      tasks: {
        create: [
          {
            name: 'Follow Prisma on Twitter',
            description: 'https://twitter.com/prisma',
            expires: new Date().toISOString(),
            isCompleted: false,
            status: 'IN_WORK'
          },
          {
            name: 'Follow Prisma on Twitter',
            description: 'https://twitter.com/prisma',
            expires: new Date().toISOString(),
            isCompleted: false,
            status: 'IN_WORK'
          },
        ],
      },
    },
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })