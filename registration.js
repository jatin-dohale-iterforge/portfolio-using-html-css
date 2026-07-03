
//  Creating floating label for name
const box = document.querySelectorAll("#student-name-box > div > div");

box.forEach((inputBox) => {
    inputBox.addEventListener("click", () => {
        inputBox.classList.add("active-box")
        inputBox.children[0].classList.add("active-text")
        inputBox.children[1].className ="active-input";
        inputBox.children[1].focus()
    })
})


//  Creating floating label for Email and Mobile Number
const box2 = document.querySelectorAll("#email-number-box > div > div");

box2.forEach((inputBox) => {
    inputBox.addEventListener("click", () => {
        inputBox.classList.add("active-box")
        inputBox.children[0].classList.add("active-text")
        inputBox.children[1].className ="active-input";
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
const formInputs  = document.querySelectorAll("form input");
form.addEventListener("submit",(e)=>{
    e.preventDefault()
    formInputs.forEach((input)=>{
        if(input.value === ""){
            input.parentElement.nextElementSibling.classList.remove("invisible");
            
        }
    })
})


// Cancel Button
const cancelButton = document.getElementById("cancel")
const genderRadios = document.querySelectorAll("#gender-box input")
cancelButton.addEventListener("click",(e)=>{
    e.preventDefault();
    box.forEach((inputBox) => {
        inputBox.classList.remove("active-box")
        inputBox.children[0].classList.remove("active-text")
        inputBox.children[1].className ="deactive-link";
    })
    box2.forEach((inputBox) => {
        inputBox.classList.remove("active-box")
        inputBox.children[0].classList.remove("active-text");
        inputBox.children[1].className ="deactive-link";
    })
    formInputs.forEach((input)=>{
        input.value = ""
    })
    genderRadios.forEach((radio)=>{
        radio.checked = false
    })
})
    