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
  const modalOverlay = document.querySelector(".modal-overlay");
  const modalContent = modalOverlay.querySelector(".modal-content");

  modalOverlay.classList.add("open");
  modalContent.classList.add("open");
  document.body.style.overflow = "hidden";

  modalContent.innerHTML = `
  <div class="close-wrapper">
    <div class="h2-div">
      <h2 class="product-title2">${product.name}</h2>
    </div>
    <span id="close-modal" class="close-modal"><i class="fas fa-times"></i></span>
  </div>
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
    <h2 class="product-title">${product.name}</h2>

  <div class="go-back-div" id="go-back-div">
    <button class="btn back-arrow-modal" id="back-arrow-modal"><i class="ri-arrow-left-wide-line"></i>Atras</button>
      <div class="product-rating">
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star-half-alt"></i>
          <span>${product.rate}</span>
      </div>
  </div>

  <div class="product-price">
      <p class="new-price">Precio: <span>₡ ${product.price}</span></p>
  </div>
  <div class="product-detail">
      <h3 class="detail">Detalle</h3>
      <p>${product.description}</p>
      <ul class="hide-detail">
          <li>Color: <span>${product.color}</span></li>
          <li>Disponibilidad: <span>En stock</span></li>
          <li>Categoría: <span>${product.category.name}</span></li>
          <li>Zona de envío: <span>${product.country}</span></li>
          <li>Gasto de envío: <span>Gratis</span></li>
      </ul>
  </div>

  <div class="purchase-info">
      <button type="button" class="btn btn-cart-add" id="${product.id}">
          Agregar <i class="fas fa-shopping-cart"></i>
      </button>
        <a href="./cart.html" type="button" class="atn a-cart-buy">
         Comprar
       </a>
  </div>
</div>
  `;

  const closeButton = modalOverlay.querySelector("#close-modal");
  closeButton.addEventListener("click", () => {
    modalOverlay.classList.remove("open");
    modalContent.classList.remove("open");
    document.body.style.overflow = "auto";
  });

  const backModal = modalOverlay.querySelector("#back-arrow-modal");
  backModal.addEventListener("click", () => {
    modalOverlay.classList.remove("open");
    modalContent.classList.remove("open");
    document.body.style.overflow = "auto";
  });

  modalOverlay.addEventListener("click", (e) => {
    if (e.target == modalOverlay) {
      modalOverlay.classList.remove("open");
      modalContent.classList.remove("open");
      document.body.style.overflow = "auto";
    }
  });

  imgSlider();
  clickAddBtn();
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

function addCart(e) {
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

  const idBtn = e.currentTarget.id;
  const productAdd = products.find((product) => product.id == idBtn);
  e.preventDefault();

  if (productsCart.some((product) => product.id == idBtn)) {
    const index = productsCart.findIndex((product) => product.id == idBtn);
    productsCart[index].amount++;
  } else {
    productAdd.amount = 1;
    productsCart.push(productAdd);
  }
  updateNumber();

  localStorage.setItem("products-in-cart", JSON.stringify(productsCart));
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
