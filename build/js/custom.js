(function (factory) {
  typeof define === 'function' && define.amd ? define('custom', factory) :
  factory();
}((function () { 'use strict';

  class Counter {
    constructor(element) {
      this.controls = {
        field: null,
        lessBtn: null,
        moreBtn: null
      };
      this.state = {
        min: null,
        max: null,
        current: null
      };
      this.init(element);
    }
    init(element) {
      this.controls.field = element.querySelector('[data-count]');
      this.controls.lessBtn = element.querySelector('[data-control="minus"]');
      this.controls.moreBtn = element.querySelector('[data-control="plus"]');
      this.state.min = parseInt(this.controls.field.min);
      this.state.max = parseInt(this.controls.field.max);
      this.state.current = this.state.min;
      this.setListeners();
    }
    setCurrent(value) {
      this.state.current = value;
      this.controls.field.value = value;
    }
    lessCount() {
      const newValue = this.state.current - 1;
      if (newValue < this.state.min) return;
      this.setCurrent(newValue);
    }
    moreCount() {
      const newValue = this.state.current + 1;
      if (newValue > this.state.max) return;
      this.setCurrent(newValue);
    }
    setListeners() {
      let timerId = 0;
      const btns = ['moreBtn', 'lessBtn'];
      const addEvents = ['mousedown', 'touchstart'];
      const removeEvents = ['mouseup', 'mouseleave', 'mouseout', 'touchend'];
      const hasBtnEvt = btn => btn === 'moreBtn' ? this.moreCount() : this.lessCount();
      this.controls.lessBtn.addEventListener('click', () => this.lessCount());
      this.controls.moreBtn.addEventListener('click', () => this.moreCount());
      this.controls.field.addEventListener('input', () => {
        const symbolsLength = this.state.max.toString().length;
        this.controls.field.value = this.controls.field.value.replace(/\D/g, '');
        if (this.controls.field.value[0] == '0' && this.controls.field.value.length >= symbolsLength) {
          this.controls.field.value = this.controls.field.value.replace(/0/g, '');
        }
        if (parseInt(this.controls.field.value) > this.state.max) {
          this.controls.field.value = this.state.max;
        }
        this.state.current = parseInt(this.controls.field.value);
      });
      this.controls.field.addEventListener('change', () => {
        if (parseInt(this.controls.field.value) < this.state.min) {
          this.controls.field.value = this.state.min;
          this.state.current = parseInt(this.controls.field.value);
        }
      });
      btns.forEach(btn => addEvents.forEach(item => this.controls[btn].addEventListener(item, () => {
        clearInterval(timerId);
        timerId = setInterval(() => hasBtnEvt(btn), 175);
      })));
      btns.forEach(btn => removeEvents.forEach(item => this.controls[btn].addEventListener(item, () => {
        clearInterval(timerId);
      })));
    }
  }
  const fieldCounter = document.querySelectorAll('[data-counter]');
  fieldCounter.forEach(item => new Counter(item));

  const galleryThumbs = document.querySelectorAll('[data-gallery-thumbs]');
  const galleryTop = new Swiper('[data-gallery-top]', {
    slidesPerView: 1,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    }
  });
  galleryThumbs?.forEach(item => item?.addEventListener('click', e => galleryTop.slideTo(e.currentTarget.dataset.galleryThumbs)));

  Fancybox.bind("[data-fancybox]", {
    dragToClose: false
  });
  const anchors = document.querySelectorAll('[data-smooth-scroll]');
  anchors?.forEach(item => item.addEventListener('click', e => {
    e.preventDefault();
    Fancybox.close();
    const blockID = item.getAttribute('href');
    document.querySelector(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }));
  const telMask = document.querySelectorAll('[type="tel"]');
  telMask.forEach(item => {
    IMask(item, {
      mask: '{+7} (000) 000 00 00',
      lazy: false
    });
  });
  const form = document.querySelectorAll("[data-form]");
  form.forEach(itemForm => {
    const pristine = new Pristine(itemForm, {
      classTo: 'field-text',
      errorTextParent: 'field-text'
    });
    const submitForm = e => {
      const _disabled = 'disabled';
      const valid = pristine.validate();
      const btnSubmit = pristine.form.querySelector("[data-form-btn]");
      valid ? btnSubmit.removeAttribute(_disabled) : btnSubmit.setAttribute(_disabled, _disabled);
      return valid ? true : e.preventDefault();
    };
    ["submit", "input"].forEach(item => itemForm.addEventListener(item, e => submitForm(e)));
  });

})));
