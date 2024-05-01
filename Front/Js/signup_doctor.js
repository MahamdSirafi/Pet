let form = document.getElementById("inputs");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    let data = {
        name: document.getElementById("username").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        care_center: document.getElementById("center").value,
        address: document.getElementById("address").value,
        role: "doctor"

    };
    try {
        fetch("http://localhost:7000/api/v1.0.0/users/signup", {
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
                    localStorage.setItem("jwt", data.token)
                    localStorage.setItem("doctor", data.user)
                    window.location.href = "/Front/doctor_DashBoard.html";
                } else {
                    alert(data.message);
                }
            });
    }
    catch (err) {
        console.log(err);
    }


})