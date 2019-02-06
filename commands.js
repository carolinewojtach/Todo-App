const {
  showTasks,
  addTask,
  deleteTask,
  uploadTasks,
  downloadTasks,
  filterStatusTasks,
  filterCategoryTasks,
  changeStatus
} = require("./functions");

const showCommand = {
  command: "show",
  describe: "Show task list",
  handler: async () => {
    try {
      let result = await showTasks();
      console.log(result);
    } catch (error) {
      console.log(error.message);
    }
  }
};

const addCommand = {
  command: "add",
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

const deleteCommand = {
  command: "delete",
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

const uploadCommand = {
  command: "upload",
  describe: "Upload tasks",
  handler: async () => {
    try {
      let result = await uploadTasks();
      console.log(result);
    } catch (error) {
      console.log(error.message);
    }
  }
};

const downloadCommand = {
  command: "download",
  describe: "Download tasks",
  handler: async () => {
    try {
      let result = await downloadTasks();
      console.log(result);
    } catch (error) {
      console.log(error.message);
    }
  }
};

const filterCategoryCommand = {
  command: "filter-category",
  describe: "Filter tasks by category - provide category",
  builder: {
    category: {
      demandOption: true
    }
  },
  handler: async ({ category }) => {
    try {
      let result = await filterCategoryTasks(category);
      console.log(result);
    } catch (error) {
      console.log(error.message);
    }
  }
};

const filterStatusCommand = {
  command: "filter-status",
  describe: "Filter tasks by status - provide status",
  builder: {
    status: {
      demandOption: true
    }
  },
  handler: async ({ status }) => {
    try {
      let result = await filterStatusTasks(status);
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
      let result = await changeStatus(id, status);
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
  filterCategoryCommand,
  filterStatusCommand,
  changeStatusCommand
};
