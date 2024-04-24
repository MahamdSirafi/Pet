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

