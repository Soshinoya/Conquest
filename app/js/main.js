
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

// Switch Theme

const switchThemeBtn = document.querySelector('#switchTheme');

const root = document.querySelector(':root');

const themes = {
    default: {
        "--black-color": "#1B1A17",
        "--black-color--trans": "rgba(27, 26, 23, 0.82)",
        "--accent-color": "#E6C8B4",
        "--dark-gray-color": "#444240",
        "--dark-green-color": "#555248",
        "--white-color": "#fff",
        "--display": "block",
    },
    dark: {
        "--black-color": "#fff",
        "--black-color--trans": "#fff",
        "--accent-color": "#E6C8B4",
        "--dark-gray-color": "#fff",
        "--dark-green-color": "#fff",
        "--white-color": "#000",
        "--display": "none",
    },
};

if (!localStorage.getItem('isDarkTheme')) {
    localStorage.setItem('isDarkTheme', false);
};

let isDarkTheme = JSON.parse(localStorage.getItem('isDarkTheme'));

changeTheme(isDarkTheme);

switchThemeBtn.addEventListener('click', btnHandler);

function btnHandler(e) {
    e.preventDefault();
    isDarkTheme = !isDarkTheme;
    localStorage.setItem('isDarkTheme', isDarkTheme);
    changeTheme(isDarkTheme);
};

function changeTheme(isDarkTheme) {
    const theme = isDarkTheme ? 'dark' : 'default';
    Object.entries(themes[theme]).forEach(([key, value]) => {
        root.style.setProperty(key, value)
    });
};