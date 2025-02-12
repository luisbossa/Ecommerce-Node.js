let products = [];

fetch("/scripts/allProducts.json")
  .then((response) => response.json())
  .then((data) => {
    products = data;
    loadProducts(products);
  });

const productContainer = document.getElementById("productContainer");
let btnAdd = document.querySelectorAll(".btn-cart-add");
const numbers = document.querySelectorAll("#number, #number2");

/*------------ PRODUCTS GRID ---------------*/

function loadProducts(products) {
  productContainer.innerHTML = "";

  products.forEach((product) => {
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
          <div class="contenedor-img">
          <i class="fas fa-expand btn-expand"></i>
          
          <picture>
            <source srcset="${product.image}" type="image/webp">
            <img class="producto-imagen" 
                src="${product.image}" 
                alt="${product.name}" 
                width="387" 
                height="490">
          </picture>

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

function imgSlider() {
  const imgs = document.querySelectorAll(".img-select a");
  const imgBtns = [...imgs];
  let imgId = 1;

  imgBtns.forEach((imgItem) => {
    imgItem.addEventListener("click", (event) => {
      event.preventDefault();
      imgId = imgItem.dataset.id;
      slideImage();
    });
  });

  function slideImage() {
    // Verificar si el .img-showcase existe
    const showcase = document.querySelector(".img-showcase");
    if (!showcase) return;

    const firstImg = showcase.querySelector("img:first-child");
    if (!firstImg) return;

    const displayWidth = firstImg.clientWidth;

    // Mover las imágenes según el id seleccionado
    showcase.style.transform = `translateX(${-(imgId - 1) * displayWidth}px)`;
  }

  // Asegurarse de que el slider se ajuste al cambiar el tamaño de la ventana
  window.addEventListener("resize", slideImage);
}

function openModal(product) {
  Swal.fire({
    title: product.name,
    html: `
      <div class="product-imgs">
        <div class="img-display">
            <div class="img-showcase">
                <img loading="lazy" class="img-pop-up" src="${product.image}" alt="${product.name}" width="387" height="490">
                <img loading="lazy" class="img-pop-up" src="${product.image2}" alt="${product.name}" width="387" height="490">
                <img loading="lazy" class="img-pop-up" src="${product.image3}" alt="${product.name}" width="387" height="490">
                <img loading="lazy" class="img-pop-up" src="${product.image4}" alt="${product.name}" width="387" height="490">
            </div>
        </div>
        <div class="img-select">
            <div class="img-item">
                <a href="#" data-id="1">
                    <img loading="lazy" class="img-pop-up" src="${product.image}" alt="${product.name}" width="387" height="490">
                </a>
            </div>
            <div class="img-item">
                <a href="#" data-id="2">
                    <img loading="lazy" class="img-pop-up" src="${product.image2}" alt="${product.name}" width="387" height="490">
                </a>
            </div>
            <div class="img-item">
                <a href="#" data-id="3">
                    <img loading="lazy" class="img-pop-up" src="${product.image3}" alt="${product.name}" width="387" height="490">
                </a>
            </div>
            <div class="img-item">
                <a href="#" data-id="4">
                    <img loading="lazy" class="img-pop-up" src="${product.image4}" alt="${product.name}" width="387" height="490">
                </a>
            </div>
        </div>
    </div>

    <div class="product-content">
        <div class="product-div">
            <div class="product-rating">
                <img loading="lazy" class="star-pop-up" src="/images/star.png" width="24" height="24">
                <img loading="lazy" class="star-pop-up" src="/images/star.png" width="24" height="24">
                <img loading="lazy" class="star-pop-up" src="/images/star.png" width="24" height="24">
                <img loading="lazy" class="star-pop-up" src="/images/star.png" width="24" height="24">
                <img loading="lazy" class="halfstar-pop-up" src="/images/halfstar.png" width="24" height="24">
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
    cancelButtonText: 'Carrito <i class="fas fa-shopping-cart"></i>',
    confirmButtonText: 'Comprar <i class="ri-wallet-fill"></i>',
    customClass: {
      confirmButton: "custom-confirm",
      cancelButton: "custom-cancel",
    },
    willOpen: () => {
      document.body.classList.add("modal-open");
    },
    didOpen: () => {
      imgSlider();
    },
    willClose: () => {
      document.body.classList.remove("modal-open");
    },
    scrollbarPadding: false,
    focusConfirm: false,
    preConfirm: () => {
      addCart(product);
      return false; // Evita que se cierre el modal automáticamente
    },
  }).then((result) => {
    if (result.isDismissed && result.dismiss === Swal.DismissReason.cancel) {
      window.location.href = "/cart";
    }
  });
  clickAddBtn();
}

/*-------------------- ADD TO CART --------------------*/

// Cambié la función para aceptar directamente un `product` en vez de un evento
function addCart(product) {
  Toastify({
    text: "Producto agregado",
    duration: 2000,
    gravity: "top",
    position: "center",
    stopOnFocus: true,
    style: {
      display: "flex",
      alignItems: "center",
      gap: "3px",
      boxShadow: "inset 0px 0px 0px 1px rgba(0, 0, 0, 0.35), inset 0px 2px 1px 0px rgba(255, 255, 255, 0.35)",
      backgroundImage: "url('/images/bg02.webp')",
      backgroundSize: "cover", // Esto asegura que la imagen cubra toda el área del Toast
      backgroundPosition: "center", // Esto asegura que la imagen esté centrada
      background: "linear-gradient(to left, #2c3e50, #3498db)",
      borderRadius: "1.5rem",
      textTransform: "uppercase",
      fontSize: "0.7rem",
      padding: "0.7rem",
    },
    offset: {
      x: "0",
      y: "20px",
    },
    onClick: function () {
      // Acción al hacer clic, si es necesario
    },
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

// service-worker.js
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("my-cache").then((cache) => {
      return cache.addAll([
        "https://cdn.jsdelivr.net/npm/sweetalert2@11",
        // otros archivos estáticos...
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
