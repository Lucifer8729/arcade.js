"use strict";

import { USER_DATA } from "./USER_DATA.js";

const fname = document.querySelector(".fn-text");
const lname = document.querySelector(".ls-text");
const dob = document.querySelector(".date-text");
const email = document.querySelector(".email-txt");
const password = document.querySelector(".password-txt");
const confirmPassword = document.querySelector(".confpasswd-text");

const signUpButton = document.querySelector(".reg-btn");

const loginDiv = document.querySelector("#login");
const regDiv = document.querySelector("#register");

const loginBtn = document.querySelector(".signin-btn");

const getUsername = (email) => email.split("@")[0];

signUpButton.addEventListener("click", (e) => {
  e.preventDefault();

  const regex =
    /^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;.](([a-zA-Z0-9_\-\.]+)@{[a-zA-Z0-9_\-\.]+0\.([a-zA-Z]{2,5}){1,25})+)*$/;

  if (regex.test(email.value)) {
    if (password.value === confirmPassword.value && fname.value !== "") {
      const enteredUsername = getUsername(email.value);

      USER_DATA[enteredUsername] = {
        username: enteredUsername,
        password: password.value,
        email: email.value,
        fname: fname.value,
        lname: lname.value,
        dob: dob.value,
      };

      fname.value = "";
      lname.value = "";
      dob.value = "";
      email.value = "";
      password.value = "";
      confirmPassword.value = "";

      regDiv.style.display = "none";
      loginDiv.style.display = "inline-block";
    } else {
      alert(
        `${fname.value ? `Password don't match` : `Please fill First Name`}`
      );
    }
  } else {
    alert("Please enter a valid email");
  }

  console.log(USER_DATA);
});

loginBtn.addEventListener("click", () => {
  regDiv.style.display = "none";
  loginDiv.style.display = "inline-block";
});
