const principalTitle = document.getElementById("main-title");
const btnCategory = document.querySelectorAll(".btn-category");

btnCategory.forEach((boton) => {
  boton.addEventListener("click", (e) => {
    searchMessage.classList.add("disabled");

    btnCategory.forEach((button) => button.classList.remove("active"));
    e.currentTarget.classList.add("active");

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

function showMenu() {
  const showMenu = document.getElementById("open-menu");
  const showCart = document.getElementById("res-cart");
  const showArrow = document.getElementById("go-back");
  const showSearch = document.getElementById("res_search");

  if (currentPage.includes("index.php") || currentPage.includes("/")) {
    showMenu.classList.add("visible");
    showCart.classList.add("visible");
    showArrow.classList.add("visible");
    showSearch.classList.add("visible");
  }
}

window.onload = showMenu;

/*----------------- RESPONSIVE NAVBAR TOGGLE ----------------*/

const openMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId);
  const nav = document.getElementById(navId);
  const menuItems = nav.querySelectorAll("li");

  toggle.addEventListener("click", () => {
    nav.classList.toggle("show-menu");
    toggle.classList.toggle("show-icon");
  });

  menuItems.forEach((item) => {
    item.addEventListener("click", () => {
      nav.classList.remove("show-menu");
      toggle.classList.remove("show-icon");
    });
  });
};

openMenu("open-menu", "menu-mobile");

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

