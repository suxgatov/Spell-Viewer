const fs = require("fs");

export default class FileSystem {
  // Asynchronous read
  readFile(path) {
    fs.readFile(path, function (err, data) {
      if (err) {
        return console.error(err);
      }
      console.log("Asynchronous read: " + data.toString());
    });
  }

  readFileSync(path) {
    // Synchronous read
    var data = fs.readFileSync(path);
    console.log("Synchronous read: " + data.toString());
    console.log("Program Ended");
  }
}