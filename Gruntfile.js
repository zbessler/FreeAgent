module.exports = function(grunt) {
  console.log();
  console.log("    -----------------");
  console.log("Welcome to Spice Boys, home of the Spice Boys, how may I");
  console.log("take your Spiiiiiiice Boys?");
  console.log("    -----------------");
  console.log();
  grunt.initConfig({    
    
    pkg: grunt.file.readJSON('package.json'),
    
    sass: {
      files: {
        options: {
          outputStyle: 'compressed'
        },
        expand: true,
        cwd: 'scss/',
        src: '*.scss',
        dest: 'css/',
        ext: '.css'
      }  
    },

    uglify: {
      build: {
        options: {
          mangle: false,
          sourceMap: true,
        },
        files: {
          'js/wine.min.js': ['js/**.js', '!js/lib/**', '!js/wine.min.js', '!js/wine.min.map']
        }
      }
    },

    concat: {
      js: {
        src: ['js/**.js', '!js/lib/**', '!js/wine.min.js', '!js/wine.min.map'],
        dest: 'js/wine.min.js',
      },
    },

    jshint: {
      all: {
        src: ['**/**.js', '!js/lib/**', '!node_modules/**', '!bower_components/**', '!js/wine.min.js', '!js/wine.min.map']
      }
    },

    watch: {
      grunt: { 
        files: ['Gruntfile.js'] 
      },
      js: {
        files: ['**/**.js', '!node_modules/**', '!js/wine.min.js', '!js/wine.min.map'],
        tasks: ['jshint', 'concat']
      },
      sass: {
        files: 'scss/*.scss',
        tasks: ['sass']
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('build', ['sass', 'jshint', 'uglify']);
  grunt.registerTask('dev', ['sass', 'jshint', 'concat']);
  grunt.registerTask('default', ['watch']);
};