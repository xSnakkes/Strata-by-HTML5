document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");
    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const messageError = document.getElementById("message-error");

    form.addEventListener("submit", submitForm);
    nameInput.addEventListener(
        "input",
        clearInputError.bind(null, nameInput, nameError)
    );
    emailInput.addEventListener(
        "input",
        clearInputError.bind(null, emailInput, emailError)
    );
    messageInput.addEventListener(
        "input",
        clearInputError.bind(null, messageInput, messageError)
    );
});

async function submitForm(event) {
    event.preventDefault();
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");
    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const messageError = document.getElementById("message-error");

    if (
        !validateForm(
            nameInput,
            emailInput,
            messageInput,
            nameError,
            emailError,
            messageError
        )
    ) {
        return;
    }

    const data = {
        name: nameInput.value,
        email: emailInput.value,
        message: messageInput.value,
    };

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };

    try {
        const response = await fetch(
            "https://api.byteplex.info/api/test/contact/",
            options
        );
        if (response.ok) {
            console.log("Done!");
            popupFormControl();
        } else {
            throw new Error("Error.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert(error);
    }
}

function popupFormControl() {
    const popupForm = document.querySelector(".popup-form");
    const formClose = document.querySelector(".form-close");
    const popupContainer = document.querySelector(".popup__container");

    popupForm.classList.remove("_close");

    formClose.addEventListener("click", closePopupForm.bind(null, popupForm));
    document.addEventListener(
        "click",
        outsidePopupContainer.bind(null, popupForm, popupContainer)
    );
    document.addEventListener("scroll", closePopupForm.bind(null, popupForm));
}

function closePopupForm(popupForm) {
    popupForm.classList.add("_close");
}

function outsidePopupContainer(popupForm, popupContainer, event) {
    if (!event.target.closest(".popup__container")) {
        closePopupForm(popupForm);
    }
}

function validateForm(
    nameInput,
    emailInput,
    messageInput,
    nameError,
    emailError,
    messageError
) {
    clearInputError(nameInput, nameError);
    clearInputError(emailInput, emailError);
    clearInputError(messageInput, messageError);

    if (nameInput.value.trim() === "") {
        displayInputError(nameInput, nameError, "Please enter your name.");
        return false;
    }

    if (!isValidEmail(emailInput.value)) {
        displayInputError(
            emailInput,
            emailError,
            "Please enter a valid email address."
        );
        return false;
    }

    if (messageInput.value.trim() === "") {
        displayInputError(
            messageInput,
            messageError,
            "Please enter a message."
        );
        return false;
    }

    return true;
}

function isValidEmail(email) {
    const emailPattern = /^\S+@\S+\.\S+$/;
    return emailPattern.test(email);
}

function clearInputError(inputElement, errorElement) {
    inputElement.classList.remove("error-input");
    errorElement.textContent = "";
}

function displayInputError(inputElement, errorElement, errorMessage) {
    inputElement.classList.add("error-input");
    errorElement.textContent = errorMessage;
    inputElement.focus();
}
