let listProducts = [];
let listPets = [];
let listCartProduct = [];
let listCartPet = [];
let listCart = [];
let totalQuantity = 0;
let totalPrice = 0;
const initAppPet = () => {
    // get data from json
    fetch('http://localhost:7000/api/v1.0.0/pets')
    .then(response => response.json())
    .then(data => {
        listPets = data.doc;
        // localStorage.setItem('listPets',listPets);
        addPetCartToHTML();
        
        
    })
}
localStorage.removeItem('listPets');
localStorage.removeItem('listProducts');
initAppPet();

const initAppProduct = () => {
    // get data from json
    fetch('http://localhost:7000/api/v1.0.0/products')
    .then(response => response.json())
    .then(data => {
        listProducts = data.doc;
        // localStorage.setItem('listProducts',listProducts);

        addProductCartToHTML();
        
       
    })
}
initAppProduct();
function checkCart(){
    
    listCartProduct = JSON.parse(localStorage.getItem( 'productCart' ));
    listCartPet = JSON.parse(localStorage.getItem( 'petCart' )) ;
    
}
checkCart();
function addProductCartToHTML ()
{
    // clear data default
    console.log(listProducts);
    let listCartProductsHTML = document.querySelector('.returnCart .list');
    let totalQuantityHTML = document.querySelector('.totalQuantity');
    let totalPriceHTML = document.querySelector('.totalPrice');
    // if has product in Cart
    if(listCartProduct){
        listCartProduct.forEach((cart) => {
            if ( cart )
                {
                    let newCart = document.createElement('div');
                    newCart.classList.add( 'item' );
                newCart.dataset.id = cart.product_id;
                    let positionProduct = listProducts.findIndex( ( value ) => value._id == cart.product_id );
                let info = listProducts[ positionProduct ];
                    newCart.innerHTML = 
                    `<img src="${info.image}" crossorigin="anonymous">
                    <div class="info">
                    <div class="name">${info.name}</div>
                        <div class="price">$${info.price}/1 product</div>
                        </div>
                        <div class="quantity">${cart.quantity}</div>
                        <div class="returnPrice">$${info.price * cart.quantity}</div>`;
                        listCartProductsHTML.appendChild(newCart);
                        totalQuantity = totalQuantity + cart.quantity;
                        totalPrice = totalPrice + (info.price * cart.quantity);
                    }
        })
    }
    totalQuantityHTML.innerText = totalQuantity;
    totalPriceHTML.innerText = '$' + totalPrice;
}
function addPetCartToHTML ()
{
    // clear data default
    let listCartPetsHTML = document.querySelector('.returnCart .list');
    let totalQuantityHTML = document.querySelector('.totalQuantity');
    let totalPriceHTML = document.querySelector('.totalPrice');
    // if has product in Cart
    if(listCartPet){
        listCartPet.forEach((cart) => {
            if ( cart )
                {
                    let newCart = document.createElement('div');
                    newCart.classList.add( 'item' );
                newCart.dataset.id = cart.product_id;
                    let positionProduct = listPets.findIndex( ( value ) => value._id == cart.product_id );
                let info = listPets[ positionProduct ];
                    newCart.innerHTML = 
                    `<img src="${info.image}" crossorigin="anonymous">
                    <div class="info">
                    <div class="name">${info.name}</div>
                        <div class="price">$${info.price}/1 product</div>
                        </div>
                        <div class="quantity">${cart.quantity}</div>
                        <div class="returnPrice">$${info.price * cart.quantity}</div>`;
                        listCartPetsHTML.appendChild(newCart);
                        totalQuantity = totalQuantity + cart.quantity;
                        totalPrice = totalPrice + (info.price * cart.quantity);
                    }
        })
    }
    totalQuantityHTML.innerText = totalQuantity;
    totalPriceHTML.innerText = '$' + totalPrice;
}