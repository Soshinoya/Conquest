class Slider {

    constructor(obj = {}) {
        this.slideClass = obj.slideClass;
        
        obj?.counterClass ? this.counterClass = obj.counterClass : this.counterClass = '';

        obj?.btnClass ? this.btnClass = obj.btnClass : this.btnClass = '';
        if (obj?.btnClassInner) {
            this.btnClassInner = obj.btnClassInner;
            this.btnInner = document.querySelector(`.${obj.btnClassInner}`);
        };

        this.slideArray = document.querySelectorAll(`.${this.slideClass}`);

        this.slidesCount = this.slideArray.length;
        this.counter = 0;

        this.btnClass !== '' ? this.createBtn() : 0;
        this.firstClassChange();
    };

    createBtn() {

        const btnLeft = document.createElement('button');
        const btnRight = document.createElement('button');

        btnLeft.classList.add(`${this.btnClass}--left`);
        btnRight.classList.add(`${this.btnClass}--right`);

        this.btnInner.append(btnLeft);
        this.btnInner.append(btnRight);

        this.btnL = document.querySelector(`.${this.btnClass}--left`);
        this.btnR = document.querySelector(`.${this.btnClass}--right`);

        this.btnArray = [];
        this.btnArray[0] = this.btnL;
        this.btnArray[1] = this.btnR;

        this.counterClass !== '' ? this.createCounterEl() : this.checkClickBtn();

    };

    createCounterEl() {
        
        const counter = document.createElement('div');

        counter.classList.add('banner__counter');

        counter.textContent = `0${this.counter + 1}`;

        this.btnInner.append(counter);

        this.counterEl = document.querySelector(`.${this.counterClass}`);

        this.checkClickBtn();

    };

    firstClassChange() {

        this.slideArray[0].classList.add(`${this.slideClass}--active`);

    };

    checkClickBtn() {

        this.btnArray[0].addEventListener('click', () => {
            if (this.counter > 0) {
                this.counter--;
                this.classChange();
            };
        });

        this.btnArray[1].addEventListener('click', () => {
            if (this.counter < this.slidesCount - 1) {
                this.counter++;
                this.classChange();
            };
        });

    };

    classChange() {

        for (const slide of this.slideArray) {
            slide.classList.remove(`${this.slideClass}--active`);
        };
        this.slideArray[this.counter].classList.add(`${this.slideClass}--active`);
        this.counterEl.textContent = `0${this.counter + 1}`;

    };
};