import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user_routes.js"; 
import companyRoute from "./routes/company_rotes.js";
import jobRoute from "./routes/job_routes.js";
import applicationRoute from "./routes/application_route.js";


dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
};

app.use(cors(corsOptions));

// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/jobs", jobRoute);
app.use("/api/v1/application", applicationRoute);


// Test route
app.get("/home", (req, res) => {
    res.status(200).json({
        message: "I am coming from backend",
        success: true,
    });
});

// Server
const PORT = process.env.PORT || 3000;

app.use("/api/v1/user", userRoute); 

"http://localhost:8000/api/v1/user/register"
"http://localhost:8000/api/v1/user/login"
"http://localhost:8000/api/v1/user/logout"
"http://localhost:8000/api/v1/user/profile/update"

app.listen(PORT, async () => {
    await connectDB(); // This should be async
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
