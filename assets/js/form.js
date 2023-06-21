document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    form.addEventListener("submit", submitForm);
});

async function submitForm(event) {
    event.preventDefault();
    // Take input value
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    if (!validateForm()) {
        return;
    }
    // Create obj with form value
    const data = {
        name: name,
        email: email,
        message: message,
    };

    // Option POST
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };

    // Send fetch on server
    fetch("https://api.byteplex.info/api/test/contact/", options)
        .then((response) => {
            // Обработка ответа сервера
            if (response.ok) {
                console.log("Done!");
                popupFormControl()    
            } else {
                alert("Error.");
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            alert(error)
        });
}

function popupFormControl(){
    document.querySelector('.popup-form').classList.remove("_close")
    document.querySelector('.form-close').addEventListener("click", (event)=>{
        document.querySelector('.popup-form').classList.add("_close")
    })
    document.addEventListener("click",(event)=>{
        const targetItem = event.target;
        if(!targetItem.closest('.popup__container')){
            document.querySelector('.popup-form').classList.add("_close")
        } 
    })
    document.addEventListener("scroll",(event)=>{
        document.querySelector('.popup-form').classList.add("_close")
    })
}

function validateForm() {
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");
    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const messageError = document.getElementById("message-error");

    // Сброс предыдущих ошибок
    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";

    // Проверка наличия значения в поле "Name"
    if (nameInput.value.trim() === "") {
        nameError.textContent = "Please enter your name.";
        nameInput.classList.add("error-input");
        nameInput.focus();
        return false;
    }

    // Проверка валидности значения в поле "Email"
    if (!isValidEmail(emailInput.value)) {
        emailError.textContent = "Please enter a valid email address.";
        emailInput.classList.add("error-input");
        emailInput.focus();
        return false;
    }

    // Проверка наличия значения в поле "Message"
    if (messageInput.value.trim() === "") {
        messageError.textContent = "Please enter a message.";
        messageInput.classList.add("error-input");
        messageInput.focus();
        return false;
    }

    return true;
}

function isValidEmail(email) {
    // Простая проверка валидности email с использованием регулярного выражения
    const emailPattern = /^\S+@\S+\.\S+$/;
    return emailPattern.test(email);
}

// Удаление класса ошибки и очистка сообщений об ошибках при вводе в поле
document.getElementById("name").addEventListener("input", function () {
    this.classList.remove("error-input");
    document.getElementById("name-error").textContent = "";
});

document.getElementById("email").addEventListener("input", function () {
    this.classList.remove("error-input");
    document.getElementById("email-error").textContent = "";
});

document.getElementById("message").addEventListener("input", function () {
    this.classList.remove("error-input");
    document.getElementById("message-error").textContent = "";
});