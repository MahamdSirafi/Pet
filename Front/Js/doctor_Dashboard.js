let menuLi = document.querySelectorAll( '.list-menu' );

menuLi.forEach( li =>
{
    li.addEventListener( 'click',(event) =>
    { 
        menuLi.forEach( ( li ) => { li.classList.remove( 'active' ); } );
        event.target.classList.add( 'active' );
    } );
} );
let listUsers;
// Fetch Users
const initApp = () => {
    // get data from json
    fetch('http://localhost:7000/api/v1.0.0/users?role=user')
    .then(response => response.json())
    .then(data => {
      listUsers = data.doc;
      console.log(listUsers);
      localStorage.setItem('listUsers' , JSON.stringify(listUsers));
      addDataToHTML();
        // get cart from memory 
    })
}

initApp();
let listUserInput = [];

function addDataToHTML ()
{
    // clear data default
    let listUsersHTML = document.querySelector('.list-users');
    // if has product in Cart
    if(listUsers){
        listUsers.forEach((user) => {
            if ( user )
            {
                let newUser = document.createElement( 'div' );
                newUser.classList.add( 'item' );
                newUser.dataset.id = user._id;
                newUser.innerHTML =
                    `
                        <input type="radio" class="btn-check" name="vbtn-radio" id="${user._id}" autocomplete="off">
                        <label class="btn btn-outline-danger d-flex" for="${user._id}">
                        <img src="${ user.photo }" alt="" crossorigin="anynomous">
                        <h2>${ user.name }</h2>
                        </label>
                        `;
                listUsersHTML.appendChild( newUser );
            }
            listUserInput.push(document.getElementById(`${user._id}`));

        })
  }
  // localStorage.setItem('userInput', listUserInput);
  
}

let listMed;
const initProduct  = () => {
    // get data from json
    fetch('http://localhost:7000/api/v1.0.0/products?type=medican')
    .then(response => response.json())
    .then(data => {
      listMed = data.doc;
      // console.log(listMed);
      localStorage.setItem('listMed' , JSON.stringify(listMed));
      addMedicineToHTML();
      
        // get cart from memory 
    })
};
initProduct();
let listMedInput = [];
function addMedicineToHTML ()
{
    // clear data default
    let listUsersHTML = document.querySelector('.list-medicines');
    // if has product in Cart
    if(listMed){
        listMed.forEach((med) => {
            if ( med )
            {
                let newMed = document.createElement( 'div' );
                newMed.classList.add( 'item' );
                newMed.dataset.id = med._id;
                newMed.innerHTML =
                `
                <div class="form-check d-flex align-items-center">
                <input class="form-check-input " type="checkbox" value="" id="${med._id}" nn="${med._id}" required>
                <label class="form-check-label d-flex align-items-center" for="${med._id}">
                <img id="image-list" src="${med.image}" crossorigin="anynomous" alt="">
                <p>${med.name}</p>
                </label>
                <input class="form-number-input " type="number" value="" id="quantity${med._id}" required>
                </div>
                
                `;
                listUsersHTML.appendChild( newMed );
                
            }
          listMedInput.push( document.getElementById( `${ med._id }` ) );
          
        })
      }
  
}
//logout
logoutBtn = document.querySelector('.logout');
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
          window.location.href = "/Front/Html/signin_Arabic.html";

          
        } else {
          alert(data.message);
        }
      });
  } catch (err) {
    console.log(err);
  }
} );



let listM = JSON.parse( localStorage.getItem( 'listMed' ) );

let postPrescription = () =>
{
  
  // let listUserInput = localStorage.getItem('userInput');
  let checkBtn = document.getElementById( "sub" );
  checkBtn.addEventListener( "click", ( e ) =>
  {
    e.preventDefault();
  let data = {
      cart: [],
      user:'',
  };
  listMedInput.forEach( ( li ) =>
    {

        if (li.checked === true)
          {  
            let index = listM.findIndex((value) => value._id == li.parentElement.parentElement.dataset.id);
            data.cart.push( {
                product: listMed[index]._id,
                quantity: document.getElementById(`quantity${listMed[index]._id}`).value,
                _id: listMed[index]._id,
            } );
        }
    } );
    listUserInput.forEach( ( us ) =>
    { 
        if ( us.checked === true )
          { 
            data.user = us.parentElement.dataset.id;
        }
    } )
  try {
    fetch("http://localhost:7000/api/v1.0.0/prescriptions", {
      method: "POST",
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
          alert("تم اضافة الوصفة  بنجاح");
        } else {
          alert( data.message );
        }
      });
  } catch (err) {
    console.log(err);
  }
});
};
postPrescription();
