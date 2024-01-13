import gulp from "gulp";
import dartSass from "sass";
import gulpSass from "gulp-sass";
import autoPrefixer from "gulp-autoprefixer";
import babel from 'gulp-babel'
import concat from 'gulp-concat'
import GulpUglify from 'gulp-uglify';
import browserSync from "browser-sync";
browserSync.create();

const sass = gulpSass(dartSass);

function compilaSass() {
  return gulp
    .src("scss/*.scss")
    .pipe(sass({outputStyle:'compressed'}))
    .pipe(
      autoPrefixer({
        overrideBrowserslist: [
          "last 2 versions",
          "safari 5",
          "ie 8",
          "ie 9",
          "Firefox 14",
          "opera 12.1",
          "ios 6",
          "android 4",
        ],
        cascade: true,
      })
    )
    .pipe(gulp.dest("css/"))
    .pipe(browserSync.stream())
}

gulp.task("sass", compilaSass);

function gulpJs(){
  return gulp.src('js/scripts/*.js')
  .pipe(concat('main.js'))
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(GulpUglify())
  .pipe(gulp.dest('js/'))
  .pipe(browserSync.stream())
}

gulp.task("alljs", gulpJs);


function browser() {
   browserSync.init({
    server: {
        baseDir: './'
    }
   })
}
gulp.task('browser', browser)

function watch() {
  gulp.watch("scss/*.scss", compilaSass);
  gulp.watch('*.html').on('change', browserSync.reload)
  gulp.watch('js/scripts/*.js', gulpJs);
  
}

gulp.task("watch", watch);

gulp.task('default', gulp.parallel('watch', 'browser', 'sass', 'alljs'));