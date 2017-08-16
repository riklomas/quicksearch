/*global module:false, require:false*/
var md = require('matchdep');

module.exports = function(grunt) {

	'use strict';
	
	var gruntfile = 'Gruntfile.js';
	var sources = ['src/<%= pkg.name %>.js'];
	
	md.filter('grunt-*').forEach(grunt.loadNpmTasks);
	
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		meta: {
			banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
			'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
			'<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
			'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author[0].name %> (<%= pkg.author[0].url %>);\n' +
			'* Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> http://deuxhuithuit.mit-license.org */\n'
		},
		concat: {
			options: {
				process: true,
				banner: '<%= meta.banner %>'
			},
			dist: {
				src: sources,
				dest: 'dist/<%= pkg.name %>.js'
			}
		},
		
		watch: {
			files: sources.concat(gruntfile),
			tasks: ['dev']
		},
		
		jshint: {
			files: sources.concat(gruntfile),
			options: {
				curly: true,
				eqeqeq: false, // allow ==
				immed: false, //
				latedef: false, // late definition
				newcap: false, // capitalize ctos
				nonew: true, // no new ..()
				noarg: true, 
				sub: true,
				undef: true,
				//boss: true,
				eqnull: true, // relax
				browser: true,
				regexp: true,
				strict: true,
				trailing: false,
				smarttabs: true,
				lastsemic: true,
				globals: {
					console: true,
					jQuery: true,
					pd: true,
					_: true,
					Popcorn: true,
					DEBUG: true,
					CSS3: true,
					JSON: true
				}
			}
		},
		uglify: {
			prod: {
				files: {
					'dist/<%= pkg.name %>.min.js': '<%= concat.dist.dest %>' 
				}
			},
			options: {
				banner: '<%= meta.banner %>',
				report: 'gzip',
				sourceMap: 'dist/<%= pkg.name %>.min.js.map',
				sourceMappingURL: '<%= pkg.name %>.min.js.map',
				sourceMapRoot: '../',
				mangle: true,
				compress: {
					global_defs: {
						DEBUG: false
					},
					dead_code: true,
					unused: true,
					warnings: true
				}
			}
		},
		
		complexity: {
			generic: {
				src: sources,
				options: {
					//jsLintXML: 'report.xml', // create XML JSLint-like report
					errorsOnly: false, // show only maintainability errors
					cyclomatic: 10, // 3
					halstead: 20, // 8
					maintainability: 95 //100
				}
			}
		}
	});
	
	// fix source map url
	grunt.registerTask('fix-source-map', 'Fix the wrong file path in the source map', function() {
		var sourceMapPath = grunt.template.process('<%= uglify.options.sourceMap %>');
		var sourceMapUrl = grunt.template.process('<%= uglify.options.sourceMappingURL %>');
		var diff = sourceMapPath.replace(sourceMapUrl, '');
		var sourceMap = grunt.file.readJSON(sourceMapPath);
		sourceMap.file = sourceMap.file.replace(diff, '');
		var newSources = [];
		sourceMap.sources.forEach(function (elem) {
			newSources.push(elem.replace(diff, ''));
		});
		sourceMap.sources = newSources;
		grunt.log.write(sourceMap.sources);
		grunt.file.write(sourceMapPath, JSON.stringify(sourceMap));
	});
	
	// Default tasks.
	grunt.registerTask('dev', ['jshint','complexity']);
	grunt.registerTask('build', ['concat','uglify','fix-source-map']);
	grunt.registerTask('default', ['dev','build']);
};