var gulp = require("gulp");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var sass = require("gulp-sass");
var cssmin = require("gulp-clean-css");
var imagemin = require("gulp-imagemin");
var pngquant = require("imagemin-pngquant");
var newer = require("gulp-newer");
var concat = require("gulp-concat");

gulp.task("scripts", function(){
	return gulp.src("static_src/script/*.js")
	.pipe(concat('app.js'))
	.pipe(uglify())
	.pipe(rename({extname: ".min.js"}))
	.pipe(gulp.dest("static/script"));
});

gulp.task("libs", function(){
	return gulp.src("static_src/script/lib/*")
	.pipe(gulp.dest("static/script"));
});

gulp.task("sass", function(){
	return gulp.src("static_src/**/*.scss")
	.pipe(sass().on('error', sass.logError))
	.pipe(cssmin({compatibility: "ie7", restructuring: false}))
	.pipe(rename({extname: ".min.css"}))
	.pipe(gulp.dest("static"));
});

gulp.task("styles", function(){
	return gulp.src("static_src/*.css")
	.pipe(cssmin({compatibility: "ie7", restructuring: false}))
	.pipe(rename({extname: ".min.css"}))
	.pipe(gulp.dest("static"));
});

gulp.task("images", function(){
    return gulp.src("static_src/images/**/*")
    .pipe(newer("static/images"))
	.pipe(imagemin({
		progressive: true,
		use: [pngquant({ quality: '65-80', speed: 4 })]
	}))
	.pipe(gulp.dest("static/images"));
});

gulp.task("watch", function(){
	gulp.watch("static_src/script/*.js", ["scripts"]);
	gulp.watch("static_src/script/lib/*", ["libs"]);
	gulp.watch("static_src/*.css", ["styles"]);
	gulp.watch("static_src/images/**/*", ["images"]);
});

gulp.task("default", ["scripts", "libs", "sass", "styles", "images"]);
