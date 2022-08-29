
// Slider
const bannerSlider = new Slider({
    slideClass: 'banner-item',
    btnClass: 'banner__btn',
    btnClassInner: 'banner__btn-inner',
    counterClass: 'banner__counter',
});



// Rest Code

$(function () {

    // Burger Menu
    $('.header-menu__btn').on('click', function () {
        $('.menu').toggleClass('menu--active');
        $('.user-nav').toggleClass('user-nav--active');
        $(this).toggleClass('header-menu__btn-resolve');
        if ($('.menu').hasClass('menu--active')) {
            bgHide(true);
        } else {
            bgHide(false);
        }
    });

});

function bgHide(boo) {
    boo ? document.querySelectorAll('section',).forEach(item => item.style.display = 'none')
    : document.querySelectorAll('section',).forEach(item => item.style.display = 'block');

    boo ? document.querySelector('.footer').style.display = 'none' : document.querySelector('.footer').style.display = 'block';

    boo ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'auto';
};