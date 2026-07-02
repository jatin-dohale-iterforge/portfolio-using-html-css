const box = document.querySelectorAll("#student-name-box > div");

box.forEach((div) => {
    div.addEventListener("click", () => {
        box.forEach((item) => {
            item.classList.remove("active-box")
            item.children[0].classList.remove("active-text")
            item.children[1].classList.remove("active-input")
        })
        div.classList.add("active-box")
        div.children[0].classList.add("active-text")
        div.children[1].classList.add("active-input")
        div.children[1].focus()
    })
})