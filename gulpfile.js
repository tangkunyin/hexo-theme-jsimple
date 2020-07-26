'use strict';

const babel = require('gulp-babel');
const gulp = require('gulp');
const minifycss = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

gulp.task('minify-css', async function() {
    await gulp.src('./source/css/JSimple.css')
        .pipe(minifycss())
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('./source/css'));
});
gulp.task('minify-js', async function() {
    await gulp.src('./source/js/SimpleCore.js')
        .pipe(babel())
        .pipe(uglify())
        .pipe(gulp.src(['./source/js/lib/zepto.min.js', './source/js/lib/busuanzi.pure.mini.js']))
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest('./source/js'));
});

process.on('unhandledRejection', error => {
    console.error('unhandledRejection', error);
    process.exit(1) // To exit with a 'failure' code
});

gulp.task('default', gulp.parallel('minify-css','minify-js', function(done){
    done();
}));
