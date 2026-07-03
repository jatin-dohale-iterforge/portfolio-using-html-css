var formOkay = true;

// captalize function
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}


// function for name validation
const nameChecker = (input, str) => {
    const text = (input.name).replace("-", " ");
    const isName = /^[A-Za-z]+$/.test(str)
    if (str.length == 0) {
        input.parentElement.nextElementSibling.innerText = `${capitalize(text)} is Required`;
        input.parentElement.nextElementSibling.classList.remove("invisible");
        formOkay = false;
        return
    }
    if (!isName) {
        input.parentElement.nextElementSibling.innerText = "Please Enter Valid Name";
        input.parentElement.nextElementSibling.classList.remove("invisible");
        formOkay = false;
    } else {
        input.parentElement.nextElementSibling.classList.add("invisible");
    }

}

const firstName = document.getElementById("first-name")
firstName.addEventListener("input", (e) => nameChecker(e.target, e.target.value))
firstName.addEventListener("change",(e)=>e.target.value = capitalize(e.target.value))

const middleName = document.getElementById("middle-name")
middleName.addEventListener("input", (e) => nameChecker(e.target, e.target.value))
middleName.addEventListener("change",(e)=>e.target.value = capitalize(e.target.value))

const lastName = document.getElementById("last-name")
lastName.addEventListener("input", (e) => nameChecker(e.target, e.target.value))
lastName.addEventListener("change",(e)=>e.target.value = capitalize(e.target.value))


// Number Checker
const numberChecker = (numberInput) => {
    if (numberInput.value.length === 0) {
        numberInput.parentElement.nextElementSibling.innerText = "Mobile Number is Required";
        numberInput.parentElement.nextElementSibling.classList.remove("invisible");
        formOkay = false;
        return
    }
    if (numberInput.value.length === 10) {
        numberInput.parentElement.nextElementSibling.classList.add("invisible");
        formOkay = true;
    } else {
        numberInput.parentElement.nextElementSibling.innerText = "Please Enter Valid Number";
        numberInput.parentElement.nextElementSibling.classList.remove("invisible");
        formOkay = false;
    }

}

const mobile = document.getElementById("mobile")
mobile.addEventListener("input", (e) => numberChecker(e.target))

// Date Validation Checker
const dateChecker = () => {
    const dob = document.getElementById("dob");
    var today = new Date();
    var dd = today.getDate() < 10 ? '0' + today.getDate() : today.getDate();
    var mm = (today.getMonth() + 1) < 10 ? '0' + today.getMonth() : today.getMonth();
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    dob.setAttribute("max", today)
}
dateChecker();





//  Creating floating label for name
const box = document.querySelectorAll("#student-name-box > div > div");

box.forEach((inputBox) => {
    inputBox.addEventListener("click", () => {
        inputBox.classList.add("active-box")
        inputBox.children[0].classList.add("active-text")
        inputBox.children[1].className = "active-input";
        inputBox.children[1].focus()
    })
})

// Creating Floating Label for Date of Birth
const dobBox = document.getElementById("dob-box")
dobBox.addEventListener("click", () => {
    dobBox.classList.add("active-box")
    dobBox.children[0].classList = "active-text align-start"
    dobBox.children[1].className = "active-input";
    dobBox.children[1].focus();
})


//  Creating floating label for Email and Mobile Number
const box2 = document.querySelectorAll("#email-number-box > div > div");

box2.forEach((inputBox) => {
    inputBox.addEventListener("click", () => {
        inputBox.classList.add("active-box")
        inputBox.children[0].classList.add("active-text")
        inputBox.children[1].className = "active-input";
        inputBox.children[1].focus()
    })
})


// About ShowCase
const aboutCheck = document.querySelector("#check-about");
aboutCheck.addEventListener("click", () => {
    const about = document.querySelector("#about");
    if (about.classList.contains("hidden")) {
        about.classList.remove("hidden");
    } else {
        about.classList.add("hidden");
    }
})


// function for resetting form
const formInputs = [...document.querySelectorAll("form input")].slice(0, 4);
const genderRadios = document.querySelectorAll("#gender-box input")
const errorTexts = [...document.querySelectorAll("form p")].slice(1);
const resetForm = () => {
    box.forEach((inputBox) => {
        inputBox.classList.remove("active-box")
        inputBox.children[0].classList.remove("active-text")
        inputBox.children[1].className = "deactive-link";
    })

    dobBox.classList.remove("active-box")
    dobBox.children[0].classList = ""
    dobBox.children[1].className = "deactive-link";

    box2.forEach((inputBox) => {
        inputBox.classList.remove("active-box")
        inputBox.children[0].classList.remove("active-text");
        inputBox.children[1].className = "deactive-link";
    })
    formInputs.forEach((input) => {
        input.value = ""
    })
    genderRadios.forEach((radio) => {
        radio.checked = false
    })
    errorTexts.forEach((text => {
        text.classList.add("invisible");
    }))
}


// Form Validation
const form = document.querySelector("form");
const nameInputs = document.querySelectorAll("#student-name-box input")
const emailNumberInputs = document.querySelectorAll("#email-number-box input")


form.addEventListener("submit", (e) => {
    e.preventDefault()

    formInputs.forEach((input) => {
        if (input.value === "") {
            input.parentElement.nextElementSibling.classList.remove("invisible");
            formOkay = false;
        }
    })

    emailNumberInputs.forEach((input) => {
        if (input.value === "") {
            input.parentElement.nextElementSibling.classList.remove("invisible");
            formOkay = false;
        }
    })

    numberChecker(emailNumberInputs[1]);

    if (formOkay) {
        alert("Form Submit Successfully")
        resetForm();
    }

})


// Cancel Button
const cancelButton = document.getElementById("cancel")
cancelButton.addEventListener("click", (e) => {
    e.preventDefault();
    resetForm();
})
