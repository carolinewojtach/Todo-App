const yargs = require("yargs");

const {
  showCommand,
  addCommand,
  deleteCommand,
  uploadCommand,
  downloadCommand
} = require("./commands");

yargs
  .command(showCommand)
  .command(addCommand)
  .command(deleteCommand)
  .command(uploadCommand)
  .command(downloadCommand).argv;
