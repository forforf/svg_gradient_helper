module.exports = function(grunt) {
  grunt.initConfig({
    jasmine : {
      // Your project's source files
       src : 'src/**/*.js',
      // Your Jasmine spec files
      options: {
        specs : 'spec/**/*spec.js',
        // Your spec helper files
        helpers : 'spec/SpecHelper.js',
        vendor: 'vendor/*.js'
      }
    }
  });

  // Register tasks.
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  // Default task.
  grunt.registerTask('default', ['jasmine']);
};
