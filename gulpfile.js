const gulp = require("gulp");
const sass = require("gulp-sass");
const uglify = require("gulp-uglify");
const cleanCSS = require("gulp-clean-css");
const sourcemaps = require("gulp-sourcemaps");
const babel = require("gulp-babel");
const postcss = require("gulp-postcss");
const flatten = require('gulp-flatten');
const concat = require('gulp-concat');
const autoPrefixer = require("autoprefixer");


const config = {
    sass: "src/**/*.scss",
    js: "src/projects/**/*.js",
    html: "src/**/*.html",
    assets: "img/**/*.*",
    dist: "dist/",
};

gulp.task("css", function () {
    return new Promise(function (resolve, reject) {
        gulp
            .src("src/sass/styles.scss")
            .pipe(
                sass({
                    includePaths: ["node_modules"],
                })
            )
            .pipe(sourcemaps.init())
            .pipe(postcss([autoPrefixer()]))
            .pipe(cleanCSS())
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(config.dist + "css"))
            .on("end", resolve)
            .on("error", (error) => {
                console.error(error);
                reject();
            });
    });
});

gulp.task("script-base", function () {
    return new Promise(function (resolve, reject) {
        gulp
            .src([
                "src/js/polyfills.js",
                "src/js/formdata.js",
                "node_modules/@babel/polyfill/dist/polyfill.js"
            ])
            .pipe(
                babel({
                    presets: ["@babel/env"],
                })
            )
            .pipe(concat("base.js"))
            .pipe(uglify())
            .pipe(flatten())
            .pipe(gulp.dest(config.dist + "js"))
            .on("end", resolve)
            .on("error", (error) => {
                console.error(error);
                reject();
            });
    });
});

gulp.task("script", function () {
    return new Promise(function (resolve, reject) {
        gulp
            .src([
                config.js
            ])
            .pipe(sourcemaps.init())
            .pipe(
                babel({
                    presets: ["@babel/env"],
                })
            )
            .pipe(uglify())
            .pipe(sourcemaps.write("."))
            .pipe(flatten())
            .pipe(gulp.dest(config.dist + "js"))
            .on("end", resolve)
            .on("error", (error) => {
                console.error(error);
                reject();
            });
    });
});

gulp.task("html", function () {
    return new Promise(function (resolve, reject) {
        gulp
            .src(config.html)
            .pipe(flatten())
            .pipe(gulp.dest(config.dist))
            .on("end", resolve)
            .on("error", (error) => {
                console.error(error);
                reject();
            });
    });
});

gulp.task("assets", function () {
    return new Promise(function (resolve, reject) {
        gulp
            .src(config.assets)
            .pipe(gulp.dest(config.dist + "/img"))
            .on("end", resolve)
            .on("error", (error) => {
                console.error(error);
                reject();
            });
    });
});

//Watch task
gulp.task("default", function () {
    gulp.watch(config.sass, gulp.series("css"));
    gulp.watch(config.js, gulp.series("script"));
    gulp.watch(config.html, gulp.series("html"));
    gulp.watch(config.assets, gulp.series("assets"));
});

gulp.task("build", (done) => {
    gulp.parallel("script-base", "css", "script", "html", "assets")(done);
});
