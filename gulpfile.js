const gulp = require("gulp");
const sass = require("gulp-sass");
const uglify = require("gulp-uglify");
const cleanCSS = require("gulp-clean-css");
const sourcemaps = require("gulp-sourcemaps");
const babel = require("gulp-babel");

const sassGlob = "src/sass/**/*.scss";
const jsGlob = "src/js/**/*.js";

gulp.task("css", function () {
  const postcss = require("gulp-postcss");

  return new Promise(function (resolve, reject) {
    gulp
      .src(sassGlob)
      .pipe(
        sass({
          includePaths: ["node_modules"],
        })
      )
      .pipe(sourcemaps.init())
      .pipe(postcss([require("autoprefixer")]))
      .pipe(cleanCSS())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest("dist/"))
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
      .src(jsGlob)
      .pipe(sourcemaps.init())
      .pipe(
        babel({
          presets: ["@babel/env"],
        })
      )
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest("dist/"))
      .on("end", resolve)
      .on("error", (error) => {
        console.error(error);
        reject();
      });
  });
});

//Watch task
gulp.task("default", function () {
  gulp.watch(sassGlob, gulp.series("css"));
  gulp.watch(jsGlob, gulp.series("script"));
});

gulp.task("build", (done) => {
  gulp.parallel("css", "script")(done);
});
