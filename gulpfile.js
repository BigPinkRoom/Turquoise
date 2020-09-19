'use strict'
const {src, dest} = require ('gulp');
const gulp = require ('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cssbeautify = require('gulp-cssbeautify');
const cssnano = require('gulp-cssnano');
const imagemin = require('gulp-imagemin');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const rigger = require('gulp-rigger');
const sass = require('gulp-sass');
const stripComments = require('gulp-strip-css-comments');
const uglify = require('gulp-uglify');
const del = require('del');
const panini = require('panini');
const browsersync = require('browser-sync').create();
const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');
let fs = require('fs');

let path = {
    build: {
        html: 'dist/',
        js: 'dist/assets/js/',
        css: 'dist/assets/css/',
        images: 'dist/assets/img/',
        fonts: 'dist/assets/fonts/',
    },
    src: {
        html: 'src/*.html',
        js: 'src/assets/js/*.js',
        css: 'src/assets/sass/style.scss',
        images: 'src/assets/img/**/*.(jpg|jpeg|png|svg|gif|ico)',
        fonts: 'src/assets/fonts/*.ttf',
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/assets/js/**/*.js',
        css: 'src/assets/sass/**/*.scss',
        images: 'src/assets/img/**/*.(jpg|jpeg|png|svg|gif|ico)',
        fonts: 'src/assets/fonts/',
    },
    clean: './dist/',
}


/* Tasks */
function browserSync(done) {
    browsersync.init({
        server: {
            baseDir: './dist'
        },
        port: 3000,
        notify: false,
    })
}

function browserSyncReload(done) {
    browsersync.reload()
}

function fonts() {
    src(path.src.fonts)
        .pipe(ttf2woff())
        .pipe(dest(path.build.fonts));
    return src(path.src.fonts)
        .pipe(ttf2woff2())
        .pipe(dest(path.build.fonts))    
}

function html() {
    panini.refresh();
    return src(path.src.html, { base: 'src/'})
        .pipe(plumber())
        .pipe(panini({
            root: 'src/',
            layouts: 'src/tpl/layouts/',
            partials: 'src/tpl/partials/',
            helpers: 'src/tpl/helpers/',
            data: 'src/tpl/data/',
          }))
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream());
}

function css() {
    return src(path.src.css, { base: 'src/assets/sass'})
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer({
            browserlist: ['deafaults'],
            cascade: 'true'
        }))
        .pipe(cssbeautify())
        .pipe(dest(path.build.css))
        .pipe(cssnano({
            zindex: false,
            discardComments: {
                removeAll: true
            }
        }))
        .pipe(stripComments())
        .pipe(rename({
            suffix: '.min',
            extname: '.css'
        }))
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream());

}

function js() {
    return src(path.src.js, { base: 'src/assets/js'})
        .pipe(plumber())
        .pipe(rigger())
        .pipe(gulp.dest(path.build.js))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min',
            extname: '.js'
        }))
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream());
}

function images() {
    return src(path.src.images, { base: 'src/assets/img'})
        .pipe(imagemin())
        .pipe(dest(path.build.images));
}

function clean() {
    return del(path.clean);
}

function fontsStyle() {

    let fileContent = fs.readFileSync('src/assets/sass/fonts.scss');
    if (fileContent == '') {
        fs.writeFile('src/assets/sass/fonts.scss', '', cb);
        return fs.readdir(path.build.fonts + '/*.(woff|woff2)', function (err, items) {
            if (items) {
                let c_fontname;
                for (let i = 0; i < items.length; i++) {
                    let fontname = items[i].split('.');
                    fontname = fontname[0];
                    if (c_fontname != fontname) {
                         fs.appendFile('src/assets/sass/fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
                    }
                    c_fontname = fontname;
                }
            }
        })
    } else {
        return src(path.src.css)
            .pipe(plumber())
    }
}

function cb() {
    return
}

function fontAwesomeWebFonts() {
    let pathWebFonts = 'src/assets/fonts/webfonts';
    let checkDir = fs.existsSync(pathWebFonts);
        if(checkDir) {
           return src(pathWebFonts + '/*.*')
                .pipe(plumber())
                .pipe(dest('dist/assets/fonts/webfonts'))
        } else {
            return src(path.src.css)
                .pipe(plumber())
        }
}

function watchFiles() {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.images], images);
    gulp.watch([path.watch.fonts], fonts);
}

const build = gulp.series(clean, gulp.parallel(html, js, images, fonts, fontAwesomeWebFonts), css, fontsStyle, browserSync);
const watch = gulp.parallel(build, watchFiles);

/* Export Tasks */
exports.fontsStyle = fontsStyle;
exports.fonts = fonts;
exports.html = html;
exports.css = css;
exports.js = js;
exports.images = images;
exports.clean = clean;
exports.build = build;
exports.watch = watch;
exports.default = watch;