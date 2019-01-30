const axios = require("axios");
const fs = require("fs");

function addTask(task) {
  let taskList = JSON.parse(fs.readFileSync("tasklist.json", "utf8"));

  //DRAW ID
  let isDrawed = false;
  while (!isDrawed) {
    let index = Math.floor(Math.random() * 200);
    let matchId = taskList.find(e => e.id === index);
    console.log("index" + index);
    if (matchId === undefined) {
      task.id = index;
      isDrawed = true;
    }
  }

  // ADD DEFAULT VALUES TO TASK
  if (!task.status) {
    task.status = "active";
  } else if (status !== "active" || status !== "complete") {
    return "Wrong status name";
  }

  if (!task.category) task.category = "none";
  taskList.push(task);

  fs.writeFileSync("tasklist.json", JSON.stringify(taskList));
  return "You added the task.";
}

function changeStatus(id, status) {}

function deleteTask(id) {
  let taskList = JSON.parse(fs.readFileSync("tasklist.json", "utf8"));

  let taskFound = taskList.find(e => e.id === id);
  if (taskFound !== undefined) {
    let index = taskList.indexOf(taskFound);
    taskList.splice(index, 1);
    fs.writeFileSync("tasklist.json", JSON.stringify(taskList));
    return "You deleted the task.";
  } else {
    return "There is no task with such id.";
  }
}

async function downloadTasks() {
  const response = await axios.get(`http://api.quuu.linuxpl.eu/todo/mdvghaco`);
  fs.writeFileSync("tasklist.json", JSON.stringify(response));

  return "You downloaded your tasks.";
}

function filterTasks(status) {}

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
  filterTasks,
  changeStatus
};
