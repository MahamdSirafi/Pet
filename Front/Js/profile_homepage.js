let img = document.querySelector('.image-profile a img');
let imgProf = document.querySelector( '.image-profile' );
let signinBtn = document.querySelector( '.icons button' );
if ( localStorage.getItem( 'token' ) )
{
    signinBtn.style.display = 'none';
} else
{ 
     imgProf.style.display = 'none';
    
}
const getData = () =>
{
  // get data from json
  fetch("http://localhost:7000/api/v1.0.0/users/me", {
    method: "GET",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  })
    .then((response) => response.json())
    .then((data) => {
        listDoctor = data.doc;

       
        img.src = listDoctor.photo;
    });
};
getData();
