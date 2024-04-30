
const form = document.getElementById("inputs");
form.addEventListener("submit", (event) => {
  event.preventDefault();

  let data = {
    name: document.getElementById("username").value,
    password: document.getElementById("password").value
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
        if (data.status == "success") {
          localStorage.setItem('token', data.token)
          if (data.user.role == "admin") {

            window.location.href = "/Front/Html/crud_Dashboard.html";
          } else {
            window.location.href = "/Front/homepage_Arabic.html";
          }
        } else {
          alert(data.message);
        }
      });
  } catch (err) {
    console.log(err);
  }
});