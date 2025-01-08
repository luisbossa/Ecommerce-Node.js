const searchMessage = document.querySelector("#empty-div"); // Selecciona correctamente por id
const clearSearchInputs = document.querySelectorAll(".input");

// Función para manejar el evento 'keyup'
document.addEventListener("keyup", (e) => {
  // Verifica si el evento corresponde a los campos de búsqueda
  if (e.target.matches("#input, #res-input, #input_aside")) {
    // Limpia el valor del campo si la tecla presionada es 'Escape'
    if (e.key === "Escape") e.target.value = "";

    let foundMatch = false;
    const searchValue = e.target.value.toLowerCase(); // Convierte una vez el valor de búsqueda

    // Recorre todos los productos y los muestra/oculta según la búsqueda
    document.querySelectorAll(".product").forEach((product) => {
      const productText = product.textContent.toLowerCase(); // Convierte una vez el contenido del producto
      if (productText.includes(searchValue)) {
        product.classList.remove("disabled");
        foundMatch = true;
      } else {
        product.classList.add("disabled");
      }
    });

    // Muestra el mensaje si no se encuentra ningún producto
    if (foundMatch) {
      searchMessage.classList.add("disabled");
    } else {
      searchMessage.classList.remove("disabled");
    }
  }
});

// Función para limpiar los campos de búsqueda
function clear() {
  clearSearchInputs.forEach((input) => {
    input.value = "";
  });
  // También ocultar el mensaje de búsqueda cuando se limpia
  searchMessage.classList.add("disabled");
}
