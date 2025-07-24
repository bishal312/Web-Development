import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputFilePath = path.join(__dirname, "input.txt");
const outputFilePath = path.join(__dirname, "output.txt");

const readStream = fs.ReadStream(inputFilePath, { encoding: "utf-8" });

const writeStream = fs.WriteStream(outputFilePath);

readStream.pipe(writeStream);

writeStream.on("finish", () => {
  console.log("✅ Data has been written to output.txt.");
});

readStream.on("error", (err) => {
  console.error("❌ Read stream error:", err.message);
});
writeStream.on("error", (err) => {
  console.error("❌ Write stream error:", err.message);
});
