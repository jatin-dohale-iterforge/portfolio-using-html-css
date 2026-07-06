
let studentList = (localStorage.getItem("studentList") ? JSON.parse(localStorage.getItem("studentList")): []);



const getGender = ()=>{
    let result ;
    genderRadios.forEach((item)=>{
        if (item.checked == true){result =  item.value;}
    })
    return result;
}





// ==========================//
//      Form Logics         //
//==========================//
var formOkay = false;
var studentForm = false;

// capitalize function
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
        formOkay = true;
    }

}

const firstName = document.getElementById("first-name")
firstName.addEventListener("input", (e) => nameChecker(e.target, e.target.value))
firstName.addEventListener("change", (e) => e.target.value = capitalize(e.target.value))

const middleName = document.getElementById("middle-name")
middleName.addEventListener("input", (e) => nameChecker(e.target, e.target.value))
middleName.addEventListener("change", (e) => e.target.value = capitalize(e.target.value))

const lastName = document.getElementById("last-name")
lastName.addEventListener("input", (e) => nameChecker(e.target, e.target.value))
lastName.addEventListener("change", (e) => e.target.value = capitalize(e.target.value))


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


// email Validation
const emailChecker = (emailInput, str) => {
    const isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(str)

    if (emailInput.value.length === 0) {
        emailInput.parentElement.nextElementSibling.innerText = "Email Number is Required";
        emailInput.parentElement.nextElementSibling.classList.remove("invisible");
        formOkay = false;
        return
    }
    if (!isEmail) {
        emailInput.parentElement.nextElementSibling.innerText = "Please Enter Valid email";
        emailInput.parentElement.nextElementSibling.classList.remove("invisible");
        formOkay = false;
    } else {
        emailInput.parentElement.nextElementSibling.classList.add("invisible");
        formOkay = true;
    }

}

const email = document.getElementById("email")
email.addEventListener("input", (e) => emailChecker(e.target, e.target.value))


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
const countBox = document.querySelector("#count-box p");
const charCount = document.getElementById("char-count");
const textArea = document.querySelector("#about-box textarea")
aboutCheck.addEventListener("click", () => {
    const about = document.querySelector("#about");
    if (about.classList.contains("hidden")) {
        about.classList.remove("hidden");
        countBox.classList.remove("hidden")
    } else {
        about.classList.add("hidden");
        countBox.classList.add("hidden");
    }
})

// about count updater
textArea.addEventListener("input", (e) => {
    charCount.innerText = e.target.value.length
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

    mobile.value = "";
    email.value = "";

    errorTexts.forEach((text => {
        text.classList.add("invisible");
    }))

    formOkay = false;
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
        alert("Form Submit Successfully");
        studentList.push({
            "first-name":firstName.value,
            "middle-name":middleName.value,
            "last-name":lastName.value,
            "gender":getGender(),
            "email":email.value,
            "mobile":mobile.value,
            "dob":dob.value,
            "about":about.value,
        })
        localStorage.setItem("studentList",JSON.stringify(studentList));
        resetForm();
    }

})


// Cancel Button
const cancelButton = document.getElementById("cancel")
cancelButton.addEventListener("click", (e) => {
    e.preventDefault();
    resetForm();
    closeStudentForm();
})





// ==========================//
//      Table Logics         //
//==========================//
const formBox = document.getElementById("form-box");
const dataTable = document.getElementById("data-table");

// function for opening Form
const openStudentForm = () =>{
    formBox.classList.remove("hidden");
    dataTable.classList.add("hidden");
    addButton.parentElement.classList.add("hidden");
    addButton.parentElement.parentElement.className = "center";
}

// function for Closing Form
const closeStudentForm = () =>{
    formBox.classList.add("hidden");
    dataTable.classList.remove("hidden");
    addButton.parentElement.classList.remove("hidden");
    addButton.parentElement.parentElement.className = "heading-change ";
}

// add button functional
const addButton = document.getElementById("add-button")
addButton.addEventListener("click",()=>openStudentForm())

// edit button functional
const editButton = document.querySelectorAll(".edit-button");
editButton.forEach((button)=>{
    button.addEventListener("click",(e)=>{
       
    })
})

// delete button functional 
const deleteButton = document.getElementById("delete-button");
