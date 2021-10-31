const {
  src,
  dest,
  watch, 
  parallel,
  series
} = require("gulp");

const terser = require("gulp-terser");
const rename = require("gulp-rename");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const cssnano = require("gulp-cssnano");
// const concat = require("gulp-concat");
const htmlReplace = require("gulp-html-replace");
const changed = require("gulp-changed");
const del = require("del");
const imagemin = require("gulp-imagemin");
const sourcemaps = require("gulp-sourcemaps");
const browserSync = require("browser-sync").create();

function clean() {
  return del("dist/");
}

function cleanMaps() {
  return del("dist/maps");
}

function html() {
  const source = "src/**/*.html";

  return src(source)
    .pipe(htmlReplace({
      js: {
        src: null,
        tpl: '<script src="%f.min.js"></script>'
      },
      css: {
        src: null,
        tpl: '<link rel= "stylesheet" href="./%f.min.css" />'
      },
      footerYearjs: "../shared-scripts/footerYear.min.js",
      toTopBtnjs: "../shared-scripts/toTopBtn.min.js",
      headerjs: "../shared-scripts/header.min.js",
      utilsjs: "../shared-scripts/utils.min.js"
    }))
    .pipe(dest("dist/"))
}

function js() {
  const source = "src/**/*.js";

  return src(source)
    .pipe(changed(source))
    .pipe(sourcemaps.init())
    .pipe(terser({
      compress: true,
      mangle: true
    }))
    .pipe(rename({
      extname: ".min.js"
    }))
    .pipe(sourcemaps.write('../src/maps'))
    .pipe(dest("./dist"))
    .pipe(browserSync.stream());
}

function css() {
  const source = "./src/**/*.scss";

  return src(source)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer({
      overrideBrowserslist: ["last 2 versions"],
      cascade: false
    }))
    .pipe(sourcemaps.write())
    .pipe(dest("src/"))
    // if we dont put this here, browsersync
    // does not reload, that is, we dont see our changes
    // on the UI unless we manually reload the window.
    .pipe(browserSync.stream())
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(cssnano())
    .pipe(sourcemaps.write("./maps"))
    .pipe(dest("dist/"))
    .pipe(browserSync.stream());
}

function img() {
  return src('./src/img/*')
    .pipe(imagemin())
    .pipe(dest('./dist/img'));
}

// Watch files

function watchFiles() {
  watch('./src/**/*.scss', { ignoreInitial: false }, css);
  watch('./src/**/*.html', { ignoreInitial: false }, html).on("change", browserSync.reload);
  watch('./src/**/*.js', { ignoreInitial: false }, js);
  watch('./src/img/*', { ignoreInitial: false }, img);
}

// BrowserSync

function bSync() {
  browserSync.init({
    server: {
      baseDir: './src'
    },
    port: 3000
  });
}

// Tasks to define the execution of the functions simultaneously or in series

exports.watch = parallel(watchFiles, bSync);
exports.default = series(clean, parallel(html, js, css, img), cleanMaps);
    