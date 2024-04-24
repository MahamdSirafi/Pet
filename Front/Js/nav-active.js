let NavLi = document.querySelectorAll( ".Navbar li a" );

   
NavLi.forEach( (nav) =>
{  
    nav.addEventListener( "click", (e) =>
    { 
       NavLi.forEach( (li) =>
        { 
            li.classList.remove("active");
        } )
        e.target.classList.add("active");
    } )
} )