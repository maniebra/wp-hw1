import bind from "./utils/binder.mjs";
import evaluateFormulas from "./utils/formulator.mjs";

let binding = bind();

binding.submitItem.addEventListener("click", () => {
  alert("clicked");
});

binding.changeImage.addEventListener("click", () => {
  binding.imagePicker.click();
});

binding.resetForm.addEventListener("click", () => {
  document.querySelectorAll("input").forEach((input) => {
    input.value = "";
  });
  document.querySelectorAll("textarea").forEach((textarea) => {
    textarea.value = "";
  });
  document.querySelector(".detail-form .image").style.backgroundImage = "";
  document.querySelector("#calculations").innerHTML = "";
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

document.addEventListener("change", (event) => {
  if (event.target.matches("input")) {
    const calculationsContainer = document.querySelector("#calculations");
    if (!calculationsContainer) return;

    calculationsContainer.innerHTML = "";

    document.querySelectorAll("formula").forEach((formulaElement) => {
      const result = evaluateFormulas(formulaElement, binding);
      if (result !== undefined && result !== null) {
        const row = document.createElement("tr");

        const labelCell = document.createElement("td");
        labelCell.textContent = formulaElement.dataset.label;

        const resultCell = document.createElement("td");
        resultCell.textContent = Math.round(result * 1000) / 1000;
        resultCell.style.direction = "ltr";

        row.appendChild(labelCell);
        row.appendChild(resultCell);

        calculationsContainer.appendChild(row);
      }
    });
  }
});
