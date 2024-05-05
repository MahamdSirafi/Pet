
let tabs = document.querySelectorAll("ul li");
let content = document.querySelectorAll(".content > div");
let img = document.querySelector(".image-cover img");
let inputImage = document.getElementById( 'file-image' );
let form = document.getElementById("prof");
let isAdoc = false;
let doctor = JSON.stringify(localStorage.getItem( 'token' ));
console.log(doctor);
tabs.forEach((li) => {

    li.addEventListener("click", (ele) => {
        tabs.forEach((lis) => {
            lis.classList.remove("active");
        })
        ele.currentTarget.classList.add("active");
        content.forEach((cont) => {
            cont.style.display = "none";
        })
        document.querySelector(ele.currentTarget.dataset.tab).style.display = "block";



    });



});

var editFormData;
function getFormData ()
      {
        return {
            image: document.getElementById("file-image").value,
          name: document.getElementById( "name" ).value,
          email: document.getElementById( "email" ).value,
          care: document.getElementById( "care" ).value,
          address: document.getElementById( "address" ).value
        };
}
      
function clearFormData ()
      {
        document.getElementById( "file-image" ).value = "";
        document.getElementById( "name" ).value = "";
        document.getElementById( "email" ).value = "";
        document.getElementById( "care" ).value = "";
        document.getElementById( "address" ).value = "";
}
      
      function setFormData ( name, email, care, address )
      {
        // document.getElementById("image").value = image;
        document.getElementById( "name" ).value = name;
        document.getElementById( "email" ).value = email;
        document.getElementById( "care" ).value = care;
        document.getElementById( "address" ).value = address;
      }

const getData = () =>
{
    // get data from json
    fetch( "http://localhost:7000/api/v1.0.0/users/me", {
        method: "GET",
        headers: { "Authorization": `Bearer ${ localStorage.getItem( "token" ) }` }
    } )
        .then( response => response.json() )
        .then( data =>
        {
            listDoctor = data.doc;
            console.log(listDoctor);
            document.getElementById( "name" ).value = listDoctor.name;
            img.src = listDoctor.photo;
            // document.getElementById('file-image').value = listDoctor.photo;
            document.getElementById( "email" ).value = listDoctor.email;
            document.getElementById( "care" ).value = listDoctor.health_centers.name;
            document.getElementById( "address" ).value = listDoctor.health_centers.address;


            
        } );
};
getData();
// function editDataUser ()
// {
//         // let payload = getFormData();
//         const fileInput = document.getElementById( "file-image" );
//         const file = fileInput.files[ 0 ];
//         img.src = fileInput.files[ 0 ];
//         const formData = new FormData();
//         formData.append( "photo", file );
//         formData.append( "name", document.getElementById( "name" ).value );
//         formData.append( "email", document.getElementById( "email" ).value );
//         formData.append( "name", document.getElementById( "care" ).value );
//         formData.append( "address", document.getElementById( "address" ).value );
//         const headers = new Headers();
//         headers.append(
//           "Authorization",
//           `Bearer ${ localStorage.getItem( "token" ) }`
//         );
//         fetch( "http://localhost:7000/api/v1.0.0/users/updateMeAndUpload", {
//           method: "PATCH",
//           headers: headers,
//           body: formData,
//         } )
//           .then( ( res ) => res.json() )
//           .then( ( response ) =>
//           {
//             editFormData = response.doc;
//             setFormData(
//               editFormData.name,
//               editFormData.email,
//               editFormData.health_centers.name,
//               editFormData.health_centers.address
//             );
//             if ( response.status == "success" )
//             {
//               setSuccessMessage( "add Product is success" );
//               // clear input email and name
//               clearFormData();
//               getData();
//               // reload table
//             } else
//             {
//               setSuccessMessage( response.message );
//             }
//           } );
// }
//   editDataUser();
    
form.addEventListener("submit", (event) => {
  event.preventDefault();
        const fileInput = document.getElementById( "file-image" );
        const file = fileInput.files[ 0 ];
        const formData = new FormData();
        formData.append( "photo", file );
        formData.append( "name", document.getElementById( "name" ).value );
        formData.append( "email", document.getElementById( "email" ).value );
        formData.append( "name", document.getElementById( "care" ).value );
        formData.append( "address", document.getElementById( "address" ).value );
        console.log(formData);
        const headers = new Headers();
        headers.append(
          "Authorization",
          `Bearer ${ localStorage.getItem( "token" ) }`
        );
  try {
    fetch( "http://localhost:7000/api/v1.0.0/users/updateMeAndUpload", {
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
        if (data.status == "success") {
          setSuccessMessage( data.message );
        } else
        {
          alert(data.message);
        }
      });
  } catch (err) {
    console.log(err);
  }
} );

let imgChange = () =>
{
inputImage.addEventListener('click', () => {
    img.src = URL.createObjectURL( inputImage.files[ 0 ] );
});
};
imgChange();
// To Change Password
form.addEventListener("submit", (event) => {
  event.preventDefault();

  let data = {
    newPassword: document.getElementById("new-password").value,
    repeatPassword: document.getElementById("repeat-new-password").value
  };
  try {
    fetch( "http://localhost:7000/api/v1.0.0/users/updateMyPassword", {
      method: "PATCH",
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
          setSuccessMessage( data.message );
        } else
        {
          alert(data.message);
        }
      });
  } catch (err) {
    console.log(err);
  }
});