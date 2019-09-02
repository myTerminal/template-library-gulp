/* global require module */

const libraryFileName = 'template-web-library',
    libraryName = 'templateWebLibrary',
    sourceDir = 'src',
    outputDir = 'build';

const gulp = require('gulp'),
    del = require('del'),
    gulpCopy = require('gulp-copy'),
    gulpLess = require('gulp-less'),
    gulpCleanCss = require('gulp-clean-css'),
    gulpConcat = require('gulp-concat'),
    gulpSourceMaps = require('gulp-sourcemaps'),
    gulpBabel = require('gulp-babel'),
    gulpWrap = require('gulp-wrap-umd'),
    gulpUglify = require('gulp-uglify'),
    gulpEslint = require('gulp-eslint');

const clean = done =>
    del([outputDir], done);

const copyFonts = () =>
    gulp.src([
        `${sourceDir}/fonts/**/*`
    ]).pipe(gulpCopy(outputDir, {
        prefix: 1
    }));

const copy = copyFonts;

const styles = () =>
    gulp.src(`${sourceDir}/styles/**/*.less`)
        .pipe(gulpLess())
        .pipe(gulpConcat(libraryFileName + '.css'))
        .pipe(gulpCleanCss())
        .pipe(gulp.dest(`${outputDir}/styles`));

const scriptsDebug = () =>
    gulp.src(`${sourceDir}/scripts/${libraryFileName}.js`)
        .pipe(gulpSourceMaps.init())
        .pipe(gulpBabel())
        .pipe(gulpWrap({
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
        .pipe(gulpSourceMaps.write('.'))
        .pipe(gulp.dest(`${outputDir}/scripts/`));

const scripts = () =>
      gulp.src(`${sourceDir}/scripts/${libraryFileName}.js`)
        .pipe(gulpBabel())
        .pipe(gulpWrap({
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
        .pipe(gulpUglify())
        .pipe(gulp.dest(`${outputDir}/scripts/`));

const lint = () =>
    gulp.src(`${sourceDir}/scripts/**/*.js`)
        .pipe(gulpEslint())
        .pipe(gulpEslint.format())
        .pipe(gulpEslint.failAfterError());

const debug = gulp.series(
    clean,
    copy,
    styles,
    scriptsDebug,
    lint
);

const build = gulp.series(
    clean,
    copy,
    styles,
    scripts
);

const develop = () => {
    gulp.watch(
        [
            `${sourceDir}/fonts/**/*`
        ],
        copy
    );

    gulp.watch(
        [
            `${sourceDir}/styles/**/*.less`
        ],
        styles
    );

    gulp.watch(
        [
            `${sourceDir}/scripts/**/*.js`
        ],
        scriptsDebug
    );
};

module.exports = {
    debug,
    build,
    develop,
    lint,
    default: build
};
