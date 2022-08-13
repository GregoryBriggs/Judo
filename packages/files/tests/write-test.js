import fs from "fs";
import Write from "../src/write.js";

let textContent = {
  fileNameAndDirectory: "./test/test.txt",
  content: "Hello World",
  charset: "utf-8",
};
let jsonArrrayContent = {
  fileNameAndDirectory: "./test/jsonArray.json",
  content: fs.readFileSync("./packages/files/tests/data/data-list.json", "utf-8"),
  charset: "utf-8",
};
let jsonObjectContent = {
  fileNameAndDirectory: "./test/jsonObject.json",
  content: fs.readFileSync("./packages/files/tests/data/data-object.json", "utf-8"),
  charset: "utf-8",
};
let csvObject = {
  fileNameAndDirectory: "./test/data.csv",
  content: fs.readFileSync("./packages/files/tests/data/data.csv", "utf-8"),
  delimiter: '","',
  charset: "utf-8"
};

// plain text
try {
  const write = new Write(textContent);
} catch (err) {
  console.log(err);
}

try {
  const write = new Write();
  write._(
    textContent.fileNameAndDirectory,
    textContent.content,
    textContent.charset
  );
} catch (err) {
  console.log(err);
}

try {
  const write = new Write();
  write._(textContent);
} catch (err) {
  console.log(err);
}

// json
try {
  const write = new Write(jsonArrrayContent);
} catch (err) {
  console.log(err);
}

try {
  const write = new Write(jsonObjectContent);
  console.log("PASS - write json object content")
} catch (err) {
  console.log(err);
}

// csv
try {
  const write = new Write(csvObject);
  console.log("PASS - write json object content")
} catch (err) {
  console.log(err);
}
