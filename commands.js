const {
  showTasks,
  addTask,
  deleteTask,
  uploadTasks,
  downloadTasks,
  filterTasks,
  changeStatus
} = require("./functions");

//{"active":[{"text":"hh"}],"completed":[{"text":"aavy"}]}

const addCommand = {
  command: "add-task",
  describe:
    "Add a new task to list - provide text and optionally category and status",
  builder: {
    text: {
      demandOption: true
    }
  },
  handler: async ({ text, category, status }) => {
    const task = {
      text,
      status,
      category
    };

    try {
      let result = await addTask(task);
      console.log(result);
    } catch (error) {
      console.log(error.message);
    }
  }
};

const changeStatusCommand = {
  command: "change-status",
  describe: "Change status of the task - provide id and status",
  builder: {
    status: {
      demandOption: true
    },
    id: {
      demandOption: true
    }
  },
  handler: async ({ id, status }) => {
    try {
      await changeStatus(id, status);
    } catch (error) {
      console.log(error.message);
    }
  }
};

const deleteCommand = {
  command: "delete-task",
  describe: "Delete task from list - provide id",
  builder: {
    id: {
      demandOption: true
    }
  },
  handler: async ({ id }) => {
    try {
      let result = await deleteTask(id);
      console.log(result);
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
      console.log(result);
    } catch (error) {
      console.log(error.message);
    }
  }
};

const filterCommand = {
  command: "filter",
  describe: "Filter tasks - provide status",
  builder: {
    status: {
      demandOption: true
    }
  },
  handler: async ({ status }) => {
    try {
      await filterTasks(status);
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
      let result = await uploadTasks();
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
  downloadCommand,
  filterCommand,
  changeStatusCommand
};
