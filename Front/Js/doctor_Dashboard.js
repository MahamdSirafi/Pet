let menuLi = document.querySelectorAll( '.list-menu' );

menuLi.forEach( li =>
{
    console.log(li);
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
    fetch('http://localhost:7000/api/v1.0.0/users')
    .then(response => response.json())
    .then(data => {
        listUsers = data.doc;
        addDataToHTML();
        // get cart from memory 
    })
}
initApp();
function addDataToHTML ()
{
    // clear data default
    console.log(listProducts);
    let listCartProductsHTML = document.querySelector('.list-users');
    // if has product in Cart
    if(listCartProduct){
        listCartProduct.forEach((cart) => {
            if ( cart )
                {
                    let newCart = document.createElement('div');
                    newCart.classList.add( 'item' );
                newCart.dataset.id = cart.product_id;
                newCart.dataset.type= 'product' ;
                    let positionProduct = listProducts.findIndex( ( value ) => value._id == cart.product_id );
                let info = listProducts[ positionProduct ];
                newCart.dataset.price = info.price ;
                newCart.dataset.name = info.name ;
                newCart.dataset.quantity = cart.quantity ;
                    newCart.innerHTML = 
                    `<img src="${info.image}" crossorigin="anonymous">
                    <div class="info">
                    <div class="name">${info.name}</div>
                        <div class="price">${info.price}SYP /1 product</div>
                        </div>
                        <div class="quantity">${cart.quantity}</div>
                        <div class="returnPrice">${info.price * cart.quantity} SYP</div>`;
                        listCartProductsHTML.appendChild(newCart);
                        totalQuantity = totalQuantity + cart.quantity;
                        totalPrice = totalPrice + (info.price * cart.quantity);
                    }
        })
    }
}