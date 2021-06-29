/**
 *
 * MODAL SCRIPT
 *
 * ========================================================================= */

/*------------------------------------------------------------------------*/
/*----------                       globals                    ------------*/
/*------------------------------------------------------------------------*/

//definition of the validation colors for inputs
const errorColor = "#FF4E60";
const validColor = "#279e7a";

// DOM Elements
const modalbg = document.querySelector(".modal");
const modalBtns = document.querySelectorAll(".js-modal-btn");
const formDataFields = document.querySelectorAll(".form-field");
const modalCloseBtns = document.querySelectorAll(".modal-close-btn");
const modalbgEnd = document.getElementById("modalEnd");
const formValidationBtn = document.querySelector(".btn-submit");

//object formInputs containing all form input values
let formInputs = {
  firstName: {
    element: document.getElementById("first-name"),
  },
  lastName: {
    element: document.getElementById("last-name"),
  },
  email: {
    element: document.getElementById("email"),
  },
  birthdate: {
    element: document.getElementById("birthdate"),
  },
  tournamentParticipations: {
    element: document.getElementById("tournament-participations"),
  },
  location: {
    //method that return the select inputs
    element() {
      let numberOfLocations = document.getElementsByName("location").length;
      let elements = [];
      for (let index = 1; index <= numberOfLocations; index++) {
        elements.push(document.getElementById(`location${index}`));
      }
      return elements;
    },
  },
  termsConditions: {
    element: document.getElementById("terms-conditions"),
  },
  notificationsAllowed: {
    element: document.getElementById("notifications"),
  },
};
//object containing the list of error messages for each field
let errorMessages = {
  firstName: `Le champ prénom doit contenir minimum 2 caractères.`,
  lastName: `Le champ nom doit contenir minimum 2 caractères.`,
  email: `Le format de l'email n'est pas valide.`,
  birthdate: `Vous devez avoir au moins 12 ans.`,
  tournamentParticipations: `Vous devez entrer un nombre positif ou égal à zéro.`,
  location: `Vous devez choisir une option.`,
  termsConditions: `Pour vous inscrire, vous devez accepter les termes et conditions.`,
};

/*------------------------------------------------------------------------*/
/*----------    List of all event listeners on form inputs    ------------*/
/*------------------------------------------------------------------------*/
const inputFirstname = formInputs.firstName.element;
inputFirstname.addEventListener("input", firstnameValidation);

const inputLastname = formInputs.lastName.element;
inputLastname.addEventListener("input", lastnameValidation);

const inputEmail = formInputs.email.element;
inputEmail.addEventListener("input", emailValidation);

const inputBirthdate = formInputs.birthdate.element;
inputBirthdate.addEventListener("change", birthdateValidation);

const inputTournamentParticipations = formInputs.tournamentParticipations.element;
inputTournamentParticipations.addEventListener("change", tournamentValidation);

const inputLocations = formInputs.location.element();
for (let index = 0; index < inputLocations.length; index++) {
  inputLocations[index].addEventListener("input", locationValidation);
}

const inputTermsConditions = formInputs.termsConditions.element;
inputTermsConditions.addEventListener("change", termsConditionsValidation);

/*------------------------------------------------------------------------*/
/*----------            remove HTML5 default validation       ------------*/
/*------------------------------------------------------------------------*/
//get all .form-field elements from form
for (let index = 0; index < formDataFields.length; index++) {
  let formField = formDataFields[index];
  formField.addEventListener(
    "invalid",
    function (event) {
      event.preventDefault(); // prevent the browser from showing default error bubble / hint
    },
    true
  );
}

/*------------------------------------------------------------------------*/
/*----------  returns the selected city in radio buttons list  ------------*/
/*------------------------------------------------------------------------*/
function getSelectedRadioboxValue(name) {
  const radiobox = document.querySelector(`input[name="${name}"]:checked`);
  return radiobox.value;
}
/*------------------------------------------------------------------------*/
/*---    returns true or false is the checkbox is checked or empty     ---*/
/*------------------------------------------------------------------------*/
function getSelectedCheckboxValue() {
  if (formInputs.notificationsAllowed.element.checked) {
    return true;
  } else {
    return false;
  }
}

