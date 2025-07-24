import path from "path"
import fs from "fs"
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputFilePath = path.join(__dirname, "input.txt");

const readStream = fs.ReadStream(inputFilePath, {encoding: "utf-8"}); // without encoding, it returns streams: chunk data

readStream.on("data",(chunk) => {
  console.log("Received a chunk of data: ", chunk);
});

readStream.on("end",(chunk) => {
  console.log("Finished reading the file");
});

readStream.on("error",(err) => {
  console.log("Error occurred while reading file: ", err);
});