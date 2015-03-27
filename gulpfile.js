var gulp = require('gulp');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var gulpConcat = require('gulp-concat');
var shell = require('gulp-shell');
var stylish = require('jshint-stylish');
var autoprefixer = require('gulp-autoprefixer');
var rimraf = require('gulp-rimraf');
var CacheBuster = require('gulp-cachebust');
var htmlreplace = require('gulp-html-replace');
var gutil = require('gulp-util');
var gulpif = require('gulp-if');
var mocha = require('gulp-mocha');
var runSequence = require('run-sequence');
var server = require( 'gulp-develop-server' );
var livereload = require('gulp-livereload');
var path = require('path');
var fs = require('fs');
var cachebust = new CacheBuster();
var rename = require('gulp-rename');


var paths = {
    node_files: ['bower.json', 'FreeAgent_server.js', 'package.json', '.bowerrc', 
        'Configs/**',
        'Data/**',         
        'Services/**',
        'Controllers/**',
        'node_modules/**', 
        'Utils/**'],
    dist: './dist',
    js: ['Views/js/**',
        '!Views/js/_build.js',
        '!Views/js/config/**',
        '!Views/js/lib/**'],
    js_dist: 'dist/Views/js/',
    js_dist_file: '_build.js',
    js_dist_relative: './Views/js',
    js_hint: ['**/*.js',
        '!Views/js/_build.js',
        '!Views/js/config/**',
        '!node_modules/**',
        '!dist/**',
        '!Views/bower_components/**',
        '!Views/js/lib/**'],
    scss: ['Views/scss/**'],
    sass_include: [
        /*
            The line below is a hack to work around this issue: https://github.com/dlmanning/gulp-sass/issues/124
            There is an issue with gulp-sass that causes an error whenever you specify includePaths. When the
            issue is fixed the line below can be removed.
        */

        /*'views/Views/scss/foundation/components/**'*/],
    css: 'Views/css',
    css_dist: 'dist/Views/css',
    css_dist_relative: '/css',
    css_dist_file: '_build.css',
    js_lib: [
        '/Views/js/lib/**'
    ],
    js_lib_dist_dir: 'dist/Views/js/lib',
    img: ['Views/img/**'],
    img_dist: 'dist/Views/img',
    partials: 'views/partials/**',
    partials_dist: 'dist/views/partials',
    templates: 'views/templates/**',
    templates_dist: 'dist/views/templates',
    indexhtml: '*.html',
    indexhtml_dist: 'dist',
    config: 'Views/js/configs/',
    config_dist: 'dist/Views/js/configs/',
    unit_tests: 'unit_tests/*.js'
};

var cacheBreak = false;
var concatFiles = false;
var fullBuild = false;
var reload = false;
var configType = 'local';

if (gutil.env.dev === true || process.env.NODE_ENV === 'dev') {
    console.log('***DEV BUILD***');
    configType = 'dev';
}

if (gutil.env.qa === true) {
    console.log('***QA BUILD***');
    cacheBreak = true;
    concatFiles = true;
    fullBuild = true;
    configType = 'qa';
}

gulp.task('config', function () {
    console.log(paths.config + configType + '.config.js');
    return gulp.src(paths.config + configType + '.config.js')
        .pipe(rename('config.js'))
        .pipe(gulpif(cacheBreak, cachebust.resources()))
        .pipe(gulp.dest(paths.config_dist));
});


gulp.task('node', function() {
    return gulp.src(paths.node_files, 
            { base: './'}) // base needed to preserve directory structure
        .pipe(gulp.dest(paths.dist));
});

