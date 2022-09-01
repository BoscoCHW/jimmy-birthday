import path from "path";
import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, "../client", "build");

app.use(express.static(publicPath));
app.use(cors());

app.get("/*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
});
