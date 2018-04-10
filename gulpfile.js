var gulp = require("gulp"),
    less = require("gulp-less"),
    browserSync = require("browser-sync").create(),
    useref = require("gulp-useref"),
    uglify = require("gulp-uglify"),
    gulpIf = require("gulp-if"),
    cssnano = require('gulp-cssnano'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    del = require('del'),
    runSequence = require('run-sequence');


/*gulp-less*/
gulp.task('less', () => {
    return gulp.src('./src/css/*.less')
        .pipe(less())
        .pipe(gulp.dest('./dist/css'));
});

/*images*/
gulp.task('images', function () {
    return gulp.src('./src/img/**/*.+(png|jpg|jpeg|gif|svg)')
        .pipe(cache(imagemin({
            interlaced: true
        })))
        .pipe(gulp.dest('./dist/img'))
});

/*fonts*/
gulp.task('fonts', function() {
    return gulp.src('./src/fonts/**/*')
        .pipe(gulp.dest('./dist/fonts'))
});

/*browserSync*/
gulp.task('browserSync', () => {
    browserSync.init({
        server: {
            baseDir: './src/app/'
        }
    })
});

gulp.task('useref', () => {
    return gulp.src('./src/**/*.html', {base: 'src'})
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('./dist'))
});


/*clean:dist*/
gulp.task('clean:dist', function() {
    return del.sync('dist');
});


/*watch*/
gulp.task('watch', ['browserSync'], () => {
    gulp.watch('./src/css/*.less', browserSync.reload);
    gulp.watch('./src/app/*.html', browserSync.reload);
    gulp.watch('./src/js/*.js', browserSync.reload);
});

/*dev*/
gulp.task('default', ['browserSync', 'watch']);

/*prod*/
gulp.task('prod', function () {
    runSequence('clean:dist',
        ['less', 'images', 'useref']
    )
});