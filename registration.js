// function for name validation
const nameChecker = (input, str) => {
    const isName = /^[A-Za-z]+$/.test(str)
    if(str.length == 0 ) return
    if (!isName) {
        input.parentElement.nextElementSibling.innerText = "Please Enter Valid Name";
        input.parentElement.nextElementSibling.classList.remove("invisible");
    }else{
        input.parentElement.nextElementSibling.classList.add("invisible");
    }

}

const firstName = document.getElementById("first-name")
firstName.addEventListener("input",(e)=>nameChecker(e.target,e.target.value))

const middleName = document.getElementById("middle-name")
middleName.addEventListener("input",(e)=>nameChecker(e.target,e.target.value))

const lastName = document.getElementById("last-name")
lastName.addEventListener("input",(e)=>nameChecker(e.target,e.target.value))


// Number Checker
const numberChecker = (numberInput) =>{
    if(numberInput.value.length == 0 ) return
     if (!(numberInput.value.length == 10)) {
        numberInput.parentElement.nextElementSibling.innerText = "Please Enter Valid Number";
        numberInput.parentElement.nextElementSibling.classList.remove("invisible");
    }
}



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


// Form Validation
const form = document.querySelector("form");
const formInputs = [...document.querySelectorAll("form input")].slice(0,4);
const nameInputs = document.querySelectorAll("#student-name-box input")
const emailNumberInputs = document.querySelectorAll("#email-number-box input")


form.addEventListener("submit", (e) => {
    e.preventDefault()

    formInputs.forEach((input) => {
        if (input.value === "") {
            input.parentElement.nextElementSibling.classList.remove("invisible");
        }
    })

    emailNumberInputs.forEach((input)=>{
        if (input.value === "") {
            input.parentElement.nextElementSibling.classList.remove("invisible");
        }
    })
    
    numberChecker(emailNumberInputs[1]);

})


// Cancel Button
const cancelButton = document.getElementById("cancel")
const genderRadios = document.querySelectorAll("#gender-box input")
const errorTexts = [...document.querySelectorAll("form p")].slice(1);
cancelButton.addEventListener("click", (e) => {
    e.preventDefault();
    box.forEach((inputBox) => {
        inputBox.classList.remove("active-box")
        inputBox.children[0].classList.remove("active-text")
        inputBox.children[1].className = "deactive-link";
    })
    box2.forEach((inputBox) => {
        inputBox.classList.remove("active-box")
        inputBox.children[0].classList.remove("active-text");
        inputBox.children[1].className = "deactive-link";
    })
    formInputs.forEach((input) => {
        console.log(input)
        input.value = ""
    })
    genderRadios.forEach((radio) => {
        radio.checked = false
    })
    errorTexts.forEach((text=>{
        text.classList.add("invisible");
    }))
})
