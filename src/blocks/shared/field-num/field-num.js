export class Counter {
  constructor(element) {
    this.controls = {
      field: null,
      lessBtn: null,
      moreBtn: null
    }

    this.state = {
      min: null,
      max: null,
      current: null
    }

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
    const hasBtnEvt = (btn) => btn === 'moreBtn' ? this.moreCount() : this.lessCount();

    this.controls.lessBtn.addEventListener('click', () => this.lessCount());

    this.controls.moreBtn.addEventListener('click', () => this.moreCount());

    this.controls.field.addEventListener('input', () => {
      const symbolsLength = this.state.max.toString().length;
      this.controls.field.value = this.controls.field.value.replace( /\D/g, '' );

      if (this.controls.field.value[0] == '0' && this.controls.field.value.length >= symbolsLength) {
        this.controls.field.value = this.controls.field.value.replace(/0/g, '')
      }

      if (parseInt(this.controls.field.value) > this.state.max) {
        this.controls.field.value = this.state.max
      }

      this.state.current = parseInt(this.controls.field.value);

    });

    this.controls.field.addEventListener('change', () => {
      if (parseInt(this.controls.field.value) < this.state.min) {
        this.controls.field.value = this.state.min;

        this.state.current = parseInt(this.controls.field.value);
      }
    });

    btns.forEach((btn) =>
      addEvents.forEach(item =>
        this.controls[btn].addEventListener(item, () => {
          clearInterval(timerId);
          timerId = setInterval(() => hasBtnEvt(btn), 175)
        })
      )
    )

    btns.forEach((btn) =>
      removeEvents.forEach(item =>
        this.controls[btn].addEventListener(item, () => {
          clearInterval(timerId);
        })
      )
    )
  }
}

const fieldCounter = document.querySelectorAll('[data-counter]');
fieldCounter.forEach(item => new Counter(item));
