var gulp = require("gulp");
var browserSync = require('browser-sync').create();
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var sourcemaps = require("gulp-sourcemaps");


gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("./scss/**/*.scss", ['sass']);
    gulp.watch("./*.html").on('change', browserSync.reload);
});


gulp.task("sass",function(){
    return gulp.src("./scss/*.scss")
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({
            errorLogToConsole: true,
            outputStyle: "expanded"
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("css"))
        .pipe(browserSync.stream());
});


//gulp.task("watch",function(){
//    gulp.watch("scss/**/*.scss",["sass"]);
//});

gulp.task('default', ['serve']);