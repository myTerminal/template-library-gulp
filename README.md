# template-library-gulp

[![License: CC BY-NC-SA 4.0](https://licensebuttons.net/l/by-nc-sa/4.0/80x15.png)](https://creativecommons.org/licenses/by-nc-sa/4.0)

A template to create front-end libraries with [Gulp.js](https://www.npmjs.com/package/gulp) as the task-runner

## Technologies

### Web

 - [jQuery](https://jquery.com/) (sample dependency)
 - [ES2015](http://es6-features.org/)
 - [Less CSS](http://lesscss.org/)

### Task Runner: Gulp

#### Plugins

 - [del](https://www.npmjs.com/package/del) to clean up the output directory at the start of every build
 - [gulp-concat](https://www.npmjs.com/package/gulp-concat) to concat files
 - [gulp-copy](https://www.npmjs.com/package/gulp-copy) to copy static resources to the output directory
 - [gulp-less](https://www.npmjs.com/package/gulp-less) to transpile LESS stylesheets into CSS
 - [effortless-css](https://www.npmjs.com/package/effortless-css) to provide Less CSS mixins
 - [gulp-cleancss](https://www.npmjs.com/package/gulp-cleancss) to minify CSS
 - [gulp-babel](https://www.npmjs.com/package/gulp-babel), [babel-core](https://www.npmjs.com/package/babel-core) and [babel-preset-env](https://www.npmjs.com/package/babel-preset-env) for ES2015 transpilation
 - [gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps) to generate source-maps for debugging
 - [gulp-wrap-umd](https://www.npmjs.com/package/gulp-wrap-umd) to wrap library code as a UMD
 - [gulp-uglify](https://www.npmjs.com/package/gulp-uglify) to minify JavaScript files
 - [gulp-eslint](https://www.npmjs.com/package/gulp-eslint), [babel-eslint](https://www.npmjs.com/package/babel-eslint), [eslint-config-myterminal](https://www.npmjs.com/package/eslint-config-myterminal), [eslint-config-airbnb](https://www.npmjs.com/package/eslint-config-airbnb), [eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import), [eslint-plugin-jsx-a11y](https://www.npmjs.com/package/eslint-plugin-jsx-a11y) and [eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react) to run ESLint on JavaScript files

#### Tasks

 - build (default)
   - clean to clean the output directory
   - copy
     - copyFonts to copy fonts to the output directory
   - styles to transpile Less CSS stylesheets into CSS stylesheets for the output directory
   - scripts to concatenate, transpile & minify all JavaScript to the output directory
 - debug
   - clean to clean the output directory
   - copy
     - copyFonts to copy fonts to the output directory
   - styles to transpile Less CSS stylesheets into CSS stylesheets for the output directory
   - scriptsDebug to concatenate and transpile all JavaScript to the output directory
   - lint to run ESLint over JavaScript files
 - lint
   - run ESLint over JavaScript files
 - develop to watch over the source files and run tasks related to the changed files

## To-Do

 - Make it more ES6 friendly
 - Find a way to write and run tests
