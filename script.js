function setNavbarActive(event) {
  location.href = event.target.querySelector("a").href;
  showAside();
}
document.querySelector("#navbar").addEventListener("click", setNavbarActive);
document
  .querySelector("#asideNavbar")
  .addEventListener("click", setNavbarActive);

function setMenuActive(index) {
  let menu = navbar.querySelectorAll("span");
  menu.forEach(elem => elem.classList.remove("active"));
  menu[index].classList.add("active");

  menu = asideNavbar.querySelectorAll("span");
  menu.forEach(elem => elem.classList.remove("active"));
  menu[index].classList.add("active");
}

window.addEventListener("scroll", function(event) {
  let links = Array.prototype.slice.call(
    document.querySelectorAll("main>a[name]")
  );
  var body = document.body,
    html = document.documentElement;
  var height = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  );
  if (window.pageYOffset + this.innerHeight == height) {
    setMenuActive(links.length - 1);
    return;
  }

  for (let index = 0; index < links.length; index++) {
    let prevEl = links[index];
    let elem = links[index + 1];
    if (
      window.scrollY >= getTop(prevEl) - (getTop(elem) - getTop(prevEl)) / 5 &&
      window.scrollY <= (getTop(elem) - getTop(prevEl)) / 5 + getTop(prevEl)
    ) {
      setMenuActive(index);
      return;
    }
  }
});

function getTop(elem) {
  if (!elem) return window.pageYOffset + window.innerHeight;
  var box = elem.getBoundingClientRect();
  var body = document.body;
  var docEl = document.documentElement;
  var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  var clientTop = docEl.clientTop || body.clientTop || 0;
  var top = box.top + scrollTop - clientTop;
  return top;
}

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

    let cnt = 0;

    portfolioImages.querySelectorAll(".portfolio-image").forEach(e => {
      if (getComputedStyle(e, null).display != "none") cnt++;
    });

    document.querySelectorAll("#portfolio-buttons>div").forEach(elem => {
      if (button != elem && !flag) {
        counter++;
      } else {
        flag = true;
      }
      elem.classList.remove("active");
    });
    button.classList.add("active");
    portfolioImages.querySelectorAll(".portfolio-image").forEach(elem => {
      if (counter > -1) {
        elem.remove();
        portfolioImages.appendChild(elem);
        counter--;
      }
    });
  });

portfolioImages.addEventListener("click", function(event) {
  portfolioImages
    .querySelectorAll(".portfolio-image")
    .forEach(elem => elem.classList.remove("bordered"));
  let elem = event.target;
  if (elem.tagName == "IMG") elem = elem.parentElement;
  elem.classList.add("bordered");
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
  else field.innerText = "No subject";
  message.appendChild(field);
  field = document.createElement("p");
  if (description) field.innerText = "Description: " + description;
  else field.innerText = "No description";
  message.appendChild(field);
  let button = document.createElement("input");
  button.type = "button";
  button.value = "Ok";
  button.addEventListener("click", function() {
    wrapper.remove();
    document.querySelector(".feedback").reset();
  });
  message.appendChild(button);
  body.appendChild(fragment);
}

sendLetter.addEventListener("click", function(event) {
  if (document.querySelector(".feedback").reportValidity()) {
    event.preventDefault();
    showAlert(subject.value, description.value);
  }
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
  inAnimation: false
};

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
  if (sliderVars.inAnimation) return;
  sliderVars.inAnimation = true;
  carusel.classList.add("left-animation");
}

function animateCaruselRight(event) {
  if (sliderVars.inAnimation) return;
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

burgerIcon.addEventListener("click", showAside);
asideBurgerIcon.addEventListener("click", showAside);

function showAside() {
  if (aside.classList.contains("active")) aside.classList.remove("active");
  else {
    aside.classList.add("active");
  }
}

closeAside.addEventListener("click", showAside);
