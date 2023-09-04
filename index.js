const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

app.use("/attachments", express.static(path.join(__dirname, "attachments")));
app.get("/", (req, res) => {
  res.send("Hello, this is ExpressJS");
});

app.listen(port, () => {
  console.log(`[Server]: I am running at http://localhost:${port}`);
});
