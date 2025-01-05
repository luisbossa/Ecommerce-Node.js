let products = [],
  companyName = "BStudio";

fetch("/scripts/allProducts.json")
  .then((response) => response.json())
  .then((data) => {
    products = data;
    loadProducts(products);
  });

const productContainer = document.getElementById("productContainer");
let btnAdd = document.querySelectorAll(".btn-cart-add");
const numbers = document.querySelectorAll("#number, #number2");
const textFooter = document.querySelector(".text-footer");

/*----------------- FOOTER COMPANY NAME ----------------*/

textFooter.textContent = "© " + companyName;

/*------------ PRODUCTS GRID ---------------*/

function loadProducts(products) {
  productContainer.innerHTML = "";

  products.forEach((product) => {
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
          <div class="contenedor-img">
          <i class="fas fa-expand btn-expand"></i>
          <img class="producto-imagen" src="${product.image}" alt="${product.name}">
          </div>
          <div class="producto-detalles">
              <h3 class="producto-titulo">${product.name}</h3>
              <p class="producto-precio">₡ ${product.price}</p>
          </div>
          `;
    productContainer.append(div);

    div.addEventListener("click", () => {
      openModal(product);
    });
  });
}

/*---------------- MODAL POP UP ----------------*/

function openModal(product) {
  // Usamos SweetAlert2 para mostrar el modal
  Swal.fire({
    title: product.name,
    html: `
      <div class="product-imgs">
        <div class="img-display">
          <div class="img-showcase">
            <img class="img-pop-up" src="${product.image}" alt="${product.name}">
            <img class="img-pop-up" src="${product.image2}" alt="${product.name}">
            <img class="img-pop-up" src="${product.image3}" alt="${product.name}">
            <img class="img-pop-up" src="${product.image4}" alt="${product.name}">
          </div>
        </div>
        <div class="img-select">
          <div class="img-item">
              <a href="#" data-id="1">
                  <img class="img-pop-up" src="${product.image}" alt="${product.name}">
              </a>
          </div>
          <div class="img-item">
              <a href="#" data-id="2">
                  <img class="img-pop-up" src="${product.image2}" alt="${product.name}">
              </a>
          </div>
          <div class="img-item">
              <a href="#" data-id="3">
                  <img class="img-pop-up" src="${product.image3}" alt="${product.name}">
              </a>
          </div>
          <div class="img-item">
              <a href="#" data-id="4">
                  <img class="img-pop-up" src="${product.image4}" alt="${product.name}">
              </a>
          </div>
        </div>
      </div>

      <div class="product-content">
        <div class="product-div">
          <div class="product-rating">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star-half-alt"></i>
            <span>${product.rate}</span>
          </div>
          <div class="product-price">
            <p class="new-price">Precio: <span>₡ ${product.price}</span></p>
          </div>
        </div>
        <div class="product-detail">
          <h3 class="detail">Detalle</h3>
          <p>${product.description}</p>
          <ul>
            <li>Color: <span>${product.color}</span></li>
            <li>Disponibilidad: <span>En stock</span></li>
            <li>Categoría: <span>${product.category.name}</span></li>
            <li>Zona de envío: <span>${product.country}</span></li>
            <li>Gasto de envío: <span>Gratis</span></li>
          </ul>
        </div>
      </div>
    `,
    showCloseButton: true,
    showCancelButton: true,
    cancelButtonText: 'Comprar <i class="ri-wallet-fill"></i>',
    confirmButtonText: 'Agregar <i class="fas fa-shopping-cart"></i>',
    willOpen: () => {
      document.body.classList.add("swal2-shown");
      document.documentElement.classList.add("swal2-shown");
    },
    willClose: () => {
      document.body.classList.remove("swal2-shown");
      document.documentElement.classList.remove("swal2-shown");
    },
    focusConfirm: false,
    preConfirm: () => {
      addCart(product);
      return false; // Esto evita que se cierre el modal automáticamente
    },
  }).then((result) => {
    // Si el usuario hace clic en "Comprar ahora", redirige al carrito
    if (result.isDismissed && result.dismiss === Swal.DismissReason.cancel) {
      window.location.href = "/cart"; // Redirige al carrito
    }
  });

  imgSlider(); // Funcionalidad de la galería de imágenes
  clickAddBtn(); // Funcionalidad para agregar productos al carrito (si corresponde)
  setupCartButton(); // Funcionalidad para configurar el botón del carrito
}

/*-------------------- ADD TO CART --------------------*/

// Cambié la función para aceptar directamente un `product` en vez de un evento
function addCart(product) {
  Toastify({
    text: "Producto agregado",
    duration: 2000,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
      display: "flex",
      alignItems: "center",
      gap: "3px",
      background: "linear-gradient(to left, #2c3e50, #3498db)",
      borderRadius: "1.5rem",
      textTransform: "uppercase",
      fontSize: "0.7rem",
      padding: "0.7rem",
    },
    offset: {
      x: "50px",
      y: "30px",
    },
    onClick: function () {},
  }).showToast();

  // Ahora ya no necesitamos el `preventDefault()`, porque no estamos trabajando con un evento
  if (productsCart.some((p) => p.id === product.id)) {
    const index = productsCart.findIndex((p) => p.id === product.id);
    productsCart[index].amount++;
  } else {
    product.amount = 1;
    productsCart.push(product);
  }
  updateNumber();
  localStorage.setItem("products-in-cart", JSON.stringify(productsCart));
}

/*-------------------- ADD TO CART --------------------*/

let productsCart;
let productsCartLS = localStorage.getItem("products-in-cart");

if (productsCartLS) {
  productsCart = JSON.parse(productsCartLS);
  updateNumber();
} else {
  productsCart = [];
}

function clickAddBtn() {
  btnAdd = document.querySelectorAll(".btn-cart-add");

  btnAdd.forEach((button) => {
    button.addEventListener("click", addCart);
  });
}

/*----------------- CART COUNT NUMBER -----------------*/

function updateNumber() {
  let newNumber = productsCart.reduce(
    (acc, product) => acc + product.amount,
    0
  );
  numbers.forEach((element) => {
    element.innerText = newNumber;
  });
}

/*----------------- GO TO THE TOP BTN -----------------*/

const goTopBtn = document.querySelector(".go-top-btn");

window.addEventListener("scroll", checkScroll);

function checkScroll() {
  if (window.scrollY > 4000) {
    goTopBtn.classList.add("show");
  } else {
    goTopBtn.classList.remove("show");
  }
}

goTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

/*----------------- GO TO CART.EJS -----------------*/

const cartButtons = document.querySelectorAll("#cartBtn");

cartButtons.forEach((button) => {
  button.addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = "/cart";
  });
});

function setupCartButton() {
  const cartButton = document.getElementById("cartBtn2");

  if (cartButton) {
    cartButton.addEventListener("click", function (event) {
      event.preventDefault();
      window.location.href = "/cart";
    });
  }
}
