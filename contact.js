const form = document.querySelector("form");
const submitBtn = document.querySelector(".submit");
const userName = document.getElementById("fname");
const userEmail = document.getElementById("mail");
const message = document.getElementById("message");

const errorMessage = document.querySelector(".error-message");
const overlay = document.querySelector(".overlay");
const successMessage = document.querySelector(".success-message");
const modalBtn = document.querySelectorAll(".modal-btn");

const requiredMessage = document.createElement("p");
requiredMessage.textContent = "This field is required";
requiredMessage.classList.add("required-message");

const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

let validity;
const validate = (mail) => {

  if (validateEmail(mail)) {
    validity = true;
  } else {
    validity = false;
  }
  return validity;
};

form.addEventListener("submit", (ev) => {
  ev.preventDefault();

  if (
    message.value === "" ||
    message.value.length < 8 ||
    !validate(`${userEmail.value}`)
  ) {
    if (message.value === "") {
      requiredMessage.textContent = "This field is required";
      message.classList.add("required-input");
      message.after(requiredMessage);
    } else if (message.value.length < 8) {
      requiredMessage.textContent =
        "Your message must be at least 8 characters";
      message.classList.add("required-input");
      message.after(requiredMessage);
    } else if (!validate(`${userEmail.value}`)) {
      requiredMessage.textContent = "Input a valid email";
      userEmail.classList.add("required-input");
      userEmail.after(requiredMessage);
      }
      
    errorMessage.dataset.testid = `test-contact-error-${
      message.value === "" || message.value.length < 8 ? "message" : "email"
    }`;

    errorMessage.classList.remove("hidden");
    overlay.classList.remove("hidden");
  } else {
    successMessage.classList.remove("hidden");
    overlay.classList.remove("hidden");
  }
});

message.addEventListener("input", () => {
  if (message.value.length < 8) {
    requiredMessage.textContent = "Your message must be at least 8 characters";
  } else if (
    message.value.length >= 8 &&
    message.classList.contains("required-input")
  ) {
    message.classList.remove("required-input");
    requiredMessage.remove();
  }
});

userEmail.addEventListener('input', () => {
    if (
      validate(`${userEmail.value}`) &&
      userEmail.classList.contains("required-input")
    ) {
      userEmail.classList.remove("required-input");
     requiredMessage.remove()
    }
    else {
           requiredMessage.textContent = "Input a valid email";
           userEmail.classList.add("required-input");
           userEmail.after(requiredMessage);
    }
})

modalBtn.forEach((btn) =>
  btn.addEventListener("click", () => {
    errorMessage.classList.add("hidden");
    successMessage.classList.add("hidden");
    overlay.classList.add("hidden");
  })
);
