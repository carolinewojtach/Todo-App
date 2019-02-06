const axios = require("axios");
const fs = require("fs");

const data = "tasklist.json";
const url = "http://api.quuu.linuxpl.eu/todo/mdvghaco";

function showTasks() {
  let taskList = readFile(data);

  if (taskList.length !== 0) {
    return taskList;
  } else {
    return "You don't have any tasks";
  }
}

// ADDITIONAL FUNCTION - READ DATA FROM FILE
function readFile(data) {
  return JSON.parse(fs.readFileSync(data, "utf8"));
}

// ADDITIONAL FUNCTION - WRITE DATA TO FILE
function writeFile(data, taskList) {
  fs.writeFileSync(data, JSON.stringify(taskList));
}

function addTask(task) {
  let taskList = readFile(data);

  // ADD DEFAULT VALUES TO TASK
  if (taskList.length === 0) {
    task.id = 1;
  } else {
    task.id = taskList[taskList.length - 1].id + 1;
  }

  if (!task.status) {
    task.status = "active";
  } else if (task.status !== "active" && task.status !== "completed") {
    return "Wrong status name";
  }

  if (!task.category) task.category = "main";

  //SAVE TASK
  taskList.push(task);
  writeFile(data, taskList);
  return "You added the task.";
}

function deleteTask(id) {
  let taskList = readFile(data);

  // CHECK IF TASK WITH THIS ID EXISTS
  let taskFound = taskList.find(e => e.id === id);
  if (taskFound !== undefined) {
    let index = taskList.indexOf(taskFound);
    // DELETE TASK
    taskList.splice(index, 1);
    writeFile(data, taskList);
    return "You deleted the task.";
  } else {
    return "There is no task with such id.";
  }
}

async function uploadTasks() {
  let taskList = JSON.parse(fs.readFileSync(data, "utf8"));
  await axios.post(url, taskList);
  return "You uploaded your tasks.";
}

async function downloadTasks() {
  const response = await axios.get(url);
  fs.writeFileSync(data, JSON.stringify(response.data));
  return "You downloaded your tasks.";
}

function filterCategoryTasks(category) {
  let taskList = readFile(data);
  // CHECK CATEGORY
  let taskFound = taskList.find(e => e.category === category);
  if (taskFound === undefined) {
    return "There is no task with such category.";
  } else {
    // FILTER TASKS
    let tasksFiltered = taskList.filter(e => e.category === category);
    return tasksFiltered;
  }
}

function filterStatusTasks(status) {
  // CHECK STATUS
  if (task.status !== "active" && task.status !== "completed") {
    return "Wrong status name";
  }

  // FILTER TASKS
  let taskList = readFile(data);
  let tasksFiltered = taskList.filter(e => e.status === status);
  return tasksFiltered;
}

function changeStatus(id, status) {
  // CHECK STATUS
  if (status !== "active" && status !== "completed") {
    return "Wrong status name";
  }

  let taskList = readFile(data);

  // CHECK IF TASK WITH THIS ID EXISTS
  let taskFound = taskList.find(e => e.id === id);
  if (taskFound === undefined) {
    return "There is no task with such id.";
  } else if (taskFound.status === status) {
    return "Task already has this status.";
  } else {
    taskFound.status = status;
    //SAVE TASK
    writeFile(data, taskList);
    return "You changed the status.";
  }
}

module.exports = {
  showTasks,
  addTask,
  deleteTask,
  uploadTasks,
  downloadTasks,
  filterCategoryTasks,
  filterStatusTasks,
  changeStatus
};
