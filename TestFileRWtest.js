const inputData = "This is the data: hero 1 is 100 HP.";
// writeFile("saveFile1.txt", inputData, console.log("error"));
const fs = require("node:fs");
fs.writeFile("./saveFile1.txt", inputData, (err) => {
  if (err) {
    console.error(err);
  } else {
    // file written successfully
    console.error("Save file written successfully");
  }
});

fs.readFile("./saveFile1.txt", "utf8", (err, outputData) => {
  if (err) {
    console.error(err);
    return;
  }
  // TODO fuction to split and read
  console.log(outputData);
  // TODO fuction to assign output data in to specific variables
  console.error("Save file loaded successfully");
});
