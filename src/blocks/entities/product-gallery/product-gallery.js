const galleryThumbs = document.querySelectorAll('[data-gallery-thumbs]');

const galleryTop = new Swiper('[data-gallery-top]', {
  slidesPerView: 1,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },
});

galleryThumbs?.forEach(item => item?.addEventListener('click', e => galleryTop.slideTo(e.currentTarget.dataset.galleryThumbs)))
