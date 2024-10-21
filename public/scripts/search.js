const searchMessage = document.querySelector(".empty-comment");
const clearSearchInputs = document.querySelectorAll(".input");

document.addEventListener("keyup", (e) => {
  if (e.target.matches("#input, #res-input, #input_aside")) {
    if (e.key == "Escape") e.target.value = "";

    let foundMatch = false;

    document.querySelectorAll(".product").forEach((product) => {
      if (
        product.textContent
          .toLocaleLowerCase()
          .includes(e.target.value.toLocaleLowerCase())
      ) {
        product.classList.remove("disabled");
        foundMatch = true;
      } else {
        product.classList.add("disabled");
      }
    });

    if (!foundMatch) {
      searchMessage.classList.remove("disabled");
    } else {
      searchMessage.classList.add("disabled");
    }
  }
});

function clear() {
  clearSearchInputs.forEach((input) => {
    input.value = "";
  });
}
