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