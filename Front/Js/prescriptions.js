// Helpful Variables for Cart & Main Products
let iconCart = document.querySelector(".icon-cart");
let body = document.querySelector("body");
let closeCart = document.querySelector(".close");
let listProductHTML = document.querySelector(".product-list");
let listProducts = [];
let listcardHtml = document.querySelector(".list-cart");
let listcard = [];

// Open & Closing Cart
let iconCartSpan = document.querySelector(".icon-cart span");
iconCart.addEventListener('click', () => {
    body.classList.toggle("show-cart");
})
closeCart.addEventListener('click', () => {
    body.classList.toggle("show-cart");
})
let med = JSON.parse( localStorage.getItem( 'listMed' ) );

// Showing Products Function
const addDataToHTML = () => {
    listProductHTML.innerHTML = '';
    
    if (listProducts.length > 0) {
        listProducts.forEach( product =>
            {
            let newProduct = document.createElement( 'div' );
            product.cart.forEach( ( cart =>
            { 
                med.forEach( ( med ) =>
                { 
                    
                        if (med._id === cart.product._id)
                   {
                    newProduct.classList.add( 'product-item' );
                    newProduct.dataset.id = product._id;
                    newProduct.innerHTML = ` 
                    <img src="${ med.image }" alt="" crossorigin="anonymous">
                    <h2>${ cart.product.name }</h2>
                    <div class="doctor">D.${ product.doctor.name }</div>
                    <div class="prices">Price : ${ med.price }SYP</div>
                    <div class="dis">After discount : ${ med.price*0.25 }SYP</div>
                    <div class="quantity">Quantity : ${ cart.quantity }</div>
                    <button class="addcart">Add To Cart </button>`;
                }
            })
            } ))
                
            
            listProductHTML.appendChild(newProduct);
        })
    }
}

// Add Product To Cart
listProductHTML.addEventListener( 'click', ( event ) =>
{
    let positionClick = event.target;
    if ( positionClick.classList.contains( 'addcart' ) )
    {
        let product_id = positionClick.parentElement.dataset.id;
        addToCart(product_id);
    }

} );

const addToCart = (product_id) => {
    let positionThisProductInCart = listcard.findIndex( ( value ) => value.product_id == product_id );
    if (listcard.length <= 0) {
        listcard = [{
            product_id: product_id,
            quantity: 1
        }]
    } else if (positionThisProductInCart < 0) {
        listcard.push({
            product_id: product_id,
            quantity: 1
        })
    } else {
        listcard[positionThisProductInCart].quantity = listcard[positionThisProductInCart].quantity + 1;
    }
    addCartToHTML();
    addCartToMemory();
}
// To Store Cart Products In Memory

const addCartToMemory = () => {
    localStorage.setItem('preCart', JSON.stringify(listcard));
}
// Adding To Cart Function

const addCartToHTML = () => {
    listcardHtml.innerHTML = '';
    let totalQuantity = 0;
    if (listcard.length > 0) {
        listcard.forEach(cart => {
            totalQuantity = totalQuantity + cart.quantity;
            let newCart = document.createElement('div');
            newCart.classList.add('item');
            newCart.dataset.id = cart.product_id;
            let positionProduct = listProducts.findIndex( ( value ) => value._id == cart.product_id );
            let info = listProducts[ positionProduct ];
            info.cart.forEach( carts =>
            { 
                med.forEach( med =>
                { 
                        if (med._id === carts.product._id)
                    
                        newCart.innerHTML = `<div class="image">
                        <img src="${med.image}" alt="" crossorigin="anonymous">
                    </div>
                    <div class="name">
                        ${carts.product.name}
                    </div>
                    <div class="total-price">
                    ${med.price *0.25* cart.quantity} SYP
                    </div>
                    <div class="quantity">
                        <span class="minus"> - </span>
                        <span>${cart.quantity}</span>
                        <span class="plus"> + </span>
                    </div>`;
           
                    listcardHtml.appendChild(newCart);
                } )
            } )
        })
    }
    iconCartSpan.innerText = totalQuantity;
}
// To Control Quantities

listcardHtml.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('minus') || positionClick.classList.contains('plus')) {
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = 'minus';
        if (positionClick.classList.contains('plus')) {
            type = 'plus';
        }
        changeQuantity(product_id, type);
    }
})
// Quantity Function

const changeQuantity = (product_id, type) => {
    let positionItemCart = listcard.findIndex((value) => value.product_id == product_id);
    if (positionItemCart >= 0) {
        switch (type) {
            case 'plus':
                listcard[positionItemCart].quantity = listcard[positionItemCart].quantity + 1;
                break;

            default:
                let valueChange = listcard[positionItemCart].quantity - 1;
                if (valueChange > 0)
                    listcard[positionItemCart].quantity = valueChange;
                else {
                    listcard.splice(positionItemCart, 1)
                }
                break;
        }
    }
    addCartToMemory();
    addCartToHTML();
}
// Fetch Data To Use As Products

const initApp = () => {
    // get data from json
    fetch( 'http://localhost:7000/api/v1.0.0/prescriptions/mine' , {
    method: "GET",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  })
    .then(response => response.json())
    .then(data => {
        listProducts = data.doc;
        addDataToHTML();
        // get cart from memory 
        if (localStorage.getItem('preCart')) {
            listcard = JSON.parse(localStorage.getItem('preCart'));
            addCartToHTML();
        }
    })
}
initApp();