
const form = document.querySelector(".form");
form.addEventListener("submit", (event) => {
  event.preventDefault();

  let data = {
    email: document.getElementById("em").value,
    password: document.getElementById("pas").value,
  };
  try {
    fetch("http://localhost:8000/api/v1.0.0/users/login", {
      method: "POST",
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
        if (data.status=="success") {
          localStorage.setItem('token',data.token)
          if (data.user.role=="admin") {
     
            window.location.href = "./dashbord.html";
          } else {
            window.location.href = "./index.html";
          }
        } else {
          alert(data.message);
        }
      });
  } catch (err) {
    console.log(err);
  }});