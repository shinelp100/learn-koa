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
    runSequence = require('run-sequence'),
    webpack = require('webpack'),
    webpackStream = require('webpack-stream'),
    vinylNamed = require('vinyl-named'),
    path = require('path'),
    config = require('./webpack.config.js'),
    htmlmin = require('gulp-htmlmin'),
    // 其中rev()用于给文件名扩展名前增加一个md5后缀
    rev = require('gulp-rev'),
    replace = require('gulp-rev-replace'),
    // 防止因为编译失败而退出
    plumber = require('gulp-plumber');




/****************************dev build***************************/
gulp.task('less-watch', () => {
    return gulp.src('./source/**/*.less', {base: 'source'})
        .pipe(less())
        .pipe(plumber())
        .pipe(gulp.dest('./src'))
});

gulp.task('webpack-watch', () => {
    return gulp.src('./source/js/**/*.js', {base: 'src'})
    // 使用webpack配置文件，详细见下
        .pipe(vinylNamed((file) => {
            var dir = path.dirname(file.path);
            // 替换掉 source 目录路径
            dir = dir.replace(/^.*source(\\|\/)/, '');
            console.log(path.join(dir, path.basename(file.path, path.extname(file.path))));
            // 将文件路径及 basename 作为 name
            return path.join(dir, path.basename(file.path, path.extname(file.path)));
        }))
        .pipe(plumber())
        .pipe(webpackStream(config))
        .pipe(gulp.dest('./src'))
});


/*watch*/
gulp.task('watch', ['browserSync'], () => {
    gulp.watch('./source/**/*.less',['less-watch',browserSync.reload]);
    gulp.watch('./src/**/*.html', browserSync.reload);
    gulp.watch('./source/**/*.js',['webpack-watch', browserSync.reload]);
});

/*dev*/
gulp.task('default', ['browserSync', 'watch', 'less-watch', 'webpack-watch']);




/********************prod build**************************/


/*压缩html*/
gulp.task('html', () => {
    var manifest = gulp.src('dist/manifest/img/rev-manifest.json');
    return gulp.src('./src/**/*.html', {base: 'src'})
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(replace({manifest: manifest}))
        .pipe(gulp.dest('./dist'))
});
/*替换html中的文件路径*/
gulp.task("htmlrevreplace", function () {
    var manifest = gulp.src("./dist/manifest/**/rev-manifest.json");
    return gulp.src('./dist/app/*.html')
        .pipe(replace({manifest: manifest}))
        .pipe(gulp.dest('./dist/app'));
});

/*gulp-less*/
gulp.task('less', ['images'], () => {
    var manifest = gulp.src('dist/manifest/img/rev-manifest.json');
    return gulp.src('./src/**/*.css', {base: 'src'})
        .pipe(rev())
        .pipe(less())
        .pipe(plumber())
        // prefix: prefix
        .pipe(replace({manifest: manifest}))
        .pipe(cssnano())
        .pipe(gulp.dest('./dist'))
        // 生成css文件路径映射
        .pipe(rev.manifest())
        .pipe(gulp.dest('dist/manifest/css'));
});

/*images*/
gulp.task('images', function () {
    return gulp.src('./src/**/*.+(png|jpg|jpeg|gif|svg)')
        .pipe(cache(imagemin({
            interlaced: true
        })))
        /*放在下面避免读取cache时不生成manifest文件*/
        .pipe(rev())
        .pipe(gulp.dest('./dist'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('dist/manifest/img'));
});

/*压缩js*/
gulp.task('webpack', () => {
    return gulp.src(['./src/js/**/*.js','./src/libs/**/*.js'], {base: 'src'})
    // 使用webpack配置文件，详细见下
    //     .pipe(vinylNamed((file) => {
    //         var dir = path.dirname(file.path);
    //         // 替换掉 public 目录路径
    //         dir = dir.replace(/^.*src(\\|\/)/, '');
    //         console.log(path.join(dir, path.basename(file.path, path.extname(file.path))));
    //         // 将文件路径及 basename 作为 name
    //         return path.join(dir, path.basename(file.path, path.extname(file.path)));
    //     }))
    //     .pipe(plumber())
    //     .pipe(webpackStream(config))
        .pipe(rev())
        .pipe(uglify())
        .pipe(gulp.dest('./dist'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('dist/manifest/js'));
});

/*fonts*/
// gulp.task('fonts', function () {
//     return gulp.src('./src/fonts/**/*')
//         .pipe(gulp.dest('./dist/fonts'))
// });

/*browserSync*/
gulp.task('browserSync', () => {
    browserSync.init({
        port: 8087,
        // proxy: '127.0.0.1:5000',
        server: {
            baseDir: './'
        }
    })
});

/*clean:dist*/
gulp.task('clean:dist', function () {
    return del.sync('dist');
});

/*prod*/
gulp.task('prod', function () {
    runSequence('clean:dist',
        ['html', 'less', 'images', 'webpack'],
        'htmlrevreplace'
    )
});
