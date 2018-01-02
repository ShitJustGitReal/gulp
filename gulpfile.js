// Gulp.js configuration
const
    // MODULES
    // GENERAL
    gulp = require('gulp'),
    newer = require('gulp-newer'), // only run the task on new and modified files
    gzip = require('gulp-gzip'), // generate gzip files of html, css and javascript files (images are already compressed in another way)
    webserver = require('gulp-webserver'), // streaming gulp plugin to run a local webserver with LiveReload
    // IMAGES
    imagemin = require('gulp-imagemin'), // compress images and copy them to the build folder
    responsive = require('gulp-responsive'), // making multiple images out of one for responsive designs
    // HTML
    htmlclean = require('gulp-htmlclean'), // minify html code
    // JAVASCRIPT
    concat = require('gulp-concat'), // concatenate all script files into a single main.js file
    deporder = require('gulp-deporder'), // ensure javascript dependencies are loaded first 
    stripdebug = require('gulp-strip-debug'), // remove all console and debugging statements
    uglify = require('gulp-uglify'), // minimize javascript code
    // CSS
    sass = require('gulp-sass'), // compile sass
    postcss = require('gulp-postcss'), // requires the css assets below
    assets = require('postcss-assets'), // manage assets to resolve file paths or inline data-encoded images
    autoprefixer = require('autoprefixer'), // automatically add vendor prefixes to CSS properties
    mqpacker = require('css-mqpacker'), // pack multiple references to same media query into a single rule
    cssnano = require('cssnano'), // minify the CSS code
    // DEVELOPMENT MODE?
    devBuild = (process.env.NODE_ENV !== 'production'),
    // FOLDERS
    folder = {
        build: 'build/'
    };

// IMAGES: minify and copy them to the build folder
gulp.task('images', function () {
    let out = folder.build + 'images/';
    return gulp.src('images/*.{png,jpg,svg}')
        .pipe(newer(out))
        .pipe(imagemin({
            optimizationLevel: 5
        }))
        .pipe(gulp.dest(out));
});

// responsive images from raw image
gulp.task('responsive', function () {
    let out = 'images/';
    return gulp.src('images/raw/*.{png,jpg}')
        .pipe(responsive({
            '**/*.*': [{
                width: 200,
                rename: {
                    suffix: '-200'
                }
            }, {
                width: 500,
                rename: {
                    suffix: '-500'
                }
            }]

        }, {
            errorOnEnlargement: false,
        }))
        .pipe(gulp.dest(out));
});

// HTML: minify
gulp.task('html', ['images'], function () {
    let
        out = folder.build,
        page = gulp.src('html/**/*')
        .pipe(newer(out))
        .pipe(htmlclean());
    // .pipe(gzip());
    return page.pipe(gulp.dest(out));
});

// JAVASCRIPT
gulp.task('js', function () {
    let jsbuild = gulp.src('js/**/*')
        .pipe(deporder())
        .pipe(concat('main.js'))
        .pipe(stripdebug())
        .pipe(uglify())
        .pipe(gzip());
    return jsbuild.pipe(gulp.dest(folder.build + 'js/'));
});

// CSS
gulp.task('css', ['images'], function () {
    let postCssOpts = [
        assets({
            loadPaths: ['images/']
        }),
        autoprefixer({
            browsers: ['last 2 versions', '> 2%']
        }),
        mqpacker
    ];
    postCssOpts.push(cssnano);
    return gulp.src('scss/main.scss')
        .pipe(sass({
            outputStyle: 'nested',
            imagePath: 'images/',
            precision: 3,
            errLogToConsole: true
        }))
        .pipe(postcss(postCssOpts))
        .pipe(gzip())
        .pipe(gulp.dest(folder.build + 'css/'));
});

// BUILD tasks
gulp.task('build', ['html', 'css', 'js']);
gulp.task('watch', function () {
    // image changes
    gulp.watch('images/**/*', ['images']);
    // html changes
    gulp.watch('html/**/*', ['html']);
    // javascript changes
    gulp.watch('js/**/*', ['js']);
    // css changes
    gulp.watch('scss/**/*', ['css']);
});
gulp.task('run', ['build', 'watch']);

// WEBSERVER
gulp.task('webserver', function() {
    gulp.src('build')
      .pipe(webserver({
        port: 3000,
        livereload: true,
        //directoryListing: true,
        open: true,
        fallback: 'index.html',
      }));
  });