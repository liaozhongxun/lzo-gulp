var gulp = require("gulp");
var sass = require("gulp-sass");
var csso = require("gulp-csso");
var plumber = require("gulp-plumber");
var csscomb = require("gulp-csscomb");
var htmlmin = require("gulp-htmlmin");
var autoprefixer = require("gulp-autoprefixer");
var preprocess = require("gulp-preprocess");
var browserSync = require("browser-sync").create();
var reload = browserSync.reload;

console.log(process.env.NODE_ENV); //scripts脚步设置的变量 安装 cross-env 兼容window

gulp.task("sass", function (done) {
    return gulp
        .src("sass/*.scss")
        .pipe(plumber())
        .pipe(sass.sync().on("error", sass.logError))
        .pipe(
            autoprefixer({
                browsers: [
                    ">1%",
                    "last 4 versions",
                    "Firefox ESR",
                    "not ie < 9", // React doesn't support IE8 anyway
                    "Android 2.3",
                    "Android >= 4",
                    "Chrome >= 20",
                    "Firefox >= 24", // Firefox 24 is the latest ESR
                    "Explorer >= 8",
                    "iOS >= 6",
                    "Opera >= 12",
                    "Safari >= 6",
                ],
                cascade: false,
            })
        )
        .pipe(csscomb())
        .pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError))
        .pipe(gulp.dest("css"))
        .on("end", function () {
            reload();
            done && done();
        });
});

gulp.task("watch", function (done) {
    browserSync.init({
        server: "./",
    });
    return gulp
        .watch(
            ["sass/*.scss", "*.html", "images/**/*", "js/**/*"],
            gulp.series("sass")
        )
        .on("end", function () {
            done && done();
        });
});

gulp.task("minify", function () {
    //压缩html到dist
    return gulp
        .src("*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("dist"));
});

// gulp.task('csso1', function () {
//     return gulp.src('css/*.css')
//         .pipe(csso())
//         .pipe(gulp.dest('out'));
// });

// gulp.task('csso2', function () {
//     return gulp.src('css/*.css')
//         .pipe(csso({
//             restructure: false,
//             sourceMap: true,
//             debug: true
//         }))
//         .pipe(gulp.dest('out'));
// });

gulp.task("getJquery", function (done) {
    return gulp
        .src("./node_modules/jquery/dist/jquery.min.js")
        .pipe(gulp.dest("js"))
        .on("end", function () {
            done && done();
        });
});

gulp.task("default", gulp.series("sass", "minify", "getJquery", "watch"));


/**
 * 流
 * 文件系统
 * 任务管理
 */