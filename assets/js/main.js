import bind from "./utils/binder.mjs";

let binder = bind();

binder.submitInvoice.addEventListener("click", () => {
  alert("clicked");
});
