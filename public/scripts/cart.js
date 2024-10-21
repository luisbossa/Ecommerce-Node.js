let companyName = "BCompany";

let productsCart = localStorage.getItem("products-in-cart");
productsCart = JSON.parse(productsCart);

const containerCartEmpty = document.querySelector(".empty-comment");
const containerCartProducts = document.getElementById("cart-products");
const containerCartActions = document.getElementById("cart-actions");
const containerCartBought = document.getElementById("bought-cart");
let btnDelete = document.querySelectorAll(".cart-product-delete");
const btnEmpty = document.getElementById("btn-cart-empty");
const btnBuy = document.getElementById("btn-cart-buy");
const textFooter = document.querySelector(".text-footer");

/*----------------- FOOTER COMPANY NAME ----------------*/

textFooter.textContent = "© " + companyName;

/*------------ LOAD PRODUCTS CART ---------------*/

function loadProductsCart() {
  if (productsCart && productsCart.length > 0) {
    containerCartEmpty.classList.add("disabled");
    containerCartProducts.classList.remove("disabled");
    containerCartActions.classList.remove("disabled");
    containerCartBought.classList.add("disabled");

    containerCartProducts.innerHTML = "";

    productsCart.forEach((product) => {
      const div = document.createElement("div");
      div.classList.add("cart-product");
      div.innerHTML = `
         <img class="cart-product-img" src="${product.image}" alt="${
        product.name
      }">
      
    <div class="cart-content-div">
        <div class="cart-product-title">
          <h3 class="cart-title">${product.name}</h3>
        </div>

      <div class="cart-div">
        <div class="cart-product-qty">
          <small>Cantidad</small>
          <p>${product.amount}</p>
        </div>

        <div class="cart-product-price">
          <small>Precio</small>
          <p>₡ ${product.price}</p>
        </div>

        <div class="cart-product-subtotal">
          <small class="cart-sub">Subtotal</small>
          <p>₡ ${(product.price * product.amount).toFixed(3)}</p>
        </div>
      </div>
    </div>

      <button class="cart-product-delete" id="${
        product.id
      }"><i class="ri-close-circle-fill"></i></button>
            `;

      containerCartProducts.append(div);
    });

    updateBtnDelete();
    updateTotal();
  } else {
    containerCartEmpty.classList.remove("disabled");
    containerCartProducts.classList.add("disabled");
    containerCartActions.classList.add("disabled");
    containerCartBought.classList.add("disabled");
  }
}

loadProductsCart();

function updateBtnDelete() {
  btnDelete = document.querySelectorAll(".cart-product-delete");

  btnDelete.forEach((button) => {
    button.addEventListener("click", deleteCart);
  });
}

function deleteCart(e) {
  const idBtn = e.currentTarget.id;
  const index = productsCart.findIndex((product) => product.id == idBtn);

  if (index !== -1) {
    const cartProduct = e.currentTarget.closest(".cart-product");
    cartProduct.classList.add("hide");

    setTimeout(() => {
      productsCart.splice(index, 1);
      loadProductsCart();

      localStorage.setItem("products-in-cart", JSON.stringify(productsCart));

      cartProduct.remove();
    }, 300);
  }
}

btnEmpty.addEventListener("click", emptyCart);

function emptyCart() {
  Swal.fire({
    title: "¿Estás seguro?",
    icon: "question",
    html: `Se van a borrar ${productsCart.reduce(
      (acc, product) => acc + product.amount,
      0
    )} productos.`,
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonText: "Sí",
    cancelButtonColor: "#3b3e56",
    cancelButtonText: "No",
    confirmButtonColor: "#c0392b",
  }).then((result) => {
    if (result.isConfirmed) {
      productsCart.length = 0;
      localStorage.setItem("products-in-cart", JSON.stringify(productsCart));
      loadProductsCart();
    }
  });
}

function updateTotal() {
  const totalCal = productsCart.reduce(
    (acc, product) => acc + product.price * product.amount,
    0
  );
  total.innerText = `₡ ${totalCal.toFixed(3)}`;
}

btnBuy.addEventListener("click", buyCart);

function buyCart() {
  productsCart.length = 0;
  localStorage.setItem("products-in-cart", JSON.stringify(productsCart));

  containerCartEmpty.classList.add("disabled");
  containerCartProducts.classList.add("disabled");
  containerCartActions.classList.add("disabled");
  containerCartBought.classList.remove("disabled");
}
