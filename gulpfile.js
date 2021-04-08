var gulp = require('gulp');
var bs = require('browser-sync').create();
var sass = require('gulp-sass');
var pump = require('pump');
var wait = require('gulp-wait');

gulp.task('default', function(){
    
    bs.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("src/scss/**/*.scss", gulp.series('sass'));
    gulp.watch("*.js").on('change', bs.reload);
    gulp.watch("**/*.html").on('change', bs.reload);

});

gulp.task('sass', function(){
    pump([
        gulp.src('src/scss/style.scss'),
        wait(3000),
        sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError),
        gulp.dest('dist/css'),
    ])
});