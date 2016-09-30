module.exports = function(grunt) {
	grunt.initConfig({
		
		pkg: grunt.file.readJSON('package.json'),
		
		// Permission problem try to exec command "npm cache clean"
		watch: {
            //less: {
            //    files: [
			//		'src/less//{,*/}*.less',
			//		'/{,*/}*.js'
			//	],
            //  tasks: [
			//		'clean',
			//		'less'
			//	]
            //}
        },
		
		clean: {
			clean: [
				"dist"
			]
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
						'dist/jscow/jscow.js': [
							'dist/jscow/jscow.min.js'
						]
					}
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
				dest: 'dist/jscow/jscow.js'
			}
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

		yuidoc: {
			compile: {
				name: '<%= pkg.name %>',
				description: '<%= pkg.description %>',
				version: '<%= pkg.version %>',
				url: '<%= pkg.homepage %>',
				options: {
					paths: 'src/jscow/',
					outdir: 'dist/docs/'
				}
			}
		},

		browserify: {
			dist: {
				files: {
					'dist/jscow/jscow.module.js': [
						'dist/jscow/jscow.js'
					]
				},
				options: {}
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
