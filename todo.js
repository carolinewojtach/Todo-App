const yargs = require("yargs");

const {
  showCommand,
  addCommand,
  deleteCommand,
  uploadCommand,
  downloadCommand,
  filterCategoryCommand,
  filterStatusCommand,
  changeStatusCommand
} = require("./commands");

yargs
  .command(showCommand)
  .command(addCommand)
  .command(deleteCommand)
  .command(uploadCommand)
  .command(downloadCommand)
  .command(filterCategoryCommand)
  .command(filterStatusCommand)
  .command(changeStatusCommand).argv;
