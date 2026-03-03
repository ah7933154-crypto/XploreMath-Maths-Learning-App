const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/copy-latex", (req, res) => {
  console.log("Received:", req.body);
  res.json({ status: "ok" });
});

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});
