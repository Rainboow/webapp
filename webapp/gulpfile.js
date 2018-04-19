var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var open = require('open');

var app = {
    srcPath: 'src/',
    devPath: 'build/',//开发目录
    prdPath: 'dist/' //生产目录
};
//操作包文件
gulp.task('lib', function () {
    gulp.src('bower_components/**/*.js')
        .pipe(gulp.dest(app.devPath + 'vendor'))
        .pipe(gulp.dest(app.prdPath + 'vendor'))
        //通知浏览器自动刷新更改 低级浏览器不支持
        .pipe($.connect.reload());
});
//操作html文件
gulp.task('html', function () {
    gulp.src('src/**/*.html')
        .pipe(gulp.dest(app.devPath))
        .pipe(gulp.dest(app.prdPath))
        .pipe($.connect.reload());
});
//操作json文件
gulp.task('json', function () {
    gulp.src('src/**/*.json')
        .pipe(gulp.dest(app.devPath))
        .pipe(gulp.dest(app.prdPath))
        .pipe($.connect.reload());
});
//操作less(css)
gulp.task('less', function () {
    gulp.src('src/style/index.less')
        .pipe($.less())
        .pipe(gulp.dest(app.devPath + 'css'))
        .pipe($.cssmin())
        .pipe(gulp.dest(app.prdPath + 'css'))
        .pipe($.connect.reload());
});

//操作js
gulp.task('js', function () {
    gulp.src(app.srcPath + 'script/**/*.js')
        .pipe($.concat('index.js'))
        .pipe(gulp.dest(app.devPath + 'js'))
        .pipe($.uglify())
        .pipe(gulp.dest(app.prdPath + 'js'))
        .pipe($.connect.reload());
});
//操作图片
gulp.task('image', function () {
    gulp.src(app.srcPath + 'images/**/*')
        .pipe(gulp.dest(app.devPath + 'image'))
        .pipe($.imagemin())
        .pipe(gulp.dest(app.prdPath + 'image'))
        .pipe($.connect.reload());
});
//打包
gulp.task('build', ['image', 'js', 'less', 'lib', 'html', 'json']);

//清除目录
gulp.task('clean', function () {
    gulp.src([app.devPath, app.prdPath])
        .pipe($.clean());
});
//服务
gulp.task('serve', ['build'], function () {
    $.connect.server({
        //root代表从哪个路径下开始读取 这里是从开发目录下开始读取
        root: [app.devPath],
        //开启后自动刷新浏览器 IE8以下暂不支持
        livereload: true,
        //定义端口
        port: 1234,
    });
    //默认打开浏览器
    open('http://localhost:1234');
    //监控文件 自动构建代码
    gulp.watch('bower_components/**/*', ['lib']);
    //监控的是src下的文件
    gulp.watch('src/**/*.html', ['html']);
    gulp.watch('src/data/**/*.json', ['json']);
    gulp.watch('src/style/**/*.less', ['less']);
    gulp.watch('src/script/**/*.js', ['js']);
    gulp.watch('src/images/**/*', ['image']);
});
//默认执行serve
gulp.task('default', ['serve']);




















