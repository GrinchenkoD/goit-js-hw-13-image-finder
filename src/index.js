import "./css/style.css";
import galleryItemTmpl from "./templates/galleryItem.hbs";
import searchFormTmpl from "./templates/searchForm.hbs";
import galleryTmpl from "./templates/gallery.hbs";
import * as basicLightbox from "basiclightbox";
import "../node_modules/basiclightbox/dist/basicLightbox.min.css";
import apiSearch from "./js/apiService.js";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import { error } from "@pnotify/core";

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
        data.hits.length > 0
          ? refs.gallery.insertAdjacentHTML(
              "beforeend",
              galleryItemTmpl(data.hits),
            )
          : error({
              text: "Nothing was found",
              delay: 3000,
              closerHover: true,
            }),
      refs.button.classList.remove("is-hidden"),
    )
    .catch((err) => console.log(err));
}
//==============================================

function nextPage(e) {
  apiSearch
    .searchPictures(refs.input.value)
    .then((data) =>
      refs.gallery.insertAdjacentHTML("beforeend", galleryItemTmpl(data.hits)),
    )
    .then((e) =>
      window.scrollTo({
        top: document.documentElement.offsetHeight,
        behavior: "smooth",
      }),
    )

    .catch((err) => console.log(err));

  // window.scrollBy({
  //   top: document.documentElement.clientHeight,
  //   behavior: "smooth",
  // });
}
function openModal(event) {
  console.log(event.target);
  if (event.target.nodeName === "IMG") {
    const instance = basicLightbox.create(`
    <img src="${event.target.dataset.action}" width="800" height="600">
`);

    instance.show();
  }
}

refs.form.addEventListener("submit", fulfillGallery);
refs.button.addEventListener("click", nextPage);
refs.gallery.addEventListener("click", openModal);
