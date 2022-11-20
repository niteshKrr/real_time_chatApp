require("./connection/mongo");
const userRouter = require("./router/userRouter");
const express = require("express");
var cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const port = 8000;


app.use("/user", userRouter);



app.get("*", (req, res) => {
  res.send("sorry this page doesn’t exists.");
});

app.listen(port, () => {
  console.log(`App started on http://localhost:${port}`);
});
