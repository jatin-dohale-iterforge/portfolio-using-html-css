
//  Creating floating label for name
const box = document.querySelectorAll("#student-name-box > div > div");

box.forEach((inputBox) => {
    inputBox.addEventListener("click", () => {
        box.forEach((item) => {
            item.classList.remove("active-box")
            item.children[0].classList.remove("active-text")
            item.children[1].classList.remove("active-input")
        })
        inputBox.classList.add("active-box")
        inputBox.children[0].classList.add("active-text")
        inputBox.children[1].classList.add("active-input")
        inputBox.children[1].focus()
    })
})


//  Creating floating label for Email and Mobile Number
const box2 = document.querySelectorAll("#email-number-box > div > div");

box2.forEach((inputBox) => {
    inputBox.addEventListener("click", () => {
        box2.forEach((item) => {
            item.classList.remove("active-box")
            item.children[0].classList.remove("active-text")
            item.children[1].classList.remove("active-input")
        })
        inputBox.classList.add("active-box")
        inputBox.children[0].classList.add("active-text")
        inputBox.children[1].classList.add("active-input")
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