'use strict';

const gulp = require ('gulp');
const babel = require ('gulp-babel');
const minifycss = require ('gulp-clean-css');
const uglify = require ('gulp-uglify');
const rename = require ('gulp-rename');
const concat = require ('gulp-concat');

const srcIgnore = [
  './source/js/lib/zepto.min.js',
  './source/js/lib/busuanzi.pure.js',
  './source/js/lib/md5.js',
];
gulp.task ('minify-js', async function () {
  await gulp
    .src (srcIgnore.concat('./source/js/lib/SimpleCore.js'))
    .pipe (
      babel ({
        ignore: srcIgnore,
        presets: ['@babel/preset-env']
      })
    )
    .pipe (uglify ())
    .pipe (concat ('./source/js/SimpleCore.min.js'))
    .pipe (gulp.dest ('./'));
});
gulp.task ('minify-css', async function () {
  await gulp
    .src ('./source/css/JSimple.css')
    .pipe (minifycss ())
    .pipe (rename ({extname: '.min.css'}))
    .pipe (gulp.dest ('./source/css'));
});

process.on ('unhandledRejection', error => {
  console.error ('unhandledRejection', error);
  process.exit (1); // To exit with a 'failure' code
});

gulp.task (
  'default',
  gulp.parallel ('minify-js', 'minify-css', function (done) {
    done ();
  })
);
