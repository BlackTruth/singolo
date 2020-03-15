document.querySelector(".navbar").addEventListener("click", function(event) {
    document.querySelectorAll(".navbar>span").forEach(elem => elem.classList.remove("active"));
    event.target.classList.add("active");
    location.href = event.target.querySelector("a").href;
});