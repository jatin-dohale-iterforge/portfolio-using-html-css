// get Gender
const getGender = () => {
  let result;
  genderRadios.forEach((item) => {
    if (item.checked == true) {
      result = item.value;
    }
  });
  return result;
};

// function for set data in ui
const setStudentListing = (studentList) => {
  if (studentList.length == 0) {
    tableBody.innerHTML = `  <tr>
                <td  colspan="10" class="label-text">No Record Found</td>
            </tr>`;
    pag.classList.add("hidden");
  } else {
    tableBody.innerHTML = "";
    studentList.forEach((item) => {
      tableBody.innerHTML += `<tr><td data-title="ID">${item.id}</td><td data-title="First Name">${item.firstName}</td><td data-title="Middle Name">${item.middleName}</td><td data-title="Last Name">${item.lastName}</td><td data-title="Email">${item.email}</td><td data-title="Mobile">${item.mobile}</td><td data-title="Gender">${item.gender}</td><td data-title="Date of Birth">${item.dob}</td><td class="about-col" data-title="About"><div class="about-col-div scrollbar-hide">${item.about}</div></td><td ><button data-student-id=${item.id} class="edit-button button table-button" onClick={editStudent(${item.id})}>Edit</button><button class="delete-button button table-button" onClick={deleteStudent(${item.id})}>Delete</button></td> </tr>`;
    });
    pag.classList.remove("hidden");
  }
};

// function for prev button
const prevUpdate = () => {
  currentPage--;
  displayStudent(currentPage);
};

// function for next button
const nextUpdate = () => {
  currentPage++;
  displayStudent(currentPage);
};

// function for create pagination
const displayStudent = (page) => {
  prev.disabled = page == 1 ? true : false;

  document.querySelector("#pagination span").innerText = page;

  const totalPages = Math.ceil(studentList.length / studentPerPage);
  next.disabled = totalPages == page ? true : false;

  let start = page - 1 > 0 ? (page - 1) * studentPerPage : 0;
  let end = page * studentPerPage;

  filteredList = studentList.slice(start, end);
  setStudentListing(filteredList);
};

// variables
let studentList = localStorage.getItem("studentList")
  ? JSON.parse(localStorage.getItem("studentList"))
  : [];
const tableBody = document.querySelector("tbody");
const formBox = document.getElementById("form-box");
const dataTable = document.getElementById("data-table");
const pag = document.getElementById("pagination");

var formOkay = false;
var studentForm = false;

let edit = false;
let currentId = undefined;

let currentPage = 1;
const studentPerPage = 5;
const prev = document.getElementById("prev-button");
const next = document.getElementById("next-button");

displayStudent(currentPage);

// ==========================//
//      Form Logics         //
//==========================//
const firstName = document.getElementById("first-name");
const middleName = document.getElementById("middle-name");
const lastName = document.getElementById("last-name");
const mobile = document.getElementById("mobile");
const email = document.getElementById("email");

const box = document.querySelectorAll("#student-name-box > div > div");
const box2 = document.querySelectorAll("#email-number-box > div > div");
const dobBox = document.getElementById("dob-box");

const countBox = document.querySelector("#count-box p");
const charCount = document.getElementById("char-count");
const about = document.querySelector("#about");

const floatingInputs = document.querySelectorAll(
  `[onclick="elementFloat(this)"]`,
);
const genderRadios = document.querySelectorAll("#gender-box input");
const errorTexts = document.querySelectorAll(`.error-msg`);
const formInputs = [...document.querySelectorAll("form input")].slice(0, 4);

// capitalize function
const capitalize = (ele) => {
  if (ele.value)
    ele.value = ele.value.charAt(0).toUpperCase() + ele.value.slice(1);
};

// function for name validation
const nameChecker = (ele) => {
  const text = ele.name.replace("-", " ");
  const isName = /^[A-Za-z]+$/.test(ele.value);
  if (ele.value.length == 0) {
    ele.parentElement.nextElementSibling.innerText = `${capitalize(text)} is Required`;
    ele.parentElement.nextElementSibling.classList.remove("invisible");
    formOkay = false;
    return;
  }
  if (!isName) {
    ele.parentElement.nextElementSibling.innerText = "Please Enter Valid Name";
    ele.parentElement.nextElementSibling.classList.remove("invisible");
    formOkay = false;
  } else {
    ele.parentElement.nextElementSibling.classList.add("invisible");
    formOkay = true;
  }
};

