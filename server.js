require("dotenv").config();
//
const express = require("express");
const app = express();
const authRouter = require("./router/auth_router.js");
const adminRoute = require("./router/admin_router.js")
const connectDb = require("./utils/db.js");
const error_middleware = require("./middlewares/error_middleware.js");
const contactRoute = require("./router/contact_router.js");
const serviceRoute = require("./router/service_router.js");
const cors = require("cors");

// lets handling the cors

const corsOption = {
  origin: "http://localhost:5173",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};

// Add this before other app.use() statements
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the E-Cell API Server",
    status: "online",
    documentation: "Access API endpoints at /api/[auth|admin|form|data]"
  });
});

app.use(cors(corsOption));
app.use(express.json());

// let's define admin route
app.use("/api/admin", adminRoute);


app.use("/api/auth", authRouter);
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);

app.use(error_middleware);

const PORT = process.env.PORT || 8000;
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server is runing at port ${PORT} `);
  });
});
