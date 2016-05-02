import gulp from 'gulp';
import plumber from 'gulp-plumber';
import gulpIf from 'gulp-if';
// import rupture from 'rupture';
// import stylint from 'gulp-stylint';
// import stylus from 'gulp-stylus';
// import importIfExist from 'stylus-import-if-exist';
// import autoprefixer from 'autoprefixer-stylus';
import sass from 'gulp-sass';
import sassGlob from 'gulp-sass-glob';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import nano from 'gulp-cssnano';
//import bourbon from 'node-bourbon';
import gcmq from 'gulp-group-css-media-queries';
import rename from 'gulp-rename';
import errorHandler from 'gulp-plumber-error-handler';

const isDebug = process.env.NODE_ENV !== 'production';

// gulp.task('styles', () => (
// 	gulp.src('app/styles/*.styl')
// 		.pipe(plumber({errorHandler: errorHandler(`Error in \'styles\' task`)}))
// 		.pipe(gulpIf(isDebug, sourcemaps.init()))
// 		.pipe(stylus({
// 			use: [
// 				importIfExist(),
// 				rupture(),
// 				autoprefixer()
// 			],
// 			'include css': true
// 		}))
// 		.pipe(gulpIf(!isDebug, gcmq()))
// 		.pipe(gulpIf(!isDebug, nano({zindex: false})))
// 		.pipe(rename({suffix: '.min'}))
// 		.pipe(gulpIf(isDebug, sourcemaps.write()))
// 		.pipe(gulp.dest('dist/assets/styles'))
// ));

gulp.task('styles', function() {
	gulp.src('app/styles/*.{scss,sass}')
		.pipe(sourcemaps.init())
		.pipe(plumber({errorHandler: errorHandler(`Error in \'styles\' task`)}))
		.pipe(gulpIf(isDebug, sourcemaps.init()))
		.pipe(sassGlob())
		.pipe(sass({
			style: 'expanded',
			sourcemap: true,
			includePaths: require('node-bourbon').includePaths
		}))
		.pipe(autoprefixer())
		.pipe(gulpIf(!isDebug, gcmq()))
		.pipe(gulpIf(!isDebug, nano({zindex: false})))
		.pipe(rename({suffix: '.min'}))
		.pipe(gulpIf(isDebug, sourcemaps.write()))
		.pipe(gulp.dest('dist/assets/styles'))
});

// gulp.task('styles:lint', () => (
// 	gulp.src(['app/**/*.styl', '!app/styles/**'])
// 		.pipe(stylint({
// 			reporter: 'stylint-stylish',
// 			reporterOptions: {verbose: true}
// 		}))
// 		.pipe(stylint.reporter())
// ));
