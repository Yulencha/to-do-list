let addButton, inputTask, unfinishedTask, finishedTask;

window.onload = () => {
  console.log("loaded!");

  addButton = document.getElementById("add");
  inputTask = document.getElementById("new-task");
  unfinishedTask = document.getElementById("unfinished-task");
  finishedTask = document.getElementById("finished-task");

  addButton.onclick = addTask;

  let readyListItems = document.querySelectorAll("li");

  for (let listItem of readyListItems) {
    bindTaskEvents(listItem, finishTask);
  }
};

function createNewElement(task) {
  let listItem = document.createElement("li");
  let div = document.createElement("div");
  let input = document.createElement("input");
  input.type = "checkbox";
  input.className = "input-chekbox";
  let div2 = document.createElement("div");
  div2.className = "text-of-task";
  div2.innerText = task;
  let i = document.createElement("i");
  i.className = "fa-regular fa-trash-can";

  div.appendChild(input);
  div.appendChild(div2);
  div.appendChild(i);

  listItem.appendChild(div);

  return listItem;
}

function addTask() {
  if (inputTask.value) {
    let listItem = createNewElement(inputTask.value);
    unfinishedTask.prepend(listItem);
    bindTaskEvents(listItem, finishTask);
    inputTask.value = "";
  }
}

function deleteTask() {
  let listItem = this.parentNode;
  let li = listItem.parentNode;
  li.removeChild(listItem);
}

function finishTask() {
  let listItem = this.parentNode;
  let li = listItem.parentNode;
  let ul = li.parentNode;
  let div = listItem.querySelector(".text-of-task");

  ul.append(li);
  li.className = "finished-task-color";
  div.classList.remove("usual-text");
  div.classList.add("line-through-text");
  bindTaskEvents(listItem, unfinishTask);
}

function unfinishTask() {
  let listItem = this.parentNode;
  let li = listItem.parentNode;
  let ul = li.parentNode;
  let div = listItem.querySelector(".text-of-task");
  let firstUnfinisshedTask = li.querySelector(".finished-task-color");
  console.log(div);
  console.log(firstUnfinisshedTask);
  ul.prepend(li);
  li.className = "unfinished-task-color";
  div.classList.remove("line-through-text");
  div.classList.add("usual-text");
  bindTaskEvents(listItem, finishTask);
}

function bindTaskEvents(listItem, checkboxEvent) {
  let checkbox = listItem.querySelector("input.input-chekbox");
  let deleteButton = listItem.querySelector("i.fa-trash-can");

  checkbox.onclick = checkboxEvent;
  deleteButton.onclick = deleteTask;
}
