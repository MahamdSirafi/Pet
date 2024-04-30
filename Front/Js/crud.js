var form = document.getElementById("myForm"),
    imgInput = document.querySelector(".img"),
    file = document.getElementById("imgInput"),
    userName = document.getElementById("name"),
    age = document.getElementById("price"),
    city = document.getElementById("type"),
    email = document.getElementById("category"),
    phone = document.getElementById("company"),
    submitBtn = document.querySelector(".submit"),
    userInfo = document.getElementById("data"),
    modal = document.getElementById("userForm"),
    modalTitle = document.querySelector("#userForm .modal-title"),
    newUserBtn = document.querySelector(".newUser")


// let getData = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : []

let isEdit = false, editId
showInfo()

newUserBtn.addEventListener('click', () => {
    submitBtn.innerText = 'Submit',
        modalTitle.innerText = "Fill the Form"
    isEdit = false
    imgInput.src = "/Front/assets/Profile Icon.webp"
    form.reset()
})


file.onchange = function () {
    if (file.files[0].size < 1000000) {  // 1MB = 1000000
        var fileReader = new FileReader();

        fileReader.onload = function (e) {
            imgUrl = e.target.result
            imgInput.src = imgUrl
        }

        fileReader.readAsDataURL(file.files[0])
    }
    else {
        alert("This file is too large!")
    }
}


function showInfo() {
    try {
        fetch(`http://localhost:7000/api/v1.0.0/products?type=product`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.status == "success") {
                    document.querySelectorAll('.employeeDetails').forEach(info => info.remove())
                    data.doc.forEach((element, index) => {
                        let createElement = `<tr class="employeeDetails">
            <td>${index + 1}</td>
            <td><img src="${element.picture}" alt="" width="50" height="50"></td>
            <td>${element.employeeName}</td>
            <td>${element.employeeAge}</td>
            <td>${element.employeeCity}</td>
            <td>${element.employeeEmail}</td>
            <td>${element.employeePhone}</td>
            <td>
                <button class="btn btn-success" onclick="readInfo('${element.picture}', '${element.employeeName}', '${element.employeeAge}', '${element.employeeCity}', '${element.employeeEmail}', '${element.employeePhone}', '${element.employeePost}', '${element.startDate}')" data-bs-toggle="modal" data-bs-target="#readData"><i class="bi bi-eye"></i></button>

                <button class="btn btn-primary" onclick="editInfo(${index}, '${element.picture}', '${element.employeeName}', '${element.employeeAge}', '${element.employeeCity}', '${element.employeeEmail}', '${element.employeePhone}', '${element.employeePost}', '${element.startDate}')" data-bs-toggle="modal" data-bs-target="#userForm"><i class="bi bi-pencil-square"></i></button>

                <button class="btn btn-danger" onclick="deleteInfo(${index})"><i class="bi bi-trash"></i></button>
                            
            </td>
        </tr>`

                        userInfo.innerHTML += createElement

                    });

                } else {
                    alert(data.messag);
                }
            });

    } catch (err) {
        console.log(err);
    }

}
showInfo()


function readInfo(pic, name, age, city, email, phone) {
    document.querySelector('.showImg').src = pic,
        document.querySelector('#showName').value = name,
        document.querySelector("#showAge").value = age,
        document.querySelector("#showCity").value = city,
        document.querySelector("#showEmail").value = email,
        document.querySelector("#showPhone").value = phone
}


function editInfo(index, pic, name, Age, City, Email, Phone) {
    isEdit = true
    editId = index
    imgInput.src = pic
    userName.value = name
    age.value = Age
    city.value = City
    email.value = Email,
        phone.value = Phone

    submitBtn.innerText = "Update"
    modalTitle.innerText = "Update The Form"
}


function deleteInfo(index) {
    if (confirm("Are you sure want to delete?")) {
        fetch(`http://localhost:8000/api/v1.0.0/products/${index}`, {
            method: "DELETE",
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status = "success") {
                    alert("delete success")
                    window.location.href = "/Front/Html/crud_Dashboard.html"
                }
                else {
                    alert(data.messag)

                }
            })


    }
}
showInfo()

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const information = {
        picture: imgInput.src == undefined ? "./image/Profile Icon.webp" : imgInput.src,
        employeeName: userName.value,
        employeeAge: age.value,
        employeeCity: city.value,
        employeeEmail: email.value,
        employeePhone: phone.value
    }
    try {
        fetch(`http://localhost:8000/api/v1.0.0/use/${index}`, {
            method: "PATCH",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status == "success") {
                    alert("success");
                    window.location.href = "/Front/Html/crud_Dashboard.html";
                } else {
                    alert(data.message);
                }
            });
    } catch (err) {
        console.log(err);
    }
});

submitBtn.innerText = "Submit"
modalTitle.innerHTML = "Fill The Form"

showInfo()

form.reset()

imgInput.src = "./image/Profile Icon.webp"

// modal.style.display = "none"
// document.querySelector(".modal-backdrop").remove()
