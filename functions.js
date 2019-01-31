const axios = require("axios");
const fs = require("fs");

function addTask(task) {
  let taskList = JSON.parse(fs.readFileSync("tasklist.json", "utf8"));
  //DRAW ID
  let isDrawed = false;
  while (!isDrawed) {
    let index = Math.floor(Math.random() * 200);
    let matchId = taskList.find(e => e.id === index);
    if (matchId === undefined) {
      task.id = index;
      isDrawed = true;
    }
  }

  // ADD DEFAULT VALUES TO TASK
  if (task.status === undefined) {
    task.status = "active";
  } else if (task.status !== "active" && task.status !== "completed") {
    return "Wrong status name";
  }

  if (!task.category) task.category = "main";

  //SAVE TASK
  taskList.push(task);
  fs.writeFileSync("tasklist.json", JSON.stringify(taskList));
  return "You added the task.";
}

function changeStatus(id, status) {
  // CHECK STATUS
  if (status !== "active" && status !== "completed") {
    return "Wrong status name";
  }

  let taskList = JSON.parse(fs.readFileSync("tasklist.json", "utf8"));

  // CHECK IF TASK WITH THIS ID EXISTS
  let taskFound = taskList.find(e => e.id === id);
  if (taskFound === undefined) {
    return "There is no task with such id.";
  } else if (taskFound.status === status) {
    return "Task already has this status.";
  } else {
    taskFound.status = status;
    //SAVE TASK
    fs.writeFileSync("tasklist.json", JSON.stringify(taskList));
    return "You changed the status.";
  }
}

function deleteTask(id) {
  let taskList = JSON.parse(fs.readFileSync("tasklist.json", "utf8"));

  // CHECK IF TASK WITH THIS ID EXISTS
  let taskFound = taskList.find(e => e.id === id);
  if (taskFound !== undefined) {
    let index = taskList.indexOf(taskFound);
    // DELETE TASK
    taskList.splice(index, 1);
    fs.writeFileSync("tasklist.json", JSON.stringify(taskList));
    return "You deleted the task.";
  } else {
    return "There is no task with such id.";
  }
}

async function downloadTasks() {
  const response = await axios.get(`http://api.quuu.linuxpl.eu/todo/mdvghaco`);
  fs.writeFileSync("tasklist.json", JSON.stringify(response.data));

  return "You downloaded your tasks.";
}

function filterCategoryTasks(category) {
  let taskList = JSON.parse(fs.readFileSync("tasklist.json", "utf8"));
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
  let taskList = JSON.parse(fs.readFileSync("tasklist.json", "utf8"));
  let tasksFiltered = taskList.filter(e => e.status === status);
  return tasksFiltered;
}

function showTasks() {
  let taskList = JSON.parse(fs.readFileSync("tasklist.json", "utf8"));

  if (taskList.length !== 0) {
    return taskList;
  } else {
    return "You don't have any tasks";
  }
}

async function uploadTasks() {
  let taskList = JSON.parse(fs.readFileSync("tasklist.json", "utf8"));
  await axios.post("http://api.quuu.linuxpl.eu/todo/mdvghaco", taskList);
  return "You uploaded your tasks.";
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
