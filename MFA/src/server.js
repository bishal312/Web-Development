import express, { json, urlencoded } from "express";
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/dbConnect.js";
import authRoutes from "./routes/authRoute.js";
import "./config/passportConfig.js"

dotenv.config();
connectDb();

const app = express();

//Middleware
const corsOptions = {
  origin: ["http://localhost:3001"],
  Credential: true,
};
app.use(cors(corsOptions));
app.use(json({ limit: "100mb" }));
app.use(urlencoded({ limit: "100mb", extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000 * 60,
    },
  })
);
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
//Routes
app.use("/api/auth",authRoutes);
//Listening app
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is running at port no. ${PORT}`);
});


//Yeah it's bsal