/*------------------------------------------------------------------------*/
/*----------     function get error message from object       ------------*/
/*----------        and show / hide with data attribute       ------------*/
/*------------------------------------------------------------------------*/
function showErrorMessage(inputId, objectKey) {
  let inputTag = document.getElementById(inputId);
  let fieldParent = inputTag.parentNode;
  objectKey = errorMessages[objectKey];
  let errorMessage = objectKey;
  fieldParent.setAttribute("data-error", errorMessage);
  fieldParent.setAttribute("data-error-visible", "true");
}
function removeErrorMessage(inputId) {
  let inputTag = document.getElementById(inputId);
  let fieldParent = inputTag.parentNode;
  fieldParent.setAttribute("data-error-visible", "false");
}

/*------------------------------------------------------------------------*/
/*----------            input validation functions            ------------*/
/*------------------------------------------------------------------------*/

//validate text form inputs
function textInputCheck(inputId, objectKey) {
  let testResult = false;
  const input = document.getElementById(inputId);
  let value = input.value;

  // check is text input is valid
  if (value == null || value == "" || value.length <= 2) {
    input.classList.remove("valid");
    input.classList.add("invalid");
    showErrorMessage(inputId, objectKey);
  } else {
    testResult = true;
    input.classList.remove("invalid");
    input.classList.add("valid");
    removeErrorMessage(inputId);
  }
  return testResult;
}

//validate email form inputs
function emailCheck(email) {
  let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return regex.test(email);
}

//get age form user birthdate in order to compare 2 dates
function getAge(date) {
  const today = new Date();
  const oneDate = new Date(date);
  let age = today.getFullYear() - oneDate.getFullYear();
  let month = today.getMonth() - oneDate.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < oneDate.getDate())) {
    age--;
  }
  return age;
}
//compare 2 dates
function dateCheck(date) {
  const today = new Date();
  const oneDate = new Date(date);

  if (today >= oneDate && getAge(date) >= 12) {
    return true;
  } else {
    return false;
  }
}

// validation of firstname input field
function firstnameValidation() {
  return textInputCheck("first-name", "firstName");
}
// validation of lastname input field
function lastnameValidation() {
  return textInputCheck("last-name", "lastName");
}

// validation of email input field
function emailValidation() {
  let testResult = false;
  const input = formInputs.email.element;
  let inputValue = input.value;

  if (!emailCheck(inputValue)) {
    input.classList.remove("valid");
    input.classList.add("invalid");
    showErrorMessage("email", "email");
  } else {
    testResult = true;
    input.classList.remove("invalid");
    input.classList.add("valid");
    removeErrorMessage("email");
  }
  return testResult;
}

// check if birthdate is a valid date
function birthdateValidation() {
  let testResult = false;
  const input = formInputs.birthdate.element;
  let inputValue = input.value;

  if (!dateCheck(inputValue)) {
    input.classList.remove("valid");
    input.classList.add("invalid");
    showErrorMessage("birthdate", "birthdate");
  } else {
    testResult = true;
    input.classList.remove("invalid");
    input.classList.add("valid");
    removeErrorMessage("birthdate");
  }
  return testResult;
}

// check if tournament-participations is a number
function tournamentValidation() {
  let testResult = false;
  const input = formInputs.tournamentParticipations.element;
  let inputValue = input.value;

  if (isNaN(inputValue) || inputValue === "" || inputValue < 0) {
    input.classList.remove("valid");
    input.classList.add("invalid");
    showErrorMessage("tournament-participations", "tournamentParticipations");
  } else {
    testResult = true;
    input.classList.remove("invalid");
    input.classList.add("valid");
    removeErrorMessage("tournament-participations");
  }
  return testResult;
}

