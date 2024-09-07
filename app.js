require("dotenv").config();
const express = require("express");
const connection = require("./config/db");
const port = process.env.PORT || 9999;
const app = express();
const cors = require("cors");
const authRouter = require("./routes/authRoute");
const userRouter = require("./routes/userRoute");


app.use(cors());
app.use(express.json());

app.use('/api/auth',authRouter);

app.use('/api/users',userRouter);

app.listen(port,()=>{
    console.log("Server Started At -",port);
    connection();
})