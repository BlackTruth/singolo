document.querySelector("#navbar").addEventListener("click", function(event) {
  document
    .querySelectorAll("#navbar>span")
    .forEach(elem => elem.classList.remove("active"));
  event.target.classList.add("active");
  location.href = event.target.querySelector("a").href;
  console.log(location);
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
        elem.style.order = (index + counter) % 12;
      });
  });

portfolioImages.addEventListener("click", function(event) {
  portfolioImages
    .querySelectorAll(".portfolio-image")
    .forEach(elem => elem.classList.remove("bordered"));
  event.target.classList.add("bordered");
});

function showAlert(subject, description) {
  subject = subject.trim();
  description = description.trim();
  let fragment = document.createDocumentFragment();
  let body = document.querySelector("body");
  let wrapper = document.createElement("div");
  wrapper.classList.add("alert-wrapper");
  fragment.appendChild(wrapper);
  let message = document.createElement("div");
  message.classList.add("alert-message");
  wrapper.appendChild(message);
  let field = document.createElement("p");
  field.innerText = "The letter was sent";
  message.appendChild(field);
  field = document.createElement("p");
  if (subject) field.innerText = "Subject: " + subject;
  else field.innerText = "Without subject";
  message.appendChild(field);
  field = document.createElement("p");
  if (description) field.innerText = "Description: " + description;
  else field.innerText = "Without description";
  message.appendChild(field);
  let button = document.createElement("input");
  button.type = "button";
  button.value = "Ok";
  button.addEventListener("click", function() {
    wrapper.remove();
  });
  message.appendChild(button);
  body.appendChild(fragment);
}

sendLetter.addEventListener("click", function(event) {
  event.preventDefault();
  showAlert(subject.value, description.value);
});

vPhone.addEventListener("click", function(event) {
  if (event.target.tagName == "IMG") {
    let vCanvas = document.createElement("canvas");
    let img = vPhone.querySelector("img");
    vCanvas.width = img.width;
    vCanvas.height = img.height;
    vCanvas.getContext("2d").drawImage(img, 0, 0, img.width, img.height);
    let pixelData = vCanvas
      .getContext("2d")
      .getImageData(event.offsetX, event.offsetY, 1, 1).data;
    if (pixelData[3] == 0) return;
    vPhone.querySelector("img.off-phone").classList.remove("off-phone");
    event.target.classList.add("off-phone");
  }
});

hPhone.addEventListener("click", function(event) {
  if (event.target.tagName == "IMG") {
    let hCanvas = document.createElement("canvas");
    img = hPhone.querySelector("img");
    hCanvas.width = img.width;
    hCanvas.height = img.height;
    hCanvas.getContext("2d").drawImage(img, 0, 0, img.width, img.height);
    let pixelData = hCanvas
      .getContext("2d")
      .getImageData(event.offsetX, event.offsetY, 1, 1).data;
    if (pixelData[3] == 0) return;
    hPhone.querySelector("img.off-phone").classList.remove("off-phone");
    event.target.classList.add("off-phone");
  }
});

const sliderVars = {
  inAnimation : false
}

const changeSlide = function() {
  let needElem = carusel.querySelector(".off-elem");
  if (needElem == slide1) {
    slide1.classList.remove("off-elem");
    slide2.classList.add("off-elem");
  } else {
    slide2.classList.remove("off-elem");
    slide1.classList.add("off-elem");
  }
};

function animateCaruselLeft(event) {
  if(sliderVars.inAnimation)
    return;
  sliderVars.inAnimation = true;
  carusel.classList.add("left-animation");
}

function animateCaruselRight(event) {
  if(sliderVars.inAnimation)
    return;
  sliderVars.inAnimation = true;
  carusel.classList.add("right-animation");
  changeSlide();
}

function endAnimation(event) {
  if (carusel.classList.contains("left-animation")) changeSlide();
  carusel.classList.remove("left-animation");
  carusel.classList.remove("right-animation");
  sliderVars.inAnimation = false;
}

arrowRight.addEventListener("click", animateCaruselRight);
arrowLeft.addEventListener("click", animateCaruselLeft);
carusel.addEventListener("animationend", endAnimation);