// check if the user selected at least one city
function locationValidation() {
  let testResult = false;
  let input = document.querySelector(".field-locations");

  if (
    !formInputs.location.element()[0].checked &&
    !formInputs.location.element()[1].checked &&
    !formInputs.location.element()[2].checked &&
    !formInputs.location.element()[3].checked &&
    !formInputs.location.element()[4].checked &&
    !formInputs.location.element()[5].checked
  ) {
    input.classList.remove("valid-locations");
    input.classList.add("invalid");
    showErrorMessage("location1", "location");
  } else {
    testResult = true;
    input.classList.remove("invalid");
    input.classList.add("valid-locations");
    removeErrorMessage("location1");
  }
  return testResult;
}

// check if termsConditions is checked
function termsConditionsValidation() {
  let testResult = false;
  const input = formInputs.termsConditions.element;

  if (!input.checked) {
    showErrorMessage("terms-conditions", "termsConditions");
  } else {
    testResult = true;
    removeErrorMessage("terms-conditions");
  }
  return testResult;
}
/*------------------------------------------------------------------------*/
/*----------          function open/close modal windows        ------------*/
/*------------------------------------------------------------------------*/
// launch modal form
function launchModal() {
  modalbg.style.display = "block";
  document.body.style.overflow = "hidden";
}
// close modal form
function closeModal() {
  modalbg.style.display = "none";
  const scrollY = document.body.style.top;
  document.body.style.overflow = "";
}
// launch 2nd modal when form is valid and submitted
function launchModalFormSubmitted() {
  modalbgEnd.style.display = "block";
  document.body.style.overflow = "hidden";
}
// close 2nd modal when form is valid and submitted
function closeModalFormSubmitted() {
  modalbgEnd.style.display = "none";
  const scrollY = document.body.style.top;
  document.body.style.overflow = "";
}
// launch modal event
for (let index = 0; index < modalBtns.length; index++) {
  let openBtn = modalBtns[index];
  openBtn.addEventListener("click", launchModal);
}

// close modal events
// get modal-close-btn of both modals and give them a listener on click => close modal
for (let index = 0; index < modalCloseBtns.length; index++) {
  let closeBtn = modalCloseBtns[index];

  if (closeBtn.classList.contains("modalEnd-close-btn") || closeBtn.getAttribute("id") === "modalEnd-close-btn") {
    closeBtn.addEventListener("click", closeModalFormSubmitted);
  } else {
    closeBtn.addEventListener("click", closeModal);
  }
}
/*------------------------------------------------------------------------*/
/*----------                   form validation                ------------*/
/*------------------------------------------------------------------------*/
formValidationBtn.addEventListener("click", formValidation);

function formValidation(event) {
  let validForm = false;

  firstnameValidation();
  lastnameValidation();
  emailValidation();
  birthdateValidation();
  tournamentValidation();
  locationValidation();
  termsConditionsValidation();

  if (
    firstnameValidation() === true &&
    lastnameValidation() === true &&
    emailValidation() === true &&
    birthdateValidation() === true &&
    tournamentValidation() === true &&
    locationValidation() === true &&
    termsConditionsValidation() === true
  ) {
    validForm = true;
    event.preventDefault();
    closeModal();
    launchModalFormSubmitted();

    //show all inputs value in console
    console.log(
      "Prénom : " +
        formInputs.firstName.element.value +
        "\n" +
        "Nom : " +
        formInputs.lastName.element.value +
        "\n" +
        "Email : " +
        formInputs.email.element.value +
        "\n" +
        "Date de naissance : " +
        formInputs.birthdate.element.value +
        "\n" +
        "Nombre de participation au tournoi GAmeOn : " +
        formInputs.tournamentParticipations.element.value +
        "\n" +
        "Ville : " +
        getSelectedRadioboxValue("location") +
        "\n" +
        "Conditions d'utilisation : " +
        termsConditionsValidation() +
        "\n" +
        "Notifications : " +
        getSelectedCheckboxValue()
    );
  } else {
    validForm = false;
    event.preventDefault();
  }
  return validForm;
}

/*------------------------------------------------------------------------*/
/*----------                   function menu                  ------------*/
/*------------------------------------------------------------------------*/
//add responsive css class for responsive versions
function editNav() {
  let headerSection = document.getElementById("header");
  if (headerSection.className === "header") {
    headerSection.className += " responsive";
  } else {
    headerSection.className = "header";
  }
}
