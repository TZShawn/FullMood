const express = require("express");
// const cors = require('cors')
// const User = require('./config.js')
const app = express();

app.use(express.json());
const userRoutes = require('./Routes/userRoutes.js')
const coreRoutes = require('./Routes/coreRoutes.js')
app.use(userRoutes)
app.use(coreRoutes)

app.listen(4000, () => console.log("RUNNING ON 4000"));
