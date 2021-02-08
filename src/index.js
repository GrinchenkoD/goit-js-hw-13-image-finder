import "./css/style.css";
import galleryItemTmpl from "./templates/galleryItem.hbs";
import searchFormTmpl from "./templates/searchForm.hbs";
import galleryTmpl from "./templates/gallery.hbs";

import apiSearch from "./js/apiService.js";

document.body.insertAdjacentHTML("beforeend", searchFormTmpl() + galleryTmpl());
const refs = {
  gallery: document.querySelector(".gallery"),
  button: document.querySelector(".load-button"),
  input: document.querySelector(".search-input"),
  form: document.querySelector(".search-form"),
};
//

// ========================================

function fulfillGallery(event) {
  event.preventDefault();
  apiSearch.setDefaultPage();
  refs.gallery.innerHTML = "";
  if (refs.input.value === "") {
    refs.button.classList.add("is-hidden");
  }

  apiSearch
    .searchPictures(refs.input.value)
    .then(
      (data) =>
        refs.gallery.insertAdjacentHTML(
          "beforeend",
          galleryItemTmpl(data.hits),
        ),
      refs.button.classList.remove("is-hidden"),
    )
    .catch((err) => console.log(err));
}
//==============================================

function nextPage(event) {
  apiSearch
    .searchPictures(refs.input.value)
    .then((data) =>
      refs.gallery.insertAdjacentHTML("beforeend", galleryItemTmpl(data.hits)),
    )
    .catch((err) => console.log(err));

  window.scrollBy({
    top: document.documentElement.clientHeight,
    left: 0,
    behavior: "smooth",
  });
}

refs.form.addEventListener("submit", fulfillGallery);
refs.button.addEventListener("click", nextPage);
