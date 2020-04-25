const gulp = require("gulp");
const sass = require("gulp-sass");
const uglify = require("gulp-uglify");
const cleanCSS = require("gulp-clean-css");
const sourcemaps = require("gulp-sourcemaps");
const babel = require("gulp-babel");
const postcss = require("gulp-postcss");

const config = {
  sass: "src/sass/**/*.scss",
  js: "src/js/**/*.js",
  html: "src/*.html",
  dist: "dist/",
};

gulp.task("css", function () {
  return new Promise(function (resolve, reject) {
    gulp
      .src(config.sass)
      .pipe(
        sass({
          includePaths: ["node_modules"],
        })
      )
      .pipe(sourcemaps.init())
      .pipe(postcss([require("autoprefixer")]))
      .pipe(cleanCSS())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(config.dist))
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
      .src(config.js)
      .pipe(sourcemaps.init())
      .pipe(
        babel({
          presets: ["@babel/env"],
        })
      )
      .pipe(uglify())
      .pipe(sourcemaps.write("."))
      .pipe(gulp.dest(config.dist))
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
      .pipe(gulp.dest(config.dist))
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
});

gulp.task("build", (done) => {
  gulp.parallel("css", "script", "html")(done);
});
