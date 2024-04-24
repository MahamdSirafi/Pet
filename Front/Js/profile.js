let tabs = document.querySelectorAll("ul li");
let content = document.querySelectorAll(".content > div");
let img = document.querySelector(".image-cover img");
let inputImage = document.getElementById('file-image');


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