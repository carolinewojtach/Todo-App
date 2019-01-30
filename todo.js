const yargs = require("yargs");

const {
  showCommand,
  addCommand,
  deleteCommand,
  uploadCommand,
  downloadCommand,
  filterCommand,
  changeStatusCommand
} = require("./commands");

yargs
  .command(showCommand)
  .command(addCommand)
  .command(deleteCommand)
  .command(uploadCommand)
  .command(downloadCommand)
  .command(filterCommand)
  .command(changeStatusCommand).argv;
