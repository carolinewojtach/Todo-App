const fs = require("fs");

let task = [{ text: "kupic mleko", id: 2 }];
let taskString = JSON.stringify(task);

fs.writeFileSync("tasklist.json", taskString);
