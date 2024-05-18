let tabs = document.querySelectorAll("ul li");
let content = document.querySelectorAll(".content > div");
let img = document.querySelector(".image-cover img");
let inputImage = document.getElementById("file-image");
let form = document.getElementById("prof");
let logoutBtn = document.querySelector(".logout button");
let formpass = document.getElementById("formpass");
let isAdoc = false;
tabs.forEach((li) => {
  li.addEventListener("click", (ele) => {
    tabs.forEach((lis) => {
      lis.classList.remove("active");
    });
    ele.currentTarget.classList.add("active");
    content.forEach((cont) => {
      cont.style.display = "none";
    });
    document.querySelector(ele.currentTarget.dataset.tab).style.display =
      "block";
  });
});

var editFormData;
function getFormData() {
  return {
    image: document.getElementById("file-image").value,
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    health_centers: {
      name: document.getElementById("care").value,
      address: document.getElementById("address").value,
    },
  };
}

function clearFormData() {
  document.getElementById("file-image").value = "";
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("care").value = "";
  document.getElementById("address").value = "";
}

function setFormData(name, email, care, address) {
  // document.getElementById("image").value = image;
  document.getElementById("name").value = name;
  document.getElementById("email").value = email;
  document.getElementById("care").value = care;
  document.getElementById("address").value = address;
}

const getData = () => {
  // get data from json
  fetch("http://localhost:7000/api/v1.0.0/users/me", {
    method: "GET",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  })
    .then((response) => response.json())
    .then((data) => {
      listDoctor = data.doc;
      document.getElementById("name").value = listDoctor.name;
      img.src = listDoctor.photo;
      document.getElementById( "email" ).value = listDoctor.email;
      if ( listDoctor.role == 'doctor' )
          { 
        document.querySelectorAll( '.doctor' ).forEach( ( doctor ) =>
        {
          doctor.style.display = 'flex';
         } )
          }

      document.getElementById("care").value = listDoctor.health_centers.name;
      document.getElementById("address").value =
        listDoctor.health_centers.address;
    });
};
getData();
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const fileInput = document.getElementById("file-image");
  const file = fileInput.files[0];
  const formData = new FormData();
  if (file) {
    formData.append("photo", file);
  }
  formData.append("name", document.getElementById("name").value);
  formData.append( "email", document.getElementById( "email" ).value ); 
  formData.append("health_centers.name", document.getElementById("care").value);
  formData.append(
    "health_centers.address",
    document.getElementById("address").value
  );
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${localStorage.getItem("token")}`);
  try {
    fetch("http://localhost:7000/api/v1.0.0/users/updateMeAndUpload", {
      method: "PATCH",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: headers,
      body: formData,
      redirect: "follow",
      referrerPolicy: "no-referrer",
    })
      .then((response) => response.json())
      .then((data) => {
        if ( data.status == "success" )
        {
          alert("لقد تم التعديل بنجاح");
          getData();
        } else {
          alert(data.message);
        }
      });
  } catch (err) {
    console.log(err);
  }
});

let imgChange = () => {
  inputImage.addEventListener("change", () => {
    img.src = URL.createObjectURL(inputImage.files[0]);
  });
};
imgChange();

// To Change Password
formpass.addEventListener("submit", (event) => {
  event.preventDefault();
  if (
    document.getElementById("repeat-new-password").value !=
    document.getElementById("new-password").value
  ) {
    alert("لم يتم تاكيد كلمة السر");
  } else {
    let data = {
      passwordCurrent: document.getElementById("current-password").value,
      password: document.getElementById("repeat-new-password").value,
    };
    try {
      fetch("http://localhost:7000/api/v1.0.0/users/updateMyPassword", {
        method: "PATCH",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status == "success") {
            localStorage.setItem("token", data.token);
            alert("لقد تم تعديل كلمة السر بنجاح");
            getData();
          } else {
            alert(data.message);
          }
        });
    } catch (err) {
      console.log(err);
    }
  }
});
logoutBtn.addEventListener( 'click',( e ) =>
{ 
  e.preventDefault();
 try{
  fetch( 'http://localhost:7000/api/v1.0.0/users/logout', {
    method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
  }) .then((response) => response.json())
      .then((data) => {
        if (data.status == "success") {
          alert( "لقد تم تسجيل الخروج بنجاح" );
          localStorage.removeItem( 'token' );
          localStorage.removeItem("preCart");
          window.location.href = "/Front/Html/signin_Arabic.html";

          
        } else {
          alert(data.message);
        }
      });
  } catch (err) {
    console.log(err);
  }
});

