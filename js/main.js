(function () {
  var burger = document.querySelector(".header__burger");
  var nav = document.querySelector(".header__nav");

  if (!burger || !nav) return;

  burger.addEventListener("click", function () {
    var isOpen = nav.classList.toggle("header__nav--open");
    burger.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  nav.querySelectorAll(".header__link").forEach(function (link) {
    link.addEventListener("click", function () {
      nav.classList.remove("header__nav--open");
      burger.setAttribute("aria-expanded", "false");
    });
  });

  var form = document.querySelector(".contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Спасибо! Ваше сообщение отправлено (демо-форма).");
      form.reset();
    });
  }
})();
