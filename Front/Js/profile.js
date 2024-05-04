let tabs = document.querySelectorAll("ul li");
let content = document.querySelectorAll(".content > div");
let img = document.querySelector(".image-cover img");
let inputImage = document.getElementById('file-image');
let isAdoc = false;
function editData ()
      {
        var formData = getFormData();
        formData[ "id" ] = editFormData._id; // get _id from selected user
        fetch( "http://localhost:7000/api/v1.0.0/user/" + editFormData._id, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${ localStorage.getItem( "token" ) }`,
          },
          body: JSON.stringify( formData ),
        } )
          .then( ( res ) => res.json() )
          .then( ( response ) =>
          {
            if ( response.status == "success" )
            {
              setSuccessMessage( "update Product is success" );
            //   clearFormData();
              // reload table
            } else
            {
              setSuccessMessage( response.message );
            }
          } );
      }
function editDataCall ( id )
      {
        // call get user details by id API
        fetch( "http://localhost:7000/api/v1.0.0/user/" + id, {
          method: "GET",
        } )
          .then( ( res ) => res.json() )
          .then( ( response ) =>
          {
            console.log( "Edit info", response );
            editFormData = response.doc;
            setFormData(
              editFormData.name,
              editFormData.email,
              editFormData.health_centers.name,
              editFormData.health_centers.address
            );
          } );
      }
function getFormData ()
{
    return {
        //   image: document.getElementById("image").value,
        name: document.getElementById( "name" ).value,
        email: document.getElementById( "email" ).value,
        health_centers: {
            name: document.getElementById( "care" ).value,
            address: document.getElementById( "address" ).value
        }
    };
}
     

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

inputImage.addEventListener('click', () => {
    img.src = URL.createObjectURL(inputImage.files[0]);
});

if (!isAdoc) {
    document.querySelector(".doctor").style.display = "none";

}