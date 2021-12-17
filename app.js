let main = document.querySelector(".main");
let addBtn = document.querySelector(".add-btn");
let overlayForm = document.querySelector(".overlay-form");
let form = document.querySelector("form");
let title = document.querySelector("#title");
let author = document.querySelector("#author");
let pages = document.querySelector("#pages");
let submit = document.querySelector(".submit");
let cardContainer = document.querySelector(".container.cards .row");
let body = document.querySelector("body");
let myLibrary = [];

addBtn.addEventListener("click", () => {
  toggleForm();
  cardContainer.innerHTML = "";
});

submit.addEventListener("click", (event) => {
  event.preventDefault();
  if (form.elements[0].value === "" || form.elements[1].value === "") {
    alert("There are some required fields!");
    return false;
  }
  addBookToLibrary(title.value, author.value, pages.value);
  myLibrary.forEach((book) => {
    createCard(book);
  });
  form.reset();
  toggleForm();
});

cardContainer.addEventListener("click", (event) => {
  console.log(event.target);
  if (event.target.className === "del-btn") {
    let id = event.target.value;
    removeBookFromLibrary(id);
    cardContainer.innerHTML = "";
    myLibrary.forEach((book) => {
      createCard(book);
    });
  }

  if (event.target.className === "toggle-btn") {
    let id = event.target.value;
    isRead(id);
    cardContainer.innerHTML = "";
    myLibrary.forEach((book) => {
      createCard(book);
    });
  }
});

function Book(id, title, author, pages, isRead) {
  //constructor
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = false;
}

function addBookToLibrary(title, author, pages) {
  let seed = new Date().getTime();
  let id = Math.floor(seed / title.length / author.length);
  let book = new Book(id, title, author, pages);
  myLibrary.push(book);
}

function removeBookFromLibrary(id) {
  if (myLibrary.length === 0) {
    return;
  }
  let index = myLibrary.findIndex((e) => e.id == id);
  if (index === -1) {
    return;
  }
  myLibrary.splice(index, 1);
}

function isRead(id) {
  if (myLibrary.length === 0) {
    return;
  }
  let index = myLibrary.findIndex((e) => e.id == id);
  if (index === -1) {
    return;
  }
  myLibrary[index].isRead = !myLibrary[index].isRead;
}

function createCard(book) {
  let { id, title, author, pages, isRead } = book;
  let card = document.createElement("div");
  card.classList.add("card", "border-dark");
  if (isRead) {
    card.classList.add("isRead");
  }
  card.style = "width: 18rem;";
  let cardHeader = document.createElement("div");
  cardHeader.classList.add("card-header");
  cardHeader.innerHTML = title;
  card.appendChild(cardHeader);
  let cardBody = document.createElement("div");
  cardBody.classList.add("card-body", "text-dark");
  let cardAuthor = document.createElement("h5");
  cardAuthor.addClassList = "card-title";
  cardAuthor.innerHTML = author;
  let cardPages = document.createElement("p");
  cardPages.addClassList = "card-subtitle";
  cardPages.innerHTML = pages;
  cardBody.appendChild(cardAuthor);
  cardBody.appendChild(cardPages);
  card.appendChild(cardBody);
  cardContainer.appendChild(card);
  let toggleSwitchContainer = document.createElement("label");
  toggleSwitchContainer.classList.add("switch");
  let toggleSwitch = document.createElement("input");
  toggleSwitch.type = "checkbox";
  toggleSwitch.classList.add("toggle-btn");
  if (isRead) {
    toggleSwitch.checked = true;
  }
  toggleSwitch.value = id;
  let slider = document.createElement("span");
  slider.classList.add("slider", "round");
  toggleSwitchContainer.append(toggleSwitch);
  toggleSwitchContainer.append(slider);
  card.append(toggleSwitchContainer);
  let delBtn = document.createElement("button");
  delBtn.classList.add("del-btn");
  delBtn.textContent = "-";
  delBtn.value = id;
  card.appendChild(delBtn);
}

function toggleForm() {
  overlayForm.classList.toggle("activeForm");
}
