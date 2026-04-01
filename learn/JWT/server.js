require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const {verify_token} = require("./middlewares/auth.middleware")
const {router} = require("./router/auth.routes.js")
const PORT = process.env.PORT || 3000
const data_link = process.env.database_like


const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/me", verify_token);
app.use("/api", router);









mongoose.connect(data_link).then(()=>{
    console.log("mongoos connect successfully!")
    app.listen(PORT , () => {
        console.log(`sever listening on port ${PORT}`)
    })
})
.catch((err)=>{
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
})


