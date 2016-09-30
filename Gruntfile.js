module.exports = function(grunt) {
	grunt.initConfig({
		
		pkg: grunt.file.readJSON('package.json'),
		
		// Permission problem try to exec command "npm cache clean"
		watch: {
			scripts: {
				files: ['src/**/*.js'],
				tasks: [
					'jshint',
					'clean',
					'concat',
					'uglify',
					'browserify',
					'yuidoc'
				]        
			},
		},

		clean: {
			clean: [
				"dist",
				"docs"
			]
		},

		jshint: {
			options: {
				curly: true,
				eqeqeq: true,
				eqnull: true,
				browser: true,
				maxparams: 4,
				notypeof: true,
				globals: {
					jQuery: true
				}
			},
			all: ['src/jscow/**/*.js']
		},

		copy: {
			main: {
				files: [
					//{
					//	expand: true, 
					//	cwd: 'src/components', 
					//	src: '**/*.js',
					//	dest: 'dist/jscow/components'
					//}
				]
			}
		},
		
		concat: {
			options: {
				separator: ';'
			},
			dist: {
				src: [
					'src/jscow/jscow.js', 
					'src/jscow/jscow.components.js', 
					'src/jscow/jscow.components.view.js', 
					'src/jscow/jscow.components.controller.js', 
					'src/jscow/jscow.events.js'
				],
				dest: 'dist/jscow.js'
			}
		},

		browserify: {
			dist: {
				files: {
					'dist/jscow.module.js': ['dist/jscow.js']
			    }
			}
		},
		
		uglify: {
			options: {
				mangle: {
					except:	['jQuery']
				}
			},
			my_target: {
				options: {
					mangle: false
				},
				files: [
					{
						'dist/jscow.min.js': [
							'dist/jscow.js'
						]
					}
				]
			}
		},

		yuidoc: {
			compile: {
				name: '<%= pkg.name %>',
				description: '<%= pkg.description %>',
				version: '<%= pkg.version %>',
				url: '<%= pkg.homepage %>',
				options: {
					paths: 'src/jscow/',
					outdir: 'docs/'
				}
			}
		}

	});
	
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-yuidoc');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-browserify');
	
	// Default task(s).
	grunt.registerTask('default', [
		'jshint',
		'clean',
		'concat',
		'uglify',
		'browserify',
		'yuidoc'
	]);

};
