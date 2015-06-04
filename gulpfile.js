var gulp = require("gulp");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var cssmin = require("gulp-minify-css");
var imagemin = require("gulp-imagemin");

gulp.task("scripts", function(){
	return gulp.src("static_src/script/*.js")
	.pipe(uglify())
	.pipe(rename({extname: ".min.js"}))
	.pipe(gulp.dest("static/script"));
});

gulp.task("libs", function(){
	return gulp.src("static_src/script/lib/*")
	.pipe(gulp.dest("static/script"));
});

gulp.task("styles", function(){
	return gulp.src("static_src/*.css")
	.pipe(cssmin({compatibility: "ie7", restructuring: false}))
	.pipe(rename({extname: ".min.css"}))
	.pipe(gulp.dest("static"));
});

gulp.task("images", function(){
	return gulp.src("static_src/images/**/*")
	.pipe(imagemin({progressive: true}))
	.pipe(gulp.dest("static/images"));
});

gulp.task("watch", function(){
	gulp.watch("static_src/script/*.js", ["scripts"]);
	gulp.watch("static_src/script/lib/*", ["libs"]);
	gulp.watch("static_src/*.css", ["styles"]);
	gulp.watch("static_src/images/**/*", ["images"]);
});

gulp.task("default", ["scripts", "libs", "styles", "images"]);
