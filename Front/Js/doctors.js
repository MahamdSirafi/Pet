// Swiper ..
var swiper = new Swiper(".slide-content", {
    slidesPerView: 1,
    spaceBetween: 45,
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

// Fetch Doctors
let container = document.querySelector( ".card-wrapper" );
let listDoctor;
const addDataToHTML = () =>
{ 
    listDoctor.forEach(element => {
        let newDoc = document.createElement( 'div' );
        newDoc.classList.add("doctor-card");
        newDoc.classList.add("swiper-slide");
    newDoc.innerHTML = `
                            <div class="image-content">
                                        <div class="card-image">
                                            <img src="${element.image}" alt="">
                                        </div>
                                    </div>
                                    <div class="card-content">
                                        <div class="text">
                                            <h2 class="name">${element.doctor_name}</h2>
                                            <p class="description">Care Center : ${element.care_center}</p>
                                            <p class="description">Care Address :${element.care_address}</p>
                                        </div>
                                    </div>

    `;
        container.appendChild(newDoc);
    });
};
const initApp = () => {
    // get data from json
    fetch( "/Front/Js/doctors.json" )        
    .then(response => response.json())
    .then(data => {
        // listProducts = data.doc;
        listDoctor = data;
        // console.log(data)
        // console.log(data.doc)
        addDataToHTML();
        // get cart from memory 
        // if (localStorage.getItem('cart')) {
        //     listcard = JSON.parse(localStorage.getItem('cart'));
        //     addCartToHTML();
        // }
    })
}
initApp();
addDataToHTML();