import express from "express";
import 'dotenv/config';
import cookieSession from "cookie-session";
import cors from "cors";
import passport from "passport";
import { dbConnection } from "./dataBase/connectionFile.js";
import userRoutes from "./routes/userRoutes.js";
import hostelRoutes from "./routes/hostelRoutes.js";
import cookieParser from 'cookie-parser';
import "./middlewares/passport.js";
import googleLoginRoutes from './routes/googleLoginRoutes.js';
const app = express();

app.use(express.json());
app.use(cookieSession({name : "session", keys : ["hammad"], maxAge : 24 * 60 * 60 * 100}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader(
//         'Access-Control-Allow-Headers',
//         'Origin, X-Requested-With, Content-Type, Accept, Authorization'
//     );
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
//     next();
// });

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/hostel", hostelRoutes);
app.use(googleLoginRoutes);


app.use((err, req, res, next) =>{
   let {status = 500, msg = "Something went wrong"} = err;
   res.status(status).json(msg);
})

app.listen(process.env.PORT , ()=>{
    dbConnection();
    console.log("Backend Connected! ");
});