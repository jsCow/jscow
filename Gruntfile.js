module.exports = function(grunt) {
	grunt.initConfig({
		
		pkg: grunt.file.readJSON('package.json'),
		
		// Permission problem try to exec command "npm cache clean"
		watch: {
            less: {
                files: [
					'src/less//{,*/}*.less',
					'/{,*/}*.js'
				],
                tasks: [
					'clean',
					'less',
					'concat',
					'uglify'
					/*,
					'yuidoc'*/
				]
            }
        },
		
		clean: {
			clean: [
				"gen/production"
			]
		},
		
		less: {
			production: {
				options: {
					paths: ["src/less"],
					cleancss: true,
					modifyVars: {
						//imgPath: '"http://"'
					}
				},
				files: {
					"gen/production/css/theme.css": "src/less/theme.less"
				}
			}
		},
		
		copy: {
			main: {
				files: [
					{
						expand: true, 
						cwd: 'src/jscow/components', 
						src: '**/*.js',
						dest: 'gen/production/jscow/components'
					}
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
						expand: true,
						cwd: 'src/jscow/components',
						src: '**/*.js',
						dest: 'gen/production/jscow/components'
					},
					{
						'gen/production/jscow/jscow.min.js': ['gen/production/jscow/jscow.min.js']
					}
				]
			}
		},

		concat: {
			options: {
				separator: ';',
			},
			dist: {
				src: [
					'src/jscow/jscow.js', 
					'src/jscow/jscow.components.js', 
					'src/jscow/jscow.components.view.js', 
					'src/jscow/jscow.components.controller.js', 
					'src/jscow/jscow.events.js'
				],
				dest: 'gen/production/jscow/jscow.min.js'
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
					outdir: 'gen/production/docs/'
				}
			}
		}
		
	});
	
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-yuidoc');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	
	// Default task(s).
	grunt.registerTask('default', [
		'jshint',
		'clean',
		'less',
		'concat',
		'uglify'
	]);

	// Debug and Development task(s).
	grunt.registerTask('dev', [
		'jshint',
		'clean',
		'less',
		'copy',
		'concat'
	]);

	// All task(s).
	grunt.registerTask('all', [
		'jshint',
		'clean',
		'less',
		'copy',
		'concat',
		'yuidoc'
	]);

};
