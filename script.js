// Variables
const sections = document.querySelectorAll("#navlink-container a");
const bottomBar = document.querySelectorAll("#bottom-bar a")


// Change on Active links
sections.forEach((section)=>{
    section.addEventListener("click",()=>{
        sections.forEach((item)=>{
            item.classList.remove("active-link");
            section.classList.add("active-link");
        })
    })
})

// Change on Active bar
bottomBar.forEach((box)=>{
    box.addEventListener("click",()=>{
        bottomBar.forEach((item)=>{
            item.classList.remove("active-bar");
            box.classList.add("active-bar");
        })
    })
})