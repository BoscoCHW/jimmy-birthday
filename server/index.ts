import * as dotenv from "dotenv";
dotenv.config();
import webpush, { PushSubscription } from "web-push";
import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";
import { Prisma, PrismaClient } from "@prisma/client";

const app = express();
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, "../client", "build");

const prisma = new PrismaClient();

const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey!,
  privateVapidKey!
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(publicPath));
app.use(cors());

app.post("/api/save-subscription", async (req, res) => {
  const subscription = req.body as Prisma.SubscriptionCreateInput;
  const subs = await prisma.subscription.create({ data: subscription });
  res.json(subs);
});

app.post("/api/send-msg/", async (req, res) => {
  const subscriptions = await prisma.subscription.findMany({});
  const payload = JSON.stringify({
    title: "Bosco Push Test",
    body: "Bosco's body",
  });
  subscriptions.forEach((sub) => {
    webpush.sendNotification(sub, payload);
  });
  res.sendStatus(204);
});

app.get("/*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
});
