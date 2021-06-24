/**
 *
 * MODAL SCRIPT
 *
 * ========================================================================= */

/*------------------------------------------------------------------------*/
/*----------                       globals                    ------------*/
/*------------------------------------------------------------------------*/

//definition of the validation colors for inputs
const errorColor = "#e54858";
const validColor = "#279e7a";

const valueStyles = {
  invalid: {
    border: `2px solid ${errorColor}`,
    boxShadow: `inset 0px 0px 2px 2px transparent`,
  },
  valid: {
    border: `2px solid ${validColor}`,
    boxShadow: `inset 0px 0px 2px 0px ${validColor}`,
  },
};

// DOM Elements
const modalbg = document.querySelector(".modal");
const modalBtns = document.querySelectorAll(".js-modal-btn");
const formDataFields = document.querySelectorAll(".form-field");
const modalCloseBtns = document.querySelectorAll(".modal-close-btn");

//object formInputs containing all form input values
let formInputs = {
  firstName: {
    element: document.getElementById("first-name")
  },
  lastName: {
    element: document.getElementById("last-name")
  },
  email: {
    element: document.getElementById("email")
  },
  birthdate: {
    element: document.getElementById("birthdate")
  },
  tournamentParticipations: {
    element: document.getElementById("tournament-participations")
  },
  location: {
    //method that return the select inputs
    element() {
      let numberOfLocations = document.getElementsByName("location").length;
      let elements = [];
      for (let index = 1; index <= numberOfLocations; index++) {
        elements.push(document.getElementById(`location${index}`));
        eval("location" + index);
      }
      return elements;
    }
  },
  termsConditions: {
    element: document.getElementById("terms-conditions")
  },
  notificationsAllowed: {
    element: document.getElementById("notifications")
  },
};

//object containing the list of error messages for each field
let errorMessages = {
  firstName: `Le champ prénom doit contenir minimum 2 caractères.`,
  lastName: `Le champ nom doit contenir minimum 2 caractères.`,
  email: `Le format de l'email n'est pas valide.`,
  birthdate: `Vous devez entrer votre date de naissance.`,
  tournamentParticipations: `Vous devez entrer un nombre.`,
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
/*----------     functions that show / hide error message     ------------*/
/*------------------------------------------------------------------------*/
function removeErrorMessage(errorId) {
  const elementError = document.querySelector(errorId);
  elementError.style.visibility = "hidden";
}
function showErrorMessage(errorId) {
  const elementError = document.querySelector(errorId);
  elementError.style.visibility = "visible";
}

/*------------------------------------------------------------------------*/
/*----------            input validation functions            ------------*/
/*------------------------------------------------------------------------*/

//validate text form inputs
function textInputCheck(inputId, errorId) {
  let testResult = false;
  const input = document.querySelector(inputId);
  let value = input.value;

  // check is text input is valid
  if (value == null || value == "" || value.length <= 2) {
    input.style.border = valueStyles.invalid.border;
    input.style.boxShadow = valueStyles.invalid.boxShadow;
    showErrorMessage(errorId);
  } else {
    testResult = true;
    input.style.boxShadow = valueStyles.valid.boxShadow;
    input.style.border = valueStyles.valid.border;
    removeErrorMessage(errorId);
  }
  return testResult;
}

//validate email form inputs
function emailCheck(email) {
  let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return regex.test(email);
}

//compare 2 dates
function dateCheck(date) {
  const today = new Date();
  const oneDate = new Date(date);

  if (today >= oneDate) {
    return true;
  } else {
    return false;
  }
}

// validation of firstname input field
function firstnameValidation() {
  textInputCheck("#first-name", "#errorFirstname");
}

// validation of lastname input field
function lastnameValidation() {
  textInputCheck("#last-name", "#errorLastname");
}

// validation of email input field
function emailValidation() {
  let testResult = false;
  const input = formInputs.email.element;
  let inputValue = input.value;

  // if (regex.exec(inputValue) == null) {
  if (!emailCheck(inputValue)) {
    input.style.border = valueStyles.invalid.border;
    input.style.boxShadow = valueStyles.invalid.boxShadow;
    showErrorMessage("#errorEmail");
  } else {
    testResult = true;
    input.style.boxShadow = valueStyles.valid.boxShadow;
    input.style.border = valueStyles.valid.border;
    removeErrorMessage("#errorEmail");
  }
  return testResult;
}

// check if birthdate is a valid date
function birthdateValidation() {
  let testResult = false;
  const input = formInputs.birthdate.element;
  let inputValue = input.value;

  if (!dateCheck(inputValue)) {
    input.style.border = valueStyles.invalid.border;
    input.style.boxShadow = valueStyles.invalid.boxShadow;
    showErrorMessage("#errorBirthdate");
  } else {
    testResult = true;
    input.style.boxShadow = valueStyles.valid.boxShadow;
    input.style.border = valueStyles.valid.border;
    removeErrorMessage("#errorBirthdate");
  }
  return testResult;
}

// check if tournament-participations is a number
function tournamentValidation() {
  let testResult = false;
  const input = formInputs.tournamentParticipations.element;
  let inputValue = input.value;

  if (isNaN(inputValue)) {
    input.style.border = valueStyles.invalid.border;
    input.style.boxShadow = valueStyles.invalid.boxShadow;
    showErrorMessage("#errorTournament");
  } else {
    testResult = false;
    input.style.boxShadow = valueStyles.valid.boxShadow;
    input.style.border = valueStyles.valid.border;
    removeErrorMessage("#errorTournament");
  }
  return testResult;
}

// check if the user selected at least one city
function locationValidation() {
  let testResult = false;
  let input = document.querySelector(".locations");

  if (
    !formInputs.location.element()[0].checked &&
    !formInputs.location.element()[1].checked &&
    !formInputs.location.element()[2].checked &&
    !formInputs.location.element()[3].checked &&
    !formInputs.location.element()[4].checked &&
    !formInputs.location.element()[5].checked
  ) {
    input.style.border = valueStyles.invalid.border;
    input.style.boxShadow = valueStyles.invalid.boxShadow;
    showErrorMessage("#errorLocation");
  } else {
    testResult = true;
    removeErrorMessage("#errorLocation");
  }
  return testResult;
}

// check if termsConditions is checked
function termsConditionsValidation() {
  let testResult = false;
  const input = formInputs.termsConditions.element;

  if (!input.checked) {
    showErrorMessage("#errorTermsConditions");
  } else {
    testResult = false;
    removeErrorMessage("#errorTermsConditions");
  }
  return testResult;
}

/*------------------------------------------------------------------------*/
/*----------                   form validation                ------------*/
/*------------------------------------------------------------------------*/
function formValidation(event) {}

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
/*------------------------------------------------------------------------*/
/*----------          function open/close modal window        ------------*/
/*------------------------------------------------------------------------*/
// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}
// close modal form
function closeModal() {
  modalbg.style.display = "none";
}
// launch modal event
for (let index = 0; index < modalBtns.length; index++) {
  let openBtn = modalBtns[index];
  openBtn.addEventListener("click", launchModal);
}
// modalBtns.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal event
for (let index = 0; index < modalCloseBtns.length; index++) {
  let closeBtn = modalCloseBtns[index];
  closeBtn.addEventListener("click", closeModal);
}
// modalCloseBtns.forEach((btn) => btn.addEventListener("click", closeModal));
