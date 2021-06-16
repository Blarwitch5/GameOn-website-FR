function editNav() {
  var x = document.getElementById("header");
  if (x.className === "header") {
    x.className += " responsive";
  } else {
    x.className = "header";
  }
}

// DOM Elements
const modalbg = document.querySelector(".modal");
const modalBtn = document.querySelectorAll(".js-modal-btn");
const formData = document.querySelectorAll(".form-field");
const modalCloseBtn = document.querySelectorAll(".modal-close-btn");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
// close modal event
modalCloseBtn.forEach((btn) => btn.addEventListener("click", closeModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}
// close modal form
function closeModal() {
  modalbg.style.display = "none";
}
