import express from "express";

const app = express();

const PORT = process.env.PORT || 5001;

app.get("/", (req, res)=>{
  res.send("Hello from node.js app running in Docker");
});

app.listen(PORT, ()=>{
  console.log(`Server is running on port:-${PORT}`);
});