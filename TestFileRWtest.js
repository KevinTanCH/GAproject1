const inputData = "This is the data: hero 1 is 100 HP";
// writeFile("saveFile1.txt", inputData, console.log("error"));
const fs = require("node:fs");
fs.writeFile("./saveFile1.txt", inputData, (err) => {
  if (err) {
    console.error(err);
  } else {
    // file written successfully
  }
});

fs.readFile("./saveFile1.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});
