import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "Luiz Gustavo Valter Valentin",
      email: "luiz.gustavo1999@hotmail.com",
      avatarUrl: "https://github.com/LuizGVValentin1999.png",
    },
  });

  const pool = await prisma.pool.create({
    data: {
      title: "Example pool",
      code: "BOL123",
      ownerId: user.id,

      participants: {
        create: {
          userId: user.id,
        },
      },
    },
  });

  await prisma.game.create({
    data: {
      date: "2022-11-02T12:00:00.925Z",
      firstTeamCountryCode: "DE",
      secondTeamCountryCode: "BR",
    },
  });
  await prisma.game.create({
    data: {
      date: "2022-11-03T12:00:00.925Z",
      firstTeamCountryCode: "BR",
      secondTeamCountryCode: "AR",

      guesses: {
        create: {
          firstTeamPoints: 2,
          secondTeamPoints: 1,

          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id,
              },
            },
          },
        },
      },
    },
  });
}
main();