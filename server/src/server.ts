import express from "express";
import cors from "cors";
import { PrismaClient } from '@prisma/client';
import { hoursToMinutes, minutesToHours } from "./utils/timer-converter";

const app = express();
app.use(express.json());
app.use(cors({
  // ADD DOMAINS HERE
}));

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
app.post('/games/:id/ads', async (req, res) => {
  const gameId = req.params.id;

  const body: any = req.body;
  const ad = await prisma.ad.create({
    data: {
      fkGame: gameId,
      name: body.name,
      weekDays: body.weekDays.join(","),
      useVoiceChannel: body.useVoiceChannel,
      yearsPlaying: body.yearsPlaying,
      hoursStart: hoursToMinutes(body.hoursStart),
      hoursEnd: hoursToMinutes(body.hoursEnd),
      discord: body.discord,
    }
  });

  return res.status(201).json(ad);
})

// list ads by games
app.get("/games/:id/ads", async (req, res) => {
  const fkGame = req.params.id;

  // PRISMA
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
      weekDays: ad.weekDays.split(','),
      hoursStart: minutesToHours(ad.hoursStart),
      hoursEnd: minutesToHours(ad.hoursEnd),
    }
  }));
});

// get discord by ad
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
