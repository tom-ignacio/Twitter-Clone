import express from "express";
import morgan from "morgan";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import passportMid from "./middlewares/passport";
import passport from "passport";
import userRoutes from "./routes/user.routes";
import tweetRoutes from "./routes/tweet.routes";
import replyRoutes from "./routes/reply.routes";
import likeRoutes from "./routes/like.routes";
import followRoutes from "./routes/follow.routes";

const app = express();

app.set("port", process.env.port || 3000);

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(passport.initialize());
passport.use(passportMid);

app.get("/", (_req, res) => {
  res.send('API running on port: ' + process.env.PORT);
});

app.use(authRoutes);
app.use(userRoutes);
app.use(tweetRoutes);
app.use(replyRoutes);
app.use(likeRoutes);
app.use(followRoutes);

export default app;