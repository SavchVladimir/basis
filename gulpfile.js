var gulp 		= require("gulp"),
	browserSync = require('browser-sync'),
	reload 		= browserSync.reload;

gulp.task('server', function(){
	browserSync({
		port: 9000,
		server: {
			baseDir: 'app'
		}
	});
});

gulp.task('watch', function() {
	gulp.watch([
		'app/*.html',
		'app/js/**/*.js',
		'app/css/**/*.css'
		]).on('change', reload);
});

gulp.task('default', ['server', 'watch']);