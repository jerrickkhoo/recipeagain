// Dependencies
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const recipeController = require("./controllers/recipes");

//* CONFIG
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

//* CONNECT MONGODB
mongoose.connection.on("error", (err) =>
  console.log(err.message + " is Mongod not running?")
);
mongoose.connection.on("disconnected", () => console.log("mongo disconnected"));

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
});
mongoose.connection.once("open", () => {
  console.log("connected to mongoose at " + MONGODB_URI);
});


//* MIDDLEWARE
// app.use(express.static(path.join(__dirname, "./client/build")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//* ROUTES MIDDLEWARE
app.use("/recipes", recipeController);

// app.get("/*", (req, res) => {
//   res.sendFile(path.join(__dirname, "./client/build", "index.html"));
// });



app.listen(port, () => {
  console.log(`Server is now listening at http://localhost:${port}`);
});
