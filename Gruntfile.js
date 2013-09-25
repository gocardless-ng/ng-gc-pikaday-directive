'use strict';

var BROWSERS = [
  'PhantomJS',
  'Opera',
  'Firefox',
  'Chrome',
  'ChromeCanary',
  'Safari'
];

module.exports = function(grunt) {
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        './src/*.js'
      ]
    },
    karma: {
      options: {
        configFile: 'karma.conf.js'
      },
      watch: {
        options: {
          autoWatch: true,
          singleRun: false
        }
      },
      ci: {
        options: {
          browsers: ['Firefox', 'Chrome']
        }
      },
      unit: {
        options: {
          browsers: BROWSERS
        }
      },
      coverage: {
        options: {
          reporters: ['coverage'],
        }
      }
    }
  });

  grunt.registerTask('test', [
    'jshint',
    'karma:unit'
  ]);

  grunt.registerTask('citest', [
    'jshint',
    'karma:ci'
  ]);
};
