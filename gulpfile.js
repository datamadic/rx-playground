var gulp = require("gulp"), 
		to5 = require("gulp-6to5"),
		livereload = require('gulp-livereload');

gulp.task("default", function() {
    return gulp.src("src/app.js")
        .on('error',function(){
          console.log('err');
        })
        .pipe(to5({
        	includeRuntime: true
        }))
        .pipe(gulp.dest("dist"));
});

gulp.task('watch', function() {
	// livereload.listen({
	// 	port: 8081,
	// 	start: true,
	// 	host: 'localhost',
	// 	basePath: './'
	// })
  gulp.watch(['src/**/*.js'], ['default']);
});