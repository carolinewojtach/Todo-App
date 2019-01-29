const { showTasks, addTask, deleteTask } = require("./functions");

const deleteCommand = {
  command: "delete-task",
  describe: "Delete task from list",
  builder: {
    id: {
      demandOption: true
    }
  },
  handler: async ({ id }) => {
    try {
      await deleteTask(id);
      console.log("You deleted the task.");
    } catch (error) {
      console.log(error.message);
    }
  }
};

const addCommand = {
  command: "add-task",
  describe: "Add a new task to list",
  builder: {
    text: {
      demandOption: true
    }
  },
  handler: async ({ text, id, status, category }) => {
    const task = {
      text,
      id,
      category
    };

    try {
      await addTask(task, status);
      console.log("You added the task.");
    } catch (error) {
      console.log(error.message);
    }
  }
};

const showCommand = {
  command: "show-tasks",
  describe: "Show task list",
  builder: {},
  handler: async () => {
    try {
      let result = await showTasks();
      console.log(result);
    } catch (error) {
      console.log(error.message);
    }
  }
};

const uploadCommand = {
  command: "upload",
  describe: "Upload tasks",
  builder: {},
  handler: async () => {
    try {
      await uploadTasks();
      console.log("You uploaded your tasks");
    } catch (error) {
      console.log(error.message);
    }
  }
};

const downloadCommand = {
  command: "download",
  describe: "Download tasks",
  builder: {},
  handler: async () => {
    try {
      let result = await downloadTasks();
      console.log("You downloaded your tasks");
      console.log(result);
    } catch (error) {
      console.log(error.message);
    }
  }
};

module.exports = {
  showCommand,
  addCommand,
  deleteCommand,
  uploadCommand,
  downloadCommand
};
