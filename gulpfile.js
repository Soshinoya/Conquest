const { src, dest, watch, parallel, series } = require('gulp');



const gulp           = require('gulp');
const scss           = require('gulp-sass')(require('sass'));
const concat         = require('gulp-concat');
const autoprefixer   = require('gulp-autoprefixer');
const uglify         = require('gulp-uglify');
const rename         = require('gulp-rename');
const imagemin       = require('gulp-imagemin');
const htmlmin        = require('gulp-htmlmin');
const del            = require('del');
const { notify }     = require('browser-sync');
const browserSync    = require('browser-sync').create();
const critical       = require('critical');

function html() {
  return src('app/**/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest('app/'));
};

function img() {
  return src('app/images/**/*.*')
    .pipe(imagemin())
    .pipe(dest('app/images/'))
};

function critGenerate() {
  critical.generate({
    inline: true,
    base: './',
    src: 'app/_index.html',
    css: ['app/css/index.min.css'],
    width: 1300,
    height: 900,
    target: {
      css: 'css/critical/critical.css',
      html: 'app/index.html',
      uncritical: 'css/critical/uncritical.css',
    },
    extract: true,
  });
};

function browsersync() {
  browserSync.init({
    server: {
      baseDir: 'app/'
    },
    notify: false
  })
}

function styles() {
  return src('app/scss/*.scss')
    .pipe(scss({outputStyle: 'compressed'}))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 10 versions'],
      grid: true
    }))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream())
}

function scripts() {
  return src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/slick-carousel/slick/slick.js',
    'app/js/main.js',
  ])
  .pipe(concat('main.min.js'))
  .pipe(uglify())
  .pipe(dest('app/js'))
  .pipe(browserSync.stream())
}

function dist() {
  return src([
    'app/**/*.html',
    'app/css/**/*.css',
    'app/css/critical/**/*.css',
    'app/js/main.min.js'
  ], {base: 'app'})
  .pipe(dest('dist'))
}

function cleanDist() {
  return del('dist')
}

function watching() {
  watch(['app/**/*.scss'], styles);
  watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
  watch(['app/**/*.html']).on('change', browserSync.reload);
}



exports.img = img;
exports.html = html;
exports.styles = styles;
exports.scripts = scripts;
exports.watching = watching;
exports.cleanDist = cleanDist;
exports.browsersync = browsersync;
exports.critGenerate = critGenerate;
exports.dist = series(cleanDist, dist);


exports.default = parallel(styles, scripts, img, browsersync, watching);
// exports.default = parallel(critGenerate, html, styles, scripts, img, browsersync, watching);