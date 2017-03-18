/*****
/** LOAD PLUGINS **/
/*****************/
var gulp = require('gulp'),
    gutil = require('gulp-util'),
	jshint = require('gulp-jshint'),
	stylish = require('jshint-stylish'),
	minifycss = require('gulp-clean-css'),
	uglify = require('gulp-uglify'),
	chmod = require('gulp-chmod'),
	usemin = require('gulp-usemin'),
	imagemin = require('gulp-imagemin'),
	notify = require('gulp-notify'),
	cache = require('gulp-cache'),
	print = require('gulp-print'),
	rev = require('gulp-rev'),
	del = require('del'),
    ngannotate = require('gulp-ng-annotate');


var bases = {
	dev:	'resources/',
	dist:	'public/'
};

var paths = {
	scripts:	['js/**/*.js'],
	html:		['index.html'],
	extras:		['favicon.ico'],
	libs:		['vendor/**/*'],
	views:		['views/**/*']
};

/*****
/** CONFIGURE TASKS **/
/********************/

// JSHint
gulp.task('jshint', function() {
    return gulp.src(paths.scripts, {cwd: bases.dev})
                .pipe(jshint())
				.pipe(print())
                .pipe(jshint.reporter(stylish));
});

// Usemin
gulp.task('usemin', ['jshint'], function() {
	return gulp.src(paths.html, {cwd: bases.dev})
                .pipe(usemin({
                    css: [minifycss(),rev()],
                    //js: [ngannotate(),uglify(),rev()]
                }))
				.pipe(print())
				.pipe(chmod(755))
                .pipe(gulp.dest(bases.dist))
        .on('end', function(){ gutil.log('UseMin Done!'); });
});

// ImageMin
gulp.task('imagemin', function() {
    return gulp.src('resources/img/**/*')
            .pipe(cache(imagemin({optimizationLevel: 3, progressive: true, interlaced: true})))
			.pipe(chmod(755))
            .pipe(gulp.dest('public/img'))
            .pipe(notify({message: 'Images task complete'}));
});

// Clean
gulp.task('clean', function() {
    return del([bases.dist]);
});

// Copy
gulp.task('copy', function() {

	// copy views
    gulp.src(paths.views, {cwd: 'resources/**'})
	.pipe(chmod(755))
    .pipe(gulp.dest(bases.dist));

    // copy libraries
    gulp.src(paths.libs, {cwd: 'resources/**'})
        .pipe(chmod(755))
        .pipe(gulp.dest(bases.dist));

    // copy extras
    gulp.src(paths.extras, {cwd: 'resources/**'})
        .pipe(chmod(755))
        .pipe(gulp.dest(bases.dist));
});

// Watch
gulp.task('watch', function() {
    gulp.watch('resources/**/*',['default']);
});

// Default task
gulp.task('default', ['clean'], function() {
    gulp.start('usemin', 'imagemin', 'copy', 'watch');
});



