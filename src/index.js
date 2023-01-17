// css
import '../css/style.scss';
// html
import '../html/contacts.html';
import '../html/posts.html';
import '../html/post.html';
import { Slider } from '../src/slider.js';

document.addEventListener('DOMContentLoaded', function () {
    const autoplay = true; // автопрокрутка true|false
    const speed = 3000; //скорость прокрутки

    new Slider(document.querySelector('.wrap__sliders'), autoplay, speed);
});
