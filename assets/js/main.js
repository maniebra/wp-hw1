import bind from "./utils/binder.mjs";
import evaluateFormulas from "./utils/formulator.mjs";

function resetForm() {
  document.querySelectorAll("input").forEach((input) => {
    input.value = "";
  });
  document.querySelectorAll("textarea").forEach((textarea) => {
    textarea.value = "";
  });
  document.querySelector(".detail-form .image").style.backgroundImage = "";
  document.querySelector("#calculations").innerHTML = "";
}

window.addEventListener("load", resetForm);

let binding = bind();

binding.submitItem.addEventListener("click", () => {
  alert("کالای شما ثبت شد!");
});

binding.changeImage.addEventListener("click", () => {
  binding.imagePicker.click();
});

binding.resetForm.addEventListener("click", resetForm);

binding.imagePicker.addEventListener("click", (event) => {
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

function updateCalculationsTable() {
  try {
    // If an element inside the #calculations table is currently focused (i.e. being edited),
    // then skip updating the table.
    if (document.activeElement && document.activeElement.closest("#calculations")) {
      return;
    }
    
    // Refresh the binding.
    binding = bind();
    const calculationsContainer = document.querySelector("#calculations");
    if (!calculationsContainer) return;
    
    // Clear out current table rows.
    calculationsContainer.innerHTML = "";
    
    // For each <formula> element, create a row in the table.
    document.querySelectorAll("formula").forEach((formulaElement) => {
      let result;
      try {
        result = evaluateFormulas(formulaElement, binding);
      } catch (e) {
        console.error("Error evaluating formula for", formulaElement, e);
        result = null;
      }
      
      const row = document.createElement("tr");
      
      // Column 1: Label from the data-label attribute.
      const labelCell = document.createElement("td");
      labelCell.textContent = formulaElement.getAttribute("data-label") || "";
      row.appendChild(labelCell);
      
      // Column 2: Computed Result.
      const resultCell = document.createElement("td");
      resultCell.textContent =
        result !== null && result !== undefined ? Math.round(result * 1000) / 1000 : "Error";
      resultCell.style.direction = "ltr";
      row.appendChild(resultCell);
      
      // Column 3: Editable Evaluator.
      const evaluatorCell = document.createElement("td");
      evaluatorCell.contentEditable = true;
      evaluatorCell.textContent = formulaElement.getAttribute("evaluator");
      evaluatorCell.style.border = "1px solid #ccc";
      evaluatorCell.style.padding = "5px";
      evaluatorCell.style.minWidth = "100px";
      
      // When editing finishes, update the formula's evaluator attribute and recalc.
      evaluatorCell.addEventListener("blur", () => {
        try {
          formulaElement.setAttribute("evaluator", evaluatorCell.textContent);
          const updatedResult = evaluateFormulas(formulaElement, binding);
          resultCell.textContent =
            updatedResult !== null && updatedResult !== undefined
              ? Math.round(updatedResult * 1000) / 1000
              : "Error";
        } catch (error) {
          console.error("Error updating evaluator:", error);
          resultCell.textContent = "Error";
        }
      });
      
      row.appendChild(evaluatorCell);
      calculationsContainer.appendChild(row);
    });
  } catch (error) {
    console.error("Error in updateCalculationsTable:", error);
  }
}

// Update the table only when binding inputs change.
Object.values(binding).forEach((el) => {
  if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
    el.addEventListener("input", updateCalculationsTable);
  }
});

// Populate the table on page load.
window.addEventListener("load", updateCalculationsTable);
