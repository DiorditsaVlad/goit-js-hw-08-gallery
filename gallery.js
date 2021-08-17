import { galleryItems } from "./app.js";

const galleryList = document.querySelector(".js-gallery");
const modal = document.querySelector(".js-lightbox");
const onCloseModalButton = document.querySelector(
  '[data-action="close-lightbox"]'
);
const modalImageGallery = document.querySelector(".lightbox__image");
const onOverlayGallery = document.querySelector(".lightbox__overlay");
const cardsGalleryMade = createMarkup(galleryItems);

galleryList.addEventListener("click", onGalleryContainerClick);
onCloseModalButton.addEventListener("click", onCloseModal);
onOverlayGallery.addEventListener("click", onCloseModal);
galleryList.insertAdjacentHTML("beforeend", cardsGalleryMade);

function createMarkup(gallery) {
  let indexOfImg = 0;
  return gallery
    .map(({ preview, original, description }) => {
      return `
      <li class="gallery__item">
        <a
          class="gallery__link"
          href="${original}"
        >
          <img
            loading="lazy"
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            data-index="${(indexOfImg += 1)}"
            alt="${description}"
          />
        </a>
      </li>
    `;
    })
    .join("");
}

function onGalleryContainerClick(e) {
  e.preventDefault();
  if (!e.target.classList.contains("gallery__image")) {
    return;
  }
  onOpenModal(e.target);
}

function onOpenModal(img) {
  window.addEventListener("keydown", onKeyDown);
  modal.classList.add("is-open");
  modalImageGallery.src = img.dataset.source;
  modalImageGallery.alt = img.alt;
  modalImageGallery.dataset.index = img.dataset.index;
}

function onCloseModal() {
  window.removeEventListener("keydown", onKeyDown);
  modal.classList.remove("is-open");
  modalImageGallery.src = "";
}

function swipe(count) {
  const index = modalImageGallery.dataset.index;
  const nextIndex = Number(index) + count;
  const nextEl = document.querySelector(`[data-index="${nextIndex}"]`);
  if (!nextEl) {
    return;
  }
  modalImageGallery.src = nextEl.dataset.source;
  modalImageGallery.alt = nextEl.alt;
  modalImageGallery.dataset.index = nextEl.dataset.index;
}

function onKeyDown(e) {
  if (e.code === "Escape") {
    onCloseModal();
  }
  if (e.code === "ArrowRight") {
    swipe(1);
  }
  if (e.code === "ArrowLeft") {
    swipe(-1);
  }
}
