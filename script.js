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
