let toggle = document.querySelector( ".toggle" );
let nav = document.querySelector(".Navbar");
let icon = document.querySelector( ".icons" );

toggle.addEventListener( "click", () => {
    nav.classList.toggle("open-toggle");
    icon.classList.toggle("open-icons");

} );