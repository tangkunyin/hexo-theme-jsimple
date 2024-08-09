import gulp from "gulp";
import babel from "gulp-babel";
import minifycss from "gulp-clean-css";
import uglify from "gulp-uglify";
import rename from "gulp-rename";
import concat from "gulp-concat";

process.on('unhandledRejection', error => {
  console.error('unhandledRejection', error);
  process.exit(1);
});

const CleanCssOps = {
  level: {
    1: {
      specialComments: 0
    },
    2: {
      all: true
    }
  }
}

const cssLib = ["./source/css/fonts/FontModule.css"];
gulp.task('build-theme-minifyCss', async function () {
  await gulp
    .src(cssLib.concat('./source/css/JSimple.css'))
    .pipe(minifycss(CleanCssOps))
    .pipe(concat("./source/css/JSimple.min.css"))
    .pipe(gulp.dest('./'));
});
gulp.task("build-highlight-minifyCss", async function () {
  await gulp
      .src("./source/css/highlight/*.css")
      .pipe(minifycss(CleanCssOps))
      .pipe(rename({ extname: ".min.css" }))
      .pipe(gulp.dest("./source/css"));
});


const jsLib = ["./source/js/lib/zepto.min.js"];
gulp.task('build-minifyJs', async function () {
  await gulp
    .src(jsLib.concat('./source/js/lib/SimpleCore.js'))
    .pipe(
      babel({
        ignore: jsLib,
        presets: ['@babel/preset-env']
      })
    )
    .pipe(uglify())
    .pipe(concat('./source/js/SimpleCore.min.js'))
    .pipe(gulp.dest('./'));
});


gulp.task(
  "build-minifyCss",
  gulp.parallel("build-theme-minifyCss", "build-highlight-minifyCss", function (done) {
      done();
  })
);


gulp.task(
  'default',
  gulp.parallel('build-minifyCss', 'build-minifyJs', function (done) {
    done();
  })
);
