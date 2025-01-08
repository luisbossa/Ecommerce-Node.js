const principalTitle = document.getElementById("main-title");
const btnCategory = document.querySelectorAll(".btn-category");

btnCategory.forEach((boton) => {
  boton.addEventListener("click", (e) => {
    if (searchMessage) {
      searchMessage.classList.add("disabled");
    }

    btnCategory.forEach((button) => {
      button.classList.remove("active");

      const img = button.querySelector("img");
      if (img) {
        img.src = "/images/arrow-icon.png"; // Imagen predeterminada
      }
    });

    e.currentTarget.classList.add("active");

    const activeImg = e.currentTarget.querySelector("img");
    if (activeImg) {
      activeImg.src = "/images/arrow-iconb.png"; // Imagen cuando está activo
    }

    if (e.currentTarget.id != "all") {
      const productsCategory = products.find(
        (product) => product.category.id === e.currentTarget.id
      );
      clear();
      principalTitle.innerText = productsCategory.category.name;

      const productsBtn = products.filter(
        (product) => product.category.id === e.currentTarget.id
      );
      loadProducts(productsBtn);
    } else {
      principalTitle.innerText = "Productos varios";
      loadProducts(products);
    }
  });
});

/*----------- SHOW / HIDE NAVBAR ICONS -------------*/

const currentPage = window.location.href;

function showMenuIcons() {
  const showMenu = document.getElementById("header-btn-group");
  const showCart = document.querySelector(".res-cart");
  const showSearch = document.getElementById("res_search");

  if (currentPage.includes("index.ejs") || currentPage.includes("/")) {
    showMenu.classList.add("visible");
    showCart.classList.add("visible");
    showSearch.classList.add("visible");
  }
}

window.onload = showMenuIcons;

/* navbar toggle */

const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const menuToggleBtn = document.querySelector("[data-menu-toggle-btn]");

menuToggleBtn.addEventListener("click", function () {
  navbar.classList.toggle("active");
  this.classList.toggle("active");
});

for (let i = 0; i < navbarLinks.length; i++) {
  navbarLinks[i].addEventListener("click", function () {
    navbar.classList.toggle("active");
    menuToggleBtn.classList.toggle("active");
  });
}

/*----------------- RESPONSIVE SEARCH BAR SLIDER ----------------*/

const searchBtn = document.querySelector(".res_search");
const searchInput = document.querySelector(".res-search-box input");

searchBtn.addEventListener("click", function () {
  searchInput.classList.toggle("slide");
  searchInput.focus();
});

searchInput.addEventListener("focus", function () {
  if (searchInput.classList.contains("slide")) {
    searchInput.classList.add("slide");
  }
});
