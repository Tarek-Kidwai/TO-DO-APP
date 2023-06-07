/**
 * ! Status
 * ? Add task Works
 * ? Delete task Works
 * ! Edit task is not working
 */

/**
 * ! Get all the id elements from the DOM
 * ? works perfectly
 */

const idSelector = (id) => document.getElementById(id);

let form = idSelector("form"),
  textInput = idSelector("textInput"),
  dateInput = idSelector("dateInput"),
  textarea = idSelector("textarea"),
  msg = idSelector("msg"),
  tasks = idSelector("tasks"),
  add = idSelector("add"),
  selectedPerson = idSelector("select-person"),
  selectedStatus = idSelector("selected-status"),
  addNew = idSelector("addNew");

/**
 * ! Add submit Event Listener to the form
 * ? works perfectly
 */

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

/**
 * ! Add click Event Listener to the addNew button to reset the form
 * ? works perfectly
 */

addNew.addEventListener("click", () => resetForm());

/**
 * ! Form Validation
 * ? works perfectly
 */

let formValidation = () => {
  if (textInput.value === "") {
    // we will add a failure toaster here
    console.log("failure");

    msg.innerHTML = "Task cannot be Blank";
  } else {
    // we will add a success toaster here
    console.log("sucess");
    msg.innerHTML = "";
    acceptData();
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();

    // Inorder for the modalForm to not disapper Automatically.
    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
  }
};

/**
 * ! This is used to store the data in the local storage & retrieve it
 * ? works perfectly
 */

let database = JSON.parse(localStorage.getItem("database")) || [];

/**
 * ! This is used to store the data from the form temporarily
 * ? works perfectly
 */

let data = {};

/**
 * ! This is used to accept the data from the form
 * ! and store it in the database
 * ? works perfectly
 */

let acceptData = () => {
  data["id"] = Math.random();
  data["text"] = textInput.value;
  data["date"] = dateInput.value;
  data["description"] = textarea.value;
  data["assignTo"] = selectedPerson.value;
  data["status"] = selectedStatus.value;

  database.push(data);
  localStorage.setItem("database", JSON.stringify(database));

  createTasks();
};

/**
 * ! This is used to create the tasks
 * ? works perfectly
 */

let createTasks = () => {
  tasks.innerHTML += `<div>
      <span class="fw-bold">${data.text}</span>
      <span class="small text-secondary">${
        data.assignTo == "" ? "Unassigned" : data?.assignTo
      }</span>
      <span class="small text-secondary">${data.date}</span>
      <p>${data.description}</p>
      ${
        data?.status === "Completed"
          ? '<span class="badge bg-success">' + data?.status + "</span>"
          : ""
      }
      ${
        data?.status === "In progress"
          ? '<span class="badge bg-primary">' + data?.status + "</span>"
          : ""
      }
      ${
        data?.status === "In Review"
          ? '<span class="badge bg-warning">' + data?.status + "</span>"
          : ""
      }
      <span class="options">
        <i onClick="editTask(this)" id=${
          data?.id
        } data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
        <i onClick="deleteTask(this)" id=${
          data.id
        } class="fas fa-trash-alt"></i>
      </span>
  </div>`;

  resetForm();
};

/**
 * ! This is used to delete the task
 * ? works perfectly
 */

let deleteTask = (e) => {
  e.parentElement.parentElement.remove();
  database = database.filter((item) => item.id != e.id);
  localStorage.setItem("database", JSON.stringify(database));
};

/**
 * ! This is used to edit the task
 * ! This is not working
 */

const removeOldTask = (e) => {
  e.parentElement.parentElement.remove();
  const updatedDatabase = database.filter((item) => item.id != e.id);
  localStorage.setItem("database", JSON.stringify(updatedDatabase));
};

let editTask = (e) => {
  const findTask = database.find((item) => item.id == e.id);

  textInput.value = findTask.text;
  dateInput.value = findTask.date;
  textarea.value = findTask.description;
  selectedPerson.value = findTask.assignTo;
  selectedStatus.value = findTask.status;

  removeOldTask(e);
};

/**
 * ! This is used to reset the form after the data is submitted
 * ? works perfectly
 */

let resetForm = () => {
  textInput.value = "";
  dateInput.value = "";
  textarea.value = "";
  selectedPerson.value = "";
  selectedStatus.value = "";
};

/**
 * ! This is used to fetch data from local storage into our app
 * ? works perfectly
 */

const retrieveData = () => {
  tasks.innerHTML += database
    .map((item) => {
      return `<div>
    <span class="fw-bold">${item.text}</span>
    <span class="small text-secondary">${
      item.assignTo == "" ? "Unassigned" : item?.assignTo
    }</span>
    <span class="small text-secondary">${item.date}</span>
    <p>${item.description}</p>
    ${
      item?.status === "Completed"
        ? '<span class="badge bg-success">' + item?.status + "</span>"
        : ""
    }
    ${
      item?.status === "In progress"
        ? '<span class="badge bg-primary">' + item?.status + "</span>"
        : ""
    }
    ${
      item?.status === "In Review"
        ? '<span class="badge bg-warning">' + item?.status + "</span>"
        : ""
    }
    <span class="options">
      <i onClick="editTask(this)" id=${
        item?.id
      } data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
  <!-- This is used to delete the task using the id as the reference point  -->
      <i onClick="deleteTask(this)" id=${item?.id} class="fas fa-trash-alt"></i>
    </span>
</div>`;
    })
    .join("");
};

retrieveData();
