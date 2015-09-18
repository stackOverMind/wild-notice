var gulp = require('gulp');

var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var del = require('del')
var concat = require('gulp-concat');
gulp.task('css', function () {
    gulp.src(['bower_components/bootstrap/dist/css/bootstrap.css','bower_components/bootstrap-material-design/dist/css/material.css'])
    	.pipe(concat('wild-notice.min.css'))
        .pipe(cssmin())
        .pipe(gulp.dest('dist'));
});
gulp.task('compress', function() {
  	return gulp.src('index.js')
    	.pipe(uglify())
    	.pipe(rename('wild-notice.min.js'))
    	.pipe(gulp.dest('dist'))
});
gulp.task('html',function(){
	return gulp.src('test.html')
  		.pipe(gulp.dest('dist'));

})
gulp.task('clean', function(cb) {
  del(['dist'], cb);
});


gulp.task('default', ['clean', 'css', 'compress','html']);