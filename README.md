# template-library-gulp

[![Code Climate](https://codeclimate.com/github/myTerminal/template-library-gulp.png)](https://codeclimate.com/github/myTerminal/template-library-gulp)
[![bitHound Overall Score](https://www.bithound.io/github/myTerminal/template-library-gulp/badges/score.svg)](https://www.bithound.io/github/myTerminal/template-library-gulp)
[![bitHound Code](https://www.bithound.io/github/myTerminal/template-library-gulp/badges/code.svg)](https://www.bithound.io/github/myTerminal/template-library-gulp)  
[![Dependency Status](https://david-dm.org/myTerminal/template-library-gulp.svg)](https://david-dm.org/myTerminal/template-library-gulp)
[![devDependency Status](https://david-dm.org/myTerminal/template-library-gulp/dev-status.svg)](https://david-dm.org/myTerminal/template-library-gulp#info=devDependencies)
[![peer Dependency Status](https://david-dm.org/myTerminal/template-library-gulp/peer-status.svg)](https://david-dm.org/myTerminal/template-library-gulp#info=peerDependencies)  
[![License](https://img.shields.io/badge/LICENSE-GPL%20v3.0-blue.svg)](https://www.gnu.org/licenses/gpl.html)
[![Gratipay](http://img.shields.io/gratipay/myTerminal.svg)](https://gratipay.com/myTerminal)  

A template to create front-end libraries with [Gulp.js](https://www.npmjs.com/package/gulp) as the task-runner

## Technologies

### Web

 - [jQuery](https://jquery.com/) (sample dependency)
 - [ES2015](http://es6-features.org/)
 - [Less CSS](http://lesscss.org/)

### Task Runner: Gulp

#### Plugins

 - [gulp-clean](https://www.npmjs.com/package/gulp-clean) to clean up the output directory at the start of every build
 - [gulp-sync](https://www.npmjs.com/package/gulp-sync) to be able to run tasks synchronously
 - [gulp-concat](https://www.npmjs.com/package/gulp-concat) to concat files
 - [gulp-copy](https://www.npmjs.com/package/gulp-copy) to copy static resources to the output directory
 - [gulp-less](https://www.npmjs.com/package/gulp-less) to transpile LESS stylesheets into CSS
 - [gulp-cleancss](https://www.npmjs.com/package/gulp-cleancss) to minify CSS
 - [gulp-babel](https://www.npmjs.com/package/gulp-babel), [babel-core](https://www.npmjs.com/package/babel-core) and [babel-preset-env](https://www.npmjs.com/package/babel-preset-env) for ES2015 transpilation
 - [gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps) to generate source-maps for debugging
 - [gulp-wrap-umd](https://www.npmjs.com/package/gulp-wrap-umd) to wrap library code as a UMD
 - [gulp-uglify](https://www.npmjs.com/package/gulp-uglify) to minify JavaScript files
 - [gulp-jshint](https://www.npmjs.com/package/gulp-jshint) to find and report JSHint issues in JavaScript
 - [gulp-jscs](https://www.npmjs.com/package/gulp-jscs) to find and report code styling issues in JavaScript
 - [gulp-watch-now](https://www.npmjs.com/package/gulp-watch-now) to watch over source files and run appropriate tasks
 - [jshint](https://www.npmjs.com/package/jshint) as a dependency for gulp-jshint
 - [jshint-stylish](https://www.npmjs.com/package/jshint-stylish) as a reporter for jshint

#### Tasks

 - build (default)
   - clean to clean the output directory
   - copy
     - copy-fonts to copy fonts to the output directory
   - styles to transpile Less CSS stylesheets into CSS stylesheets for the output directory
   - scripts to concatenate, transpile & minify all JavaScript to the output directory
 - debug
   - clean to clean the output directory
   - copy
     - copy-fonts to copy fonts to the output directory
   - styles to transpile Less CSS stylesheets into CSS stylesheets for the output directory
   - scripts-debug to concatenate and transpile all JavaScript to the output directory
   - lint to run JSHint and JSCS over JavaScript files
 - lint
   - run JSHint over JavaScript files
   - run JSCS over JavaScript files
 - develop to watch over the source files and run tasks related to the changed files
