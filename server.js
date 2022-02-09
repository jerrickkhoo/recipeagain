const express = require("express");
const app = express();
const port = 5000;
const path = require("path");

app.use(express.static(path.join(__dirname, "client/build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is now listening at http://localhost:${port}`);
});