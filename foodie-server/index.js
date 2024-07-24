const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const jwt = require('jsonwebtoken');
require('dotenv').config()

// middleware
app.use(cors());
app.use(express.json());
// console.log(process.env.ACCESS_TOKEN_SECRET);

// mongodb configuration using mongoose
console.log(`Connecting with username: ${process.env.DB_USERNAME}`);
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@foodiecluster.6dgtfyq.mongodb.net/?retryWrites=true&w=majority&appName=foodiecluster`
  )
  .then(() => {
    console.log("MongoDB Connected Successfully!");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB", error);
  });
  // jwt authentication
  app.post('/jwt', async(req, res) => {
    const user = req.body;
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '1hr'
    })
    res.send({token});
  })
//   import routes here
const menuRoutes = require('./api/routes/menuRoutes');
const cartRoutes = require('./api/routes/cartRoutes');
const userRoutes = require('./api/routes/userRoutes')
app.use('/menu', menuRoutes)
app.use('/carts', cartRoutes);
app.use('/users', userRoutes);

app.get("/",(req, res) => {
  res.send("Hello Foodi Client Server!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
