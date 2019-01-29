const axios = require("axios");
const fs = require("fs");

function showTasks() {
  let tasks = JSON.parse(fs.readFileSync("tasklist.json", "utf8"));
  if (tasks.active.length !== 0) {
    let valuesActive = [];
    let valuesCompleted = [];
    for (let i = 0; i < tasks.active.length; i++) {
      valuesActive.push(Object.values(tasks.active[i]));
    }
    return "Active tasks: " + valuesActive;
  }
  if (tasks.completed.length !== 0) {
    valuesCompleted = Object.values(tasks.completed[0]);
    return "Completed tasks: " + valuesCompleted;
  }
  //else {
  //   return "You don't have any tasks";
  // }
}

function addTask(task, status) {
  // let taskList = { active: [], completed: [] };
  // let tasks = JSON.parse(fs.readFileSync("tasklist.json", "utf8"));
  // console.log(tasks);
  // if (tasks !== undefined) {
  //   tasks.active.forEach(e => {
  //     taskList.active.push(e);
  //   });
  //   tasks.completed.forEach(e => {
  //     taskList.completed.push(e);
  //   });
  // }
  let taskList = JSON.parse(fs.readFileSync("tasklist.json", "utf8"));

  //ADD TASKS TO STATUS GROUPS
  if (status === "active" || !status) {
    taskList.active.push(task);
  } else if (status === "completed") {
    taskList.completed.push(task);
  }

  fs.writeFileSync("tasklist.json", JSON.stringify(taskList));
}

function deleteTask(id) {}

async function uploadTasks(task) {
  const response = await axios.post(
    "http://api.quuu.linuxpl.eu/todo/mdvghaco",
    task
  );
  return response.data;
}

async function downloadTasks() {
  const response = await axios.get(`http://api.quuu.linuxpl.eu/todo/mdvghaco`);
  let taskList = JSON.parse(fs.readFileSync("tasklist.json", "utf8"));

  return response.data;
}
module.exports = {
  showTasks,
  addTask,
  deleteTask,
  uploadTasks,
  downloadTasks
};
