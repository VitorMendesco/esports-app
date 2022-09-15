import express from "express";
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient({
  log: ['error'],
});

// list games
app.get('/games', async (req, res) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        }
      }
    }
  });

  return res.json(games);
})

// publish ads
app.post('/ads', (req, res) => {
  return res.status(201).json([]);
})

// list ads by games
app.get("/games/:id/ads", async (req, res) => {
  const fkGame = req.params.id;

  const ads = await prisma.ad.findMany({
    select: {
      idAd: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hoursStart: true,
      hoursEnd: true,
    },
    where: {
      fkGame
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return res.json(ads.map(ad => {
    return {
      ...ad,
      weekDays: ad.weekDays.split(',')
    }
  }));
});

app.get("/ads/:id/discord", async (req, res) => {
  const idAd = req.params.id;

  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      idAd
    }
  });

  return res.json({
    discord: ad.discord,
  });
})

app.listen(3333);
