var gulp = require('gulp'),
	less = require('gulp-less');
	pug = require('gulp-pug');
	browserSync = require('browser-sync');
	htmlbeautify = require('gulp-html-beautify');

gulp.task('less', function() {
	return gulp.src('app/less/main.less')
	.pipe(less())
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream());
});


gulp.task('pug', function(){
	return gulp.src('app/pug/pages/*.pug')
		.pipe(pug())
		.pipe(htmlbeautify(htmlbeautifyOptions))
		.pipe(gulp.dest('./app'))
		.pipe(browserSync.reload({stream: true}))
});

var htmlbeautifyOptions = {
	"indent_size": 1,
	"indent_char": "	",
	"eol": "\n",
	"indent_level": 0,
	"indent_with_tabs": true,
	"preserve_newlines": false,
	"max_preserve_newlines": 10,
	"jslint_happy": false,
	"space_after_anon_function": false,
	"brace_style": "collapse",
	"keep_array_indentation": false,
	"keep_function_indentation": false,
	"space_before_conditional": true,
	"break_chained_methods": false,
	"eval_code": false,
	"unescape_strings": false,
	"wrap_line_length": 0,
	"wrap_attributes": "auto",
	"wrap_attributes_indent_size": 4,
	"end_with_newline": false
};

gulp.task('browser-sync', function(){
	browserSync({
		server: {
			baseDir: 'app'
		}
	});
});

gulp.task('watch', function(){
	gulp.watch('app/less/**/*.less', gulp.parallel('less'));
	gulp.watch('app/pug/pages/*.pug', gulp.parallel('pug'));
});

gulp.task('default', gulp.parallel('watch', 'less', 'pug', 'browser-sync'));

