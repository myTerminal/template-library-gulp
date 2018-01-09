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
    sourcemaps = require('gulp-sourcemaps'),
    gulpBabel = require('gulp-babel'),
    wrap = require('gulp-wrap-umd'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    jshintStylish = require('jshint-stylish'),
    jscs = require('gulp-jscs'),
    gulpSync = require('gulp-sync')(gulp),
    watchNow = require('gulp-watch-now');

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
    return gulp.src(sourceDir + '/scripts/' + libraryFileName + '.js')
        .pipe(sourcemaps.init())
        .pipe(gulpBabel({
            presets: ['env']
        }))
        .pipe(wrap({
            deps: [
                {
                    name: 'jquery',
                    globalName: '$',
                    paramName: '$',
                    amdName: 'jquery',
                    cjsName: 'jquery'
                }
            ],
            namespace: libraryName,
            exports: libraryName,
            template: `<%
var stdDeps = ['require', 'exports', 'module'];

var amdDeps = _.pluck(deps, 'amdName');
var globalDeps = _.map(deps, function(dep) { return 'root.' + dep.globalName });
var cjsDeps = deps ? _.map(deps, function(dep) { return "require('" + dep.cjsName + "')" }) : stdDeps;
var depNames = deps ? _.pluck(deps, 'paramName') : stdDeps;
%>
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define('<%= namespace %>', <%= deps ? JSON.stringify(amdDeps) + ', ' : '' %>factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(<%= cjsDeps.join(', ') %>);
  } else {
    root.<%= namespace %> = factory(<%= globalDeps.join(', ') %>);
  }
}(this, function(<%= depNames.join(', ') %>) {
<% if (exports) { %>
<%= contents %>
return <%= exports %>;
<% } else { %>
return <%= contents %>;
<% } %>
}));`
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(outputDir + '/scripts/'));
});

gulp.task('scripts', function () {
    return gulp.src(sourceDir + '/scripts/' + libraryFileName + '.js')
        .pipe(gulpBabel({
            presets: ['env']
        }))
        .pipe(wrap({
            deps: [
                {
                    name: 'jquery',
                    globalName: '$',
                    paramName: '$',
                    amdName: 'jquery',
                    cjsName: 'jquery'
                }
            ],
            namespace: libraryName,
            exports: libraryName,
            template: `<%
var stdDeps = ['require', 'exports', 'module'];

var amdDeps = _.pluck(deps, 'amdName');
var globalDeps = _.map(deps, function(dep) { return 'root.' + dep.globalName });
var cjsDeps = deps ? _.map(deps, function(dep) { return "require('" + dep.cjsName + "')" }) : stdDeps;
var depNames = deps ? _.pluck(deps, 'paramName') : stdDeps;
%>
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define('<%= namespace %>', <%= deps ? JSON.stringify(amdDeps) + ', ' : '' %>factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(<%= cjsDeps.join(', ') %>);
  } else {
    root.<%= namespace %> = factory(<%= globalDeps.join(', ') %>);
  }
}(this, function(<%= depNames.join(', ') %>) {
<% if (exports) { %>
<%= contents %>
return <%= exports %>;
<% } else { %>
return <%= contents %>;
<% } %>
}));`
        }))
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
