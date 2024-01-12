const mode = document.querySelector(".switch");

mode.addEventListener("click", ()=>{
    mode.classList.toggle("active");
    document.body.classList.toggle("active");
})