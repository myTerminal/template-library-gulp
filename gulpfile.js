/* global require */

const libraryFileName = 'template-library';
const libraryName = 'templateLibrary';
const sourceDir = 'src';
const outputDir = 'build';

var gulp = require('gulp'),
    clean = require('gulp-clean'),
    copy = require('gulp-copy'),
    less = require('gulp-less'),
    cleanCSS = require('gulp-cleancss'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    jshintStylish = require('jshint-stylish'),
    jscs = require('gulp-jscs'),
    gulpSync = require('gulp-sync')(gulp),
    watchNow = require('gulp-watch-now'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    browserify = require('browserify');

gulp.task('clean', function () {
    return gulp.src(outputDir, { read: false })
        .pipe(clean());
});

gulp.task('copy-fonts', function () {
    return gulp.src([
        sourceDir + '/fonts/**/*'
    ]).pipe(copy(outputDir, {
        prefix: 1
    }));
});

gulp.task('copy', [
    'copy-fonts'
]);

gulp.task('styles', function () {
    return gulp.src(sourceDir + '/styles/**/*.less')
        .pipe(less())
        .pipe(concat(libraryFileName + '.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest(outputDir + '/styles'));
});

gulp.task('scripts-debug', function () {
    return browserify({
        entries: sourceDir + '/scripts/' + libraryFileName + '.js',
        debug: true
    })
        .transform("babelify", { presets: ["env"] })
        .bundle()
        .pipe(source(libraryFileName + '.js'))
        .pipe(buffer())
        .pipe(gulp.dest(outputDir + '/scripts/'));
});

gulp.task('scripts', function () {
    return browserify({
        entries: sourceDir + '/scripts/' + libraryFileName + '.js',
        debug: true
    })
        .transform("babelify", { presets: ["env"] })
        .bundle()
        .pipe(source(libraryFileName + '.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest(outputDir + '/scripts/'));
});

gulp.task('jshint', function () {
    return gulp.src(sourceDir + '/scripts/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(jshintStylish, { beep: true }));
});

gulp.task('jscs', function () {
    return gulp.src(sourceDir + '/scripts/**/*.js')
        .pipe(jscs())
        .pipe(jscs.reporter());
});

gulp.task('lint', gulpSync.sync([
    'jshint',
    'jscs'
]));

gulp.task('debug', gulpSync.sync([
    'clean',
    'copy',
    'styles',
    'scripts-debug',
    'lint'
]));

gulp.task('build', gulpSync.sync([
    'clean',
    'copy',
    'styles',
    'scripts'
]));

gulp.task('develop', function() {
    watchNow.watch(gulp, [
        sourceDir + '/fonts/**/*'
    ], [
        'copy'
    ]);

    watchNow.watch(gulp, [
        sourceDir + '/styles/**/*.less'
    ], [
        'styles'
    ]);

    watchNow.watch(gulp, [
        sourceDir + '/scripts/**/*.js'
    ], [
        'scripts-debug'
    ]);
});

gulp.task('default', ['build']);
