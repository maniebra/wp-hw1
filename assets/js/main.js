import bind from "./utils/binder.mjs";
import evaluateFormulas from "./utils/formulator.mjs";

let binding = bind();

binding.submitItem.addEventListener("click", () => {
  alert("clicked");
});

binding.changeImage.addEventListener("click", () => {
  binding.imagePicker.click();
});

binding.imagePicker.addEventListener("click", () => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const imageElement = document.querySelector(".detail-form .image");
      imageElement.style.backgroundImage = `linear-gradient(
              to bottom,
              rgba(0, 0, 0, 0),
              rgba(0, 0, 0, 0.9) 86%
          ), url(${e.target.result})`;
    };
    reader.readAsDataURL(file);
  }
});

document.querySelectorAll("input[id]").forEach((input) => {
  const formulaElement = document
    .querySelectorAll("formula")
    .forEach((formulaElement) => {
      input.addEventListener("change", () => {
        binding.calculations.innerHTML = "";
        const result = evaluateFormulas(formulaElement, binding);
        if (result) {
          const resultElement = document.createElement("div");
          resultElement.textContent = `${formulaElement.dataset.label} : ${result}`;
          binding.calculations.appendChild(resultElement);
        }
      });
    });
});
