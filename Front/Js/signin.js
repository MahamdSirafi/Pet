const form = document.getElementById("inputs");
const forgot = document.querySelector('.pass');
form.addEventListener("submit", (event) => {
  event.preventDefault();

  let data = {
    email: document.getElementById("username").value,
    password: document.getElementById("password").value
  };
  try {
    fetch( "http://localhost:7000/api/v1.0.0/users/login", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status == "success") {
          localStorage.setItem('token', data.token)
          if ( data.user.role === "admin" )
          {
            localStorage.setItem( "admin", data.user );
            window.location.href = "/Front/Html/crud_Dashboard_products_English.html";
          } else if ( data.user.role === "doctor" )
          {
            localStorage.setItem( "doctor", data.user );
            window.location.href = "/Front/Html/doctor_DashBoard.html";
          } else
          {
            window.location.href = "/Front/homepage_Arabic.html";

          }
        } else {
          alert(data.message);
        }
      });
  } catch (err) {
    console.log(err);
  }
} );
forgot.addEventListener( "click", (e) =>
{ 
  e.preventDefault();
  
  let data = {
    email: document.getElementById( "username" ).value
  };
try {
    fetch( "http://localhost:7000/api/v1.0.0/users/forgotPassword", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status == "success") {
          alert( "سيتم الانتقال لصفحة تغيير كلمة المرور" );
          window.location.href="/api/views/user/resetPassword1.ejs"
                } else {
                  alert(data.message);
                }
      });
  } catch (err) {
    console.log(err);
  }
} );
