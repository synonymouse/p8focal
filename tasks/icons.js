import gulp from 'gulp';
import svgSymbols from 'gulp-svg-symbols';
import gulpIf from 'gulp-if';
import rename from 'gulp-rename';
import plumber from 'gulp-plumber';
import errorHandler from 'gulp-plumber-error-handler';
import path from 'path';

gulp.task('icons', () => (
	gulp.src('app/icons/**/*.svg')
		.pipe(plumber({errorHandler: errorHandler(`Error in 'icons' task`)}))
		.pipe(svgSymbols({
			title: false,
			id: 'icon_%f',
			className: '%f',
			templates: [
				path.join(__dirname, '../app/styles/helpers/svg-size.template.scss'),
				'default-svg'
			]
		}))
		.pipe(gulpIf(/\.scss$/, gulp.dest('app/styles/helpers')))
		.pipe(gulpIf(/\.svg$/, rename('icon.svg')))
		.pipe(gulpIf(/\.svg$/, gulp.dest('dist/assets/images/')))
));
