document.querySelector("#navbar").addEventListener("click", function(event) {
  document
    .querySelectorAll("#navbar>span")
    .forEach(elem => elem.classList.remove("active"));
  event.target.classList.add("active");
  location.href = event.target.querySelector("a").href;
});

document
  .querySelector("#portfolio-buttons")
  .addEventListener("click", function(event) {
    if (event.target.id == "portfolio-buttons") return;
    let counter = 0;
    let button;
    let flag = false;

    if (event.target.tagName == "SPAN") {
      button = event.target.parentElement;
    } else {
      button = event.target;
    }

    document.querySelectorAll("#portfolio-buttons>div").forEach(elem => {
      if (button != elem && !flag) {
        counter++;
      } else {
        flag = true;
      }
      elem.classList.remove("active");
    });
    button.classList.add("active");
    document
      .querySelectorAll("#portfolioImages>.portfolio-image")
      .forEach((elem, index) => {
        elem.style.order = ( index + counter ) % 12;
      });
  });

  portfolioImages.addEventListener("click", function(event) {
    portfolioImages
      .querySelectorAll(".portfolio-image")
      .forEach(elem => elem.classList.remove("bordered"));
    event.target.classList.add("bordered");
  });
