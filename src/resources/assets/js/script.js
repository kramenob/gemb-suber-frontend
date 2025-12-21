document.addEventListener("DOMContentLoaded", () => {
  const dropdownItems = document.querySelectorAll(".lower__header__dropdown-item");

  dropdownItems.forEach(item => {
    const arrow = item.querySelector(".arrow-down");
    const submenu = item.querySelector(".dropdwown__submenu");

    if (arrow && submenu) {
      arrow.addEventListener("click", () => {
        
        submenu.classList.toggle("active");
        arrow.classList.toggle("rotated");
      });
    }
  });

  const hamburger = document.querySelector(".hamburger");
  const dropdown = document.querySelector(".lower__header__dropdown");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    dropdown.classList.toggle("open");
  });
  
});