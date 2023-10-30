const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 3000;

const pathAttachments = path.join(__dirname, "attachments");

app.use("/attachments", express.static(pathAttachments));
app.get("/", (req, res) => {
  res.send("Hello, this is ExpressJS");
});
app.get("/import-list", async (req, res) => {
  const dataPath = await getAllPath();
  const arrayRes = dataPath.map((e) => {
    return `/attachments/${e}`;
  });
  console.log("arrayRes.length: ", arrayRes.length);
  res.status(200).json(arrayRes);
});

app.get("/find-by-index", async (req, res) => {
  const { i } = req.query;
  const dataPath = await getAllPath();
  const objFind = dataPath.find((_, index) => index === parseInt(i, 10));
  console.log("objFind: ", objFind);
  res.status(200).json({ data: objFind });
});

app.listen(port, () => {
  console.log(`[Server]: I am running at http://localhost:${port}`);
});

function getAllPath() {
  return new Promise((resolve, reject) => {
    fs.readdir(pathAttachments, function (error, files) {
      if (error) {
        reject(error);
        return;
      }
      const targetFiles = files.filter((file) => {
        return path.extname(file).toLowerCase() === ".jpg";
      });
      resolve(targetFiles);
    });
  });
}
