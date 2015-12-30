'use strict';

var gulp 		= require("gulp"),
	browserSync = require('browser-sync'),
	reload 		= browserSync.reload,
	rename 		= require('gulp-rename'),
	concatCss 	= require('gulp-concat-css'),
	minifyCss 	= require('gulp-minify-css'),	//min css
	sass 		= require('gulp-sass'),
	uglify 		= require('gulp-uglify'), //min js
	filter 		= require('gulp-filter'),
	imagemin 	= require('gulp-imagemin'),
	useref      = require('gulp-useref'),		//html
	gulpif 		= require('gulp-if')
	;

//----------------------server--------------------------//
gulp.task('server', function(){
	browserSync({
		port: 9000,
		server: {
			baseDir: 'app'
		}
	});
});
//----------------------watch--------------------------//
gulp.task('watch', function() {
	gulp.watch('app/scss/**/*.scss',['sass']);
	gulp.watch([
		'app/*.html',
		'app/js/**/*.js',
		'app/css/**/*.css'
		]).on('change', reload);
});
//>>>-------------default------------------------------//
gulp.task('default', ['server', 'watch']);
//-------------------CSS----------------------------//
//собираем в dist минимизируем в prod
gulp.task('css', function () {
  return gulp.src('app/css/**/*.css')
    .pipe(concatCss("fullstyle.css")) 
    .pipe(gulp.dest('dist/'))
    .pipe(minifyCss())
    .pipe(rename("fullstyle-min.css"))
    .pipe(gulp.dest('prod/'));
});
//-------------------JS----------------------------//
//собираем в dist минимизируем в prod
gulp.task('js', function () {
  return gulp.src('app/js/**/*.js')
    .pipe(gulp.dest('dist/'))
    .pipe(uglify())
    .pipe(rename("fulljs-min.js"))
    .pipe(gulp.dest('prod/'));
});
//-------------------HTML----------------------------//
//link в html и копируем в dist и prod
  // gulp.task('useref', function () {
  //   return gulp.src('app/*.html')
  //     .pipe(useref())
  //     .pipe(gulp.dest('dist'))
  //     .pipe(gulp.dest('prod'));
  // });

// Переносим HTML, CSS, JS в папку dist 
// gulp.task('useref', function () {
//   var assets = useref.assets();
//   return gulp.src('dist/*.html')
//     .pipe(assets)
//     .pipe(gulpif('*.js', uglify()))
//     .pipe(gulpif('*.css', minifyCss({compatibility: 'ie8'})))
//     .pipe(assets.restore())
//     .pipe(useref())
//     .pipe(gulp.dest('prod'));
// });

gulp.task('sass', function() {
  return gulp.src('app/scss/*.scss')
    .pipe(sass({
      noCache: true,
      style: "expanded",
      lineNumbers: true
    }))
    .pipe(gulp.dest('app/css'))
    .pipe(reload({stream: true})); 
});

//-------------------FONTS----------------------------//
//Переносим шрифты
gulp.task('fonts', function() {
	gulp.src('app/fonts/*')
	.pipe(filter(['*.eot','*.svg','*.ttf','*.woff','*.woff2']))
	.pipe(gulp.dest('dist/fonts/'))
	.pipe(gulp.dest('prod/fonts/'))
});
//-----------------------IMAGES-------------------------//
//Копируем в dist. Из dist минимизируем в prod
gulp.task('images', function () {
	return gulp.src('app/img/**/*')
	.pipe(gulp.dest('dist/img'))
	.pipe(imagemin({
	progressive: true,
	interlaced: true
		}))
	.pipe(gulp.dest('prod/img'));
});
//---------------OTHER---------------------------------//
//копируем в dist и prod
gulp.task('extras', function () {
	return gulp.src([
	'app/*.*',
	'!app/*.html'
	])
	.pipe(gulp.dest('dist'))
	.pipe(gulp.dest('prod'));
});
