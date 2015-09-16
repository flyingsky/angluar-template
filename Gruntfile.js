'use strict';

module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({

    concat: {
      client: {
        src: ['src/**/*.js'],
        dest: 'dist/app.js'
      }
    },

    uglify: {
      js: {
        files: {
          'dist/app.js' : ['dist/app.js']
        }
      }
    },

    watch: {
      options:{
        livereload: true
      },

      configFiles: {
        files: 'Gruntfile.js',
        options: {
          reload: true
        },
        task: ['default']
      },

      clientJs: {
        files: ['src/**/*.js'],
        tasks: ['concat:client']
      },

      clientAssets: {
        files: ['src/**/*.html', 'src/**/*.css'],
        tasks: ['compileAssets']
      },

//      compass: {
//        files: ['<%= config.app %>/styles/{,*/}*.{scss,sass}'],
//        tasks: ['compass:server']
//      }
    },

    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            'dist/*'
          ]
        }]
      },

      distzip: {
        src: '*.zip'
      }
    },

    copy: {
      clientAssets: {
        files: [{
          expand: true,
          cwd: 'src',
          src: ['**/*', '!**/*.js', '!index.html'],
          dest: 'dist'
        }]
      }
    },

    shell: {
      server: {
        command: 'http-server dist',
        options: {
          async: true
        }
      },
      killServer: {
        command: "kill $(ps aux | grep '[h]ttp-server dist' | awk '{print $2}')",
        options: {
          failOnError: false
        }
      }
    },

    replace: {
      index: {
        options: {
          patterns: [{
              match: 'livereloadScript',
              replacement: '<script src="//localhost:35729/livereload.js"></script>'  // default livereload port 35729
          }]
        },
        files: [
          {expand: true, flatten: true, src: ['src/index.html'], dest: 'dist/'}
        ]
      }
    }
  });

  grunt.registerTask('compileAssets', ['replace:index', 'copy:clientAssets']);

  grunt.registerTask('dist', ['clean', 'compileAssets', 'concat']);

  grunt.registerTask('server', ['dist', 'shell:killServer', 'shell:server', 'watch']);

  grunt.registerTask('default', ['server']);
};
