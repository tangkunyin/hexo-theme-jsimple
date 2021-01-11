'use strict';

const babel = require ('gulp-babel');
const gulp = require ('gulp');
const minifycss = require ('gulp-clean-css');
const uglify = require ('gulp-uglify');
const rename = require ('gulp-rename');
const concat = require ('gulp-concat');

gulp.task ('minify-css', async function () {
  await gulp
    .src ('./source/css/JSimple.css')
    .pipe (minifycss ())
    .pipe (rename ({extname: '.min.css'}))
    .pipe (gulp.dest ('./source/css'));
});
gulp.task ('minify-js', async function () {
  await gulp
    .src ([
      './source/js/lib/zepto.min.js',
      './source/js/lib/busuanzi.pure.js',
      './source/js/lib/md5.js',
      './source/js/lib/SimpleCore.js',
    ])
    .pipe (
      babel ({
        presets: ['@babel/preset-env'],
      })
    )
    .pipe (uglify ())
    .pipe (concat ('./source/js/SimpleCore.min.js', {newLine: ';'}))
    .pipe (gulp.dest ('./'));
});

process.on ('unhandledRejection', error => {
  console.error ('unhandledRejection', error);
  process.exit (1); // To exit with a 'failure' code
});

gulp.task (
  'default',
  gulp.parallel ('minify-css', 'minify-js', function (done) {
    done ();
  })
);
