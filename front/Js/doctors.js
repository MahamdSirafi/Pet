// var swiper = new Swiper(".slide-Content", {
//     slidesPreView: 3,
//     spaceBetween: 30,
//     slidesPerGroup: 3,
//     loop: true,
//     loopFillGroupWithBlank: true,
//     pagination: {
//         e1: ".swiper-pagination",
//         clickable: true,
//     },
//     navigation: {
//         nextE1: ".swiper-button-next",
//         prevE1: ".swiper-button-prev"
//     },


// });
var swiper = new Swiper(".slide-content", {
    slidesPerView: 1,
    spaceBetween: 40,
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