// 1 - declaring variables

// hame of the theme folder

var gulp = require('gulp'),
		// Prepare and optimize code etc
		autoprefixer = require('autoprefixer'),
		browserSync = require('browser-sync').create(),
		jshint = require('gulp-jshint'),
		postcss = require('gulp-postcss'),
		sass = require('gulp-sass'),
		sourcemaps = require('gulp-sourcemaps'),
		concat = require('gulp-concat'),
		sassLint = require('gulp-sass-lint');


// Sources + Destination variables
var srcRoot = 'source/**/*.*';

// Fonts
var fontsSrc = "source/fonts/**/*.*";
var fontsDest = 'www/build/fonts';

// Sass
var sassSrc = "source/sass/**/*.scss";
var sassDest = 'www/build/css';

// JavaScript
var jsSrc = "source/js/**/*.js";
var jsDest = 'www/build/js';
var scriptsName = 'scripts.js';

// jQuery and BootStrap sources
var jQuerySrc = 'node_modules/jquery/dist/*.*';
var bootstrapSrc = 'node_modules/bootstrap-sass/assets/**/*.*';

// Vendor
var vendorDest = 'www/build/vendor';

// CSS via Sass and Autoprefixer + copying to the destination
gulp.task('sass-dev', function () {
	return gulp.src(sassSrc)
			.pipe(sourcemaps.init())
			.pipe(sass({
				outputStyle: 'expanded',
				indentType: 'tab',
				indentWidth: '1'
			}).on('error', sass.logError))
			.pipe(postcss([
				autoprefixer('last 2 versions', '> 1%')
			]))
			.pipe(sourcemaps.write('.'))
			.pipe(gulp.dest(sassDest));
});

/* SASS LINT */
gulp.task('sass-lint', function () {
	gulp.src(sassSrc)
			.pipe(sassLint())
			.pipe(sassLint.format())
			.pipe(sassLint.failOnError());
});


// JavaScript + copying to the destination
gulp.task('js-dev', function () {
	return gulp.src(jsSrc)
			.pipe(sourcemaps.init())
			.pipe(jshint())
			.pipe(jshint.reporter('default'))
			.pipe(concat(scriptsName))
			.pipe(sourcemaps.write('.'))
			.pipe(gulp.dest(jsDest));
});

// Copying vendor stuff
gulp.task('copy-jquery', function () {
	gulp.src(jQuerySrc).pipe(gulp.dest(vendorDest + '/jquery'));
});


// task to run all 3 copying functions
gulp.task('copy-vendor-assets', ['copy-jquery']);

// Watch everything
gulp.task('watch', function () {
	browserSync.init({
		open: 'external',
		//browser: "firefoxdeveloperedition",
		proxy: 'inwk-calc.local'
	});
	gulp.watch(sassSrc, ['sass-dev']);
	gulp.watch(jsSrc, ['js-dev']);
	gulp.watch(srcRoot).on('change', browserSync.reload);
	gulp.watch("www/**/*.html").on('change', browserSync.reload);
});


/* Default task (runs at initiation: gulp --verbose)
 * 
 * this is a final step in the gulpfile, the default task consist of all the primary 
 * need tasks such as watch, copy-vendor-assets, sass-dev, js-dev
 * 
 * */
gulp.task('default', ['copy-vendor-assets', 'sass-dev', 'js-dev', 'watch']);