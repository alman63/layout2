class Slider {
    constructor(slider, autoplay, speed) {
        this.slider = slider;
        this.allFrames = slider.querySelectorAll('.sliders__item');
        this.frameChain = slider.querySelector('.sliders');
        this.nextButton = slider.querySelector('.sliders-next');
        this.prevButton = slider.querySelector('.sliders-prev');
        this.speed = speed;
        this.index = 0;
        this.length = this.allFrames.length;
        this.autoplay = autoplay;
        this.paused = null;

        this.init();
    }

    init() {
        this.dotButtons = this.dots();
        this.allFrames.forEach(
            (frame) => (frame.style.width = 100 / this.length + '%')
        );
        this.frameChain.style.width = 100 * this.length + '%';

        this.nextButton.addEventListener('click', (event) => {
            event.preventDefault();
            this.next();
        });

        this.prevButton.addEventListener('click', (event) => {
            event.preventDefault();
            this.prev();
        });

        this.dotButtons.forEach((dot) => {
            dot.addEventListener('click', (event) => {
                event.preventDefault();
                const index = this.dotButtons.indexOf(event.target);
                if (index === this.index) return;
                this.goto(index);
            });
        });

        if (this.autoplay) {
            this.play();
            this.slider.addEventListener('mouseenter', () =>
                clearInterval(this.paused)
            );
            this.slider.addEventListener('mouseleave', () => this.play());
        } else {
            this.paused;
        }
    }

    goto(index) {
        if (index > this.length - 1) {
            this.index = 0;
        } else if (index < 0) {
            this.index = this.length - 1;
        } else {
            this.index = index;
        }
        this.move();
    }

    next() {
        this.goto(this.index + 1);
    }

    prev() {
        this.goto(this.index - 1);
    }

    move() {
        const offset = (100 / this.length) * this.index;
        this.frameChain.style.transform = `translateX(-${offset}%)`;
        this.dotButtons.forEach((dot) => dot.classList.remove('active'));
        this.dotButtons[this.index].classList.add('active');
    }

    play() {
        this.paused = setInterval(() => this.next(), this.speed);
    }

    dots() {
        const ol = document.createElement('ol');
        ol.classList.add('sliders-indicators');
        const children = [];
        for (let i = 0; i < this.length; i++) {
            let li = document.createElement('li');
            if (i === 0) li.classList.add('active');
            ol.append(li);
            children.push(li);
        }
        this.slider.prepend(ol);
        return children;
    }
}
