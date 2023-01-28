import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()


async function main() {

  const alice = await prisma.user.upsert({
    where: {},
    update: {},
    create: {
      username: "anime",
      email: 'alice@prisma.io',
      passwordHash: 'e2r3erhgy4gtdfergh',
      posts: {
        create: {
          name: 'Check out Prisma with Next.js',
          description: 'https://www.prisma.io/nextjs',
          expires: new Date(),
          isCompleted: false,
          status: 'IN_WORK'
        },
      },
    },
  })

  const bob = await prisma.user.upsert({
    where: {},
    update: {},
    create: {
      email: 'bob@prisma.io',
      username: 'Hentai',
      passwordHash: 'SDfgdhryu46y46yhge5tr',
      posts: {
        create: [
          {
            name: 'Follow Prisma on Twitter',
            description: 'https://twitter.com/prisma',
            expires: new Date(),
            isCompleted: false,
            status: 'IN_WORK'
          },
          {
            name: 'Follow Prisma on Twitter',
            description: 'https://twitter.com/prisma',
            expires: new Date(),
            isCompleted: false,
            status: 'IN_WORK'
          },
        ],
      },
    },
  })
  console.log({ alice, bob })
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