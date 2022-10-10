let addButton, inputTask, task;

window.onload = () => {
  console.log("loaded!");

  addButton = document.getElementById("add");
  inputTask = document.getElementById("new-task");
  tasks = document.getElementById("tasks");

  addButton.onclick = addTask;

  let data = load();
  for (let li of data) {
    if (li.throughText === false) {
      let listItem = createNewElement(li.text);
      tasks.appendChild(listItem);
      bindTaskEvents(listItem);
    } else {
      let listItem = createNewElement(li.text, (lineThrough = true));
      tasks.appendChild(listItem);
      bindTaskEvents(listItem);
    }
  }
};

function createNewElement(task, lineThrough = false) {
  let listItem = document.createElement("li");
  let div = document.createElement("div");
  let input = document.createElement("input");
  input.type = "checkbox";
  input.className = "input-checkbox";
  let div2 = document.createElement("div");

  if (lineThrough === false) {
    div2.className = "text-of-task usual-text";
    listItem.className = "unfinished-task-color";
    input.checked = false;
  } else {
    div2.className = "text-of-task line-through-text";
    listItem.className = "finished-task-color";
    input.checked = true;
  }
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
    tasks.prepend(listItem);
    bindTaskEvents(listItem);
    inputTask.value = "";
  }
  save();
}

function deleteTask() {
  let listItem = this.parentNode;
  let li = listItem.parentNode;
  li.remove();
  save();
}
/*
function finishTask() {
  let listItem = this.parentNode;
  let li = listItem.parentNode;

  let div = listItem.querySelector(".text-of-task");
  tasks.append(li);

  li.className = "finished-task-color";
  div.classList.remove("usual-text");
  div.classList.add("line-through-text");
  bindTaskEvents(listItem, unfinishTask);
  save();
}

function unfinishTask() {
  let listItem = this.parentNode;
  let li = listItem.parentNode;
  let div = listItem.querySelector(".text-of-task");
  tasks.prepend(li);
  li.className = "unfinished-task-color";
  div.classList.remove("line-through-text");
  div.classList.add("usual-text");
  bindTaskEvents(listItem, finishTask);
  save();
}
*/
function bindTaskEvents(listItem) {
  let checkbox = listItem.querySelector("input.input-checkbox");
  let deleteButton = listItem.querySelector("i.fa-trash-can");

  let div = listItem.querySelector(".text-of-task");
  checkbox.onclick = function () {
    if (this.checked) {
      tasks.append(listItem);
      listItem.className = "finished-task-color";
      div.classList.remove("usual-text");
      div.classList.add("line-through-text");
    } else {
      tasks.prepend(listItem);
      listItem.className = "unfinished-task-color";
      div.classList.remove("line-through-text");
      div.classList.add("usual-text");
    }

    save();
  };

  deleteButton.onclick = deleteTask;
}

function save() {
  let tasksArr = [];
  for (let i = 0; i < tasks.children.length; i++) {
    let li = {};
    li.text = tasks.children[i].querySelector(".text-of-task").innerText;
    let textClass = tasks.children[i].querySelector(".text-of-task").className;

    if (textClass.includes("line-through-text")) {
      li.throughText = true;
    } else {
      li.throughText = false;
    }
    tasksArr.push(li);
  }
  console.log(tasksArr);
  localStorage.removeItem("to-do-list");
  localStorage.setItem("to-do-list", JSON.stringify(tasksArr));
}

function load() {
  return JSON.parse(localStorage.getItem("to-do-list"));
}
