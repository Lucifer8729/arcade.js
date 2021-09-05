"use strict";

import { USER_DATA } from "./USER_DATA.js";

const loginEmail = document.querySelector(".email-txt-login");
const loginPassword = document.querySelector(".password-txt-login");
const loginButton = document.querySelector(".login-btn");

const loginDiv = document.querySelector("#login");
const regDiv = document.querySelector("#register");

const regBtn = document.querySelector(".register-btn");

const getUsername = (email) => email.split("@")[0];

loginButton.addEventListener("click", (e) => {
  e.preventDefault();

  let regex =
    /^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;.](([a-zA-Z0-9_\-\.]+)@{[a-zA-Z0-9_\-\.]+0\.([a-zA-Z]{2,5}){1,25})+)*$/;

  if (regex.test(loginEmail.value)) {
    const enteredUsername = getUsername(loginEmail.value);

    if (
      USER_DATA[enteredUsername]?.password === loginPassword.value &&
      USER_DATA[enteredUsername]?.email === loginEmail.value
    ) {
      loginEmail.value = "";
      loginPassword.value = "";

      alert("Login Successful");
    } else {
      alert("Invalid Credentials");
    }
  } else {
    alert("Enter a valid E-mail");
  }
});

regBtn.addEventListener("click", () => {
  loginDiv.style.display = "none";
  regDiv.style.display = "inline-block";
});