// function for Number validation
const numberChecker = (ele) => {
  if (ele.value.length === 0) {
    ele.parentElement.nextElementSibling.innerText =
      "Mobile Number is Required";
    ele.parentElement.nextElementSibling.classList.remove("invisible");
    formOkay = false;
    return;
  }
  if (ele.value.length === 10) {
    ele.parentElement.nextElementSibling.classList.add("invisible");
    formOkay = true;
  } else {
    ele.parentElement.nextElementSibling.innerText =
      "Please Enter Valid Number";
    ele.parentElement.nextElementSibling.classList.remove("invisible");
    formOkay = false;
  }
};

// function for email Validation
const emailChecker = (ele) => {
  const isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    ele.value,
  );

  if (ele.value.length === 0) {
    ele.parentElement.nextElementSibling.innerText = "Email Number is Required";
    ele.parentElement.nextElementSibling.classList.remove("invisible");
    formOkay = false;
    return;
  }
  if (!isEmail) {
    ele.parentElement.nextElementSibling.innerText = "Please Enter Valid email";
    ele.parentElement.nextElementSibling.classList.remove("invisible");
    formOkay = false;
  } else {
    ele.parentElement.nextElementSibling.classList.add("invisible");
    formOkay = true;
  }
};

// function for Date Validation Checker
const dateChecker = () => {
  const dob = document.getElementById("dob");
  var today = new Date();
  var dd = today.getDate() < 10 ? "0" + today.getDate() : today.getDate();
  var mm =
    today.getMonth() + 1 < 10 ? "0" + today.getMonth() : today.getMonth();
  var yyyy = today.getFullYear();

  today = yyyy + "-" + mm + "-" + dd;
  dob.setAttribute("max", today);
};
dateChecker();

// function for creating floating-labels
const elementFloat = (ele) => {
  ele.classList.add("active-box");
  ele.children[0].className = `${ele.id == "dob-box" ? "active-text align-start" : "active-text "}`;
  ele.children[1].className = "active-input";
  ele.children[1].focus();
};

// function for removing floating-labels
const removeFloat = (ele) => {
  ele.classList.remove("active-box");
  ele.children[0].className = "";
  ele.children[1].className = "deactive-link";
};

// function for toggle About
const showAbout = (open) => {
  if (open) {
    about.classList.remove("hidden");
    countBox.classList.remove("hidden");
  } else {
    about.classList.add("hidden");
    countBox.classList.add("hidden");
  }
};

// function for Counting textarea characters
const textareaCounter = (ele) => {
  charCount.innerText = ele.value.length;
};

// function for resetting form
const resetForm = () => {
  floatingInputs.forEach((ele) => {
    removeFloat(ele);
    ele.children[1].value = "";
  });

  genderRadios.forEach((radio) => {
    radio.checked = false;
  });

  errorTexts.forEach((text) => {
    text.classList.add("invisible");
  });

  formOkay = false;
};

// function for form submission
const handleSubmit = (event) => {
  event.preventDefault();

  floatingInputs.forEach((ele) => {
    if (ele.children[1].value === "") {
      ele.nextElementSibling.classList.remove("invisible");
      formOkay = false;
    }
  });

  if (formOkay) {
    alert("Form Submit Successfully");
    if (edit) {
      studentList.find((item) => {
        if (item.id == currentId) {
          item.firstName = firstName.value;
          item.middleName = middleName.value;
          item.lastName = lastName.value;
          item.gender = getGender();
          item.email = email.value;
          item.mobile = mobile.value;
          item.dob = dob.value;
          item.about = about.value;
        }
      });
    } else {
      studentList.push({
        id:
          studentList.length >= 1
            ? studentList[studentList.length - 1].id + 1
            : 1,
        firstName: firstName.value,
        middleName: middleName.value,
        lastName: lastName.value,
        gender: getGender(),
        email: email.value,
        mobile: mobile.value,
        dob: dob.value,
        about: about.value,
      });
    }
    localStorage.setItem("studentList", JSON.stringify(studentList));
    resetForm();
    closeStudentForm();
  }
};

