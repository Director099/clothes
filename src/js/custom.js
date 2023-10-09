'use strict';

import '../blocks/shared/field-num/field-num.js';
import '../blocks/entities/product-gallery/product-gallery.js';

Fancybox.bind("[data-fancybox]", {
  dragToClose: false
});

const anchors = document.querySelectorAll('[data-smooth-scroll]')
anchors?.forEach((item) =>
  item.addEventListener('click',  (e) => {
    e.preventDefault();
    Fancybox.close();

    const blockID = item.getAttribute('href');

    document.querySelector(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  })
)

const telMask = document.querySelectorAll('[type="tel"]');
telMask.forEach((item) => {
  IMask(item, {
    mask: '{+7} (000) 000 00 00',
    lazy: false,
  });
})

const form = document.querySelectorAll("[data-form]");
form.forEach((itemForm) => {
  const pristine = new Pristine(itemForm, {
    classTo: 'field-text',
    errorTextParent: 'field-text',
  });

  const submitForm = (e) =>  {
    const _disabled = 'disabled';
    const valid = pristine.validate();
    const btnSubmit = pristine.form.querySelector("[data-form-btn]");
    valid ? btnSubmit.removeAttribute(_disabled) : btnSubmit.setAttribute(_disabled, _disabled);
    return valid ? true : e.preventDefault();
  }

  ["submit", "input"].forEach(item => itemForm.addEventListener(item, e => submitForm(e)))
})
