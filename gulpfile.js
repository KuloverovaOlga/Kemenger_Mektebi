const { src, dest, watch, parallel, series } = require('gulp');

const scss = require('gulp-sass')(require('sass'));
const gcmq = require('gulp-group-css-media-queries');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const fonter = require('gulp-fonter');
const ttf2woff2 = require('gulp-ttf2woff2');
const include = require('gulp-include');
const webpack = require('webpack-stream');

function pages() {
    return src('app/index.html')
        .pipe(
            include({
                includePaths: 'app/pages',
            })
        )
        .pipe(dest('dist'))
        .pipe(browserSync.stream());
}

function styles() {
            return src('app/scss/style.scss')
            .pipe(concat('style.min.css'))
            .pipe(scss())
            .pipe(gcmq())
            .pipe(autoprefixer({ overrideBrowserslist: ['last 10 version'] }))
            .pipe(scss({ outputStyle: 'compressed' }))
            .pipe(dest('dist/css'))
            .pipe(browserSync.stream());
    
}

function scripts() {
    return src('app/js/script.js')
        .pipe(
            webpack({
                mode: 'production',
                output: {
                    filename: 'script.min.js',
                },
                watch: true,

                devtool: 'source-map',
                module: {
                    rules: [
                        {
                            test: /\.m?js$/i,
                            exclude: /(node_modules||bower_components)/,
                            use: {
                                loader: 'babel-loader',
                                options: {
                                    presets: [
                                        [
                                            '@babel/preset-env',
                                            {
                                                debug: true,
                                                corejs: 3,
                                                useBuiltIns: 'usage',
                                            },
                                        ],
                                    ],
                                },
                            },
                        },
                    ],
                },
            })
        )
        .pipe(dest('dist/js'))
        .pipe(browserSync.stream());
}

function images() {
    return src(['app/images/*.*']).pipe(imagemin()).pipe(dest('dist/images'));
}

function icons() {
    return src('app/icons/*.*').pipe(imagemin()).pipe(dest('dist/icons'));
}

function fonts() {
    return src('app/fonts/*.*')
        .pipe(
            fonter({
                formats: ['woff', 'ttf', 'eot'],
            })
        )
        .pipe(src('app/fonts/*.ttf'))
        .pipe(ttf2woff2())
        .pipe(dest('dist/fonts'));
}

function watching() {
    browserSync.init({
        server: {
            baseDir: 'dist/',
        },
    });
    watch(['app/scss/**/*'], styles);
    watch(['app/**/*.html'], pages);
    watch(['app/js/**/*'], scripts);
    watch(['app/images'], images);
    watch(['app/icons'], icons);
    watch(['app/fonts'], fonts);
    watch(['app/*.html']).on('change', browserSync.reload);
}

function cleanDist() {
    return src('dist').pipe(clean());
}

exports.pages = pages;
exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.icons = icons;
exports.fonts = fonts;
exports.watching = watching;
exports.cleanDist = cleanDist;

exports.default = series(cleanDist, parallel(styles, scripts, pages, watching, images, icons, fonts));