// Cancel Button
const cancelButton = document.getElementById("cancel");
cancelButton.addEventListener("click", (e) => {
  e.preventDefault();
  resetForm();
  closeStudentForm();
});



// ==========================//
//      Table Logics         //
//==========================//
const addButton = document.getElementById("add-button");


// function for opening Form
const openStudentForm = () => {
  formBox.classList.remove("hidden");
  dataTable.classList.add("hidden");
  searchBox.classList.add("hidden");
  addButton.parentElement.classList.add("hidden");
  pag.classList.add("hidden");
  addButton.parentElement.parentElement.className = "center";
};

// function for Closing Form
const closeStudentForm = () => {
  formBox.classList.add("hidden");
  dataTable.classList.remove("hidden");
  addButton.parentElement.classList.remove("hidden");
  pag.classList.remove("hidden");
  searchBox.classList.remove("hidden");
  addButton.parentElement.parentElement.className = "heading-change ";
  edit = false;
  currentId = undefined;
  setStudentListing(studentList);
};


// function for edit button
const editStudent = (id) => {
  studentList.find((item) => {
    if (item.id == id) {
      openStudentForm();
      edit = true;
      currentId = item.id;
      firstName.value = item.firstName;
      middleName.value = item.middleName;
      lastName.value = item.lastName;
      mobile.value = item.mobile;
      email.value = item.email;
      dob.value = item.dob;
      genderRadios.forEach((radio) => {
        if (radio.id == item.gender) {
          radio.checked = true;
        }
      });

      floatingInputs.forEach((ele)=>{
        elementFloat(ele);
      })
    }
  });
};

//  function for delete button
const deleteStudent = (id) => {
  let result = confirm("You Want to delete this Entry");
  if (result) {
    studentList = studentList.filter((item) => item.id !== id);
    localStorage.setItem("studentList", JSON.stringify(studentList));
    setStudentListing(studentList);
  }
};

// sorting logic
const tableTh = document.querySelectorAll(".sorting");
tableTh.forEach((th) => {
  th.addEventListener("click", (e) => {
    tableTh.forEach((th) => {
      th.innerText = th.innerText.split(" ")[0];
    });

    if (e.target.dataset.direction == "null") {
      studentList = studentList.sort((a, b) =>
        a[`${e.target.dataset.elementName}`].localeCompare(
          b[`${e.target.dataset.elementName}`],
        ),
      );
      e.target.dataset.direction = "asc";
      e.target.innerText = e.target.innerText.split(" ")[0] + " ⇩";
    } else if (e.target.dataset.direction == "asc") {
      studentList = studentList.sort((a, b) =>
        b[`${e.target.dataset.elementName}`].localeCompare(
          a[`${e.target.dataset.elementName}`],
        ),
      );
      e.target.dataset.direction = "des";
      e.target.innerText = e.target.innerText.split(" ")[0] + " ⇧";
    } else if (e.target.dataset.direction == "des") {
      studentList = studentList.sort((a, b) => a.id - b.id);
      localStorage.setItem("studentList", JSON.stringify(studentList));
      e.target.dataset.direction = "null";
      e.target.innerText = e.target.innerText.split(" ")[0];
    }
    setStudentListing(studentList);
    displayStudent(currentPage);
  });
});

// Searching Logic
const searchFilter = (str) => {
    str = str.toLowerCase();
  if (str == "") {
    setStudentListing(studentList);
  } else {
    let filteredList = studentList.filter((item) => {
      return (
        item.firstName.toLowerCase().includes(str) ||
        item.lastName.toLowerCase().includes(str) ||
        item.mobile.toLowerCase().includes(str) ||
        item.email.toLowerCase().includes(str) ||
        item.dob.includes(str)
      );
    });
    setStudentListing(filteredList);
  }
};

const searchBox = document.getElementById("search-box");