gulp.task('js', ['img', 'jshint', 'htmlpartials', 'htmltemplates'], function(val) {
    return gulp.src(paths.js)
        .pipe(gulpif(concatFiles, gulpConcat(paths.js_dist_file)))
        //.pipe(uglify())  // this seems breaking our code, sadface
        .pipe(gulpif(cacheBreak, cachebust.resources()))
        .pipe(gulpif(cacheBreak, cachebust.references()))
        .pipe(gulp.dest(paths.js_dist));
});
gulp.task('jshint', function(val) {
    return gulp.src(paths.js_hint)
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

gulp.task('css', ['img'], function() {
    return gulp.src(paths.scss)
        .pipe(sass())
        //.pipe(sass({includePaths: paths.sass_include}))
        .pipe(autoprefixer())
        .pipe(gulpif(concatFiles, gulpConcat('_build.css')))
        .pipe(gulpif(cacheBreak, cachebust.resources()))
        .pipe(gulpif(cacheBreak, cachebust.references()))
        .pipe(gulp.dest(paths.css_dist));      
});

gulp.task('js_lib', function(){
    gulp.src(paths.js_lib)
         .pipe(gulp.dest(paths.js_lib_dist_dir));
});

gulp.task('mocha', function () {
    return gulp.src(paths.unit_tests, {read: false})
        .pipe(mocha({reporter: 'dot'}));
});

gulp.task('img', function() {
    return gulp.src(paths.img)
        .pipe(gulpif(cacheBreak, cachebust.resources()))
        .pipe(gulpif(fullBuild, gulp.dest(paths.img_dist)));
});


gulp.task('htmlpartials', ['img'], function() {
    return gulp.src(paths.partials)
        .pipe(gulpif(cacheBreak, cachebust.resources()))
        .pipe(gulpif(cacheBreak, cachebust.references()))
        .pipe(gulp.dest(paths.partials_dist));
});

gulp.task('htmltemplates', ['img'], function() {
    return gulp.src(paths.templates)
        .pipe(gulpif(cacheBreak, cachebust.resources()))
        .pipe(gulpif(cacheBreak, cachebust.references()))
        .pipe(gulp.dest(paths.templates_dist));
});

gulp.task('html', ['config', 'js', 'css', 'js_lib'], function() {
    return gulp.src(paths.indexhtml)
        .pipe(gulpif(concatFiles,
            htmlreplace({
                'css': paths.css_dist_relative + '/' + paths.css_dist_file,
                'js': paths.js_dist_relative + '/'+ paths.js_dist_file
            })))     
        .pipe(gulpif(cacheBreak, cachebust.references()))
        .pipe(gulp.dest(paths.indexhtml_dist));

});
gulp.task('clean', function () {
    return gulp.src(paths.dist, { read: false })
        .pipe(rimraf());
});

/* server set up type tasks */
gulp.task('start_server', function(){    
    //start the dist server
    var options ={
        path: 'dist/FreeAgent_server.js',
        env: {NODE_ENV: 'local'},
        SYNC: false,
        FORCE: false
    } ;
    server.listen(options);    
});

gulp.task('dev_depend', shell.task(['sh ./scripts/startServices.sh']));

gulp.task('start_server_reset_db', function(){    
    //start the dist server
    var options ={
        path: 'dist/FreeAgent_server.js',
        env: { 
            NODE_ENV: 'local',
            SYNC: true,
            FORCE: true
        },
    };
    server.listen(options);    
});

gulp.task('livereload', function() {
  reload = true;
    var options = {
        auto: true
    };
    livereload.listen(9003, options);
});
gulp.task('cssRefresh', ['css'], function(){
    return gulp.src(paths.css_dist)
        .pipe(livereload(9003, {auto: false}));
});
gulp.task('jsRefresh', ['js'], function(){
    return gulp.src(paths.js_dist)
        .pipe(livereload(9003, {auto: false}));
});
gulp.task('partialsRefresh', ['htmlpartials'], function(){
    return gulp.src(paths.partials_dist)
        .pipe(livereload(9003, {auto: false}));
});
gulp.task('indexhtmlRefresh', ['indexhtml'], function(){
    return gulp.src(paths.indexhtml)
        .pipe(livereload(9003, {auto: false}));
});

function refresh(event){
    var filename = event.path.replace(/^.*[\\\/]/, '');
    console.log(filename + ' was changed. Reloading...');
    //livereload.changed(paths.css_dist+'/' + filename, 9003);
}
gulp.task('watch', function() {
    gulp.watch(paths.scss, ['cssRefresh']).on('change', refresh);
    gulp.watch(paths.js, ['jsRefresh']).on('change', refresh);
    gulp.watch(paths.partials, ['partialsRefresh']).on('change', refresh);
    gulp.watch(paths.indexhtml, ['indexhtmlRefresh']).on('change', refresh);
});



gulp.task('development', function(callback) {
  runSequence('dev_depend',
              'mocha', 
             ['node','html'],
              'livereload',
              'start_server',
              'watch',
              callback);
});

gulp.task('build', function(callback) {
  runSequence(['node','html'],
            'mocha',
            callback);
});

gulp.task('fullBuild', function(callback) {
    fullBuild = true;
    runSequence(['build'],
              callback);
});

//Starts server and tells node to perform DB migrations
gulp.task('resetDB', function(callback) {
    runSequence(['node','html'],
              'livereload',
              'start_server_reset_db',
              'watch',
              callback);
});


gulp.task('default', function(callback) {
  runSequence(['build'],//, 'watch'
              'start_server',
              callback);
});
