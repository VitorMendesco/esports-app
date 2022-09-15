-- CreateTable
CREATE TABLE "Ad" (
    "idAd" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "yearsPlaying" INTEGER NOT NULL,
    "discord" TEXT NOT NULL,
    "weekDays" TEXT NOT NULL,
    "hoursStart" INTEGER NOT NULL,
    "hoursEnd" INTEGER NOT NULL,
    "useVoiceChannel" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fkGame" TEXT NOT NULL,
    CONSTRAINT "Ad_fkGame_fkey" FOREIGN KEY ("fkGame") REFERENCES "Game" ("idGame") ON DELETE RESTRICT ON UPDATE CASCADE
);
