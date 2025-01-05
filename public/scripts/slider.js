function slideImage() {
  // Verifica si el contenedor y la primera imagen existen
  const showcase = document.querySelector(".img-showcase");
  if (showcase) {
    const firstImage = showcase.querySelector("img:first-child");

    // Verifica si la primera imagen existe antes de intentar acceder a su propiedad clientWidth
    if (firstImage) {
      const displayWidth = firstImage.clientWidth;

      showcase.style.transform = `translateX(${
        -(imgId - 1) * displayWidth
      }px)`;
    } else {
      console.warn("No se pudo encontrar la primera imagen en .img-showcase.");
    }
  } else {
    console.warn(".img-showcase no se encontró en el DOM.");
  }
}
