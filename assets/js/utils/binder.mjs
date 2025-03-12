export default function bind() {
  var binding = {};
  document.querySelectorAll("[id]").forEach((element) => {
    var id = element.id;
    if (!id) return;

    id = id.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
    if (binding[id]) {
      console.warn(`Duplicate ID found: ${id}. Overwriting previous binding.`);
    }

    binding[id] = element;
  });

  return binding;
}
