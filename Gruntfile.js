module.exports = function(grunt) {
	grunt.initConfig({
		
		pkg: grunt.file.readJSON('package.json'),
		
		watch: {
            less: {
                files: ['src/theme/default/{,*/}*.less'],
                tasks: [
					'clean',
					'less',
					'copy',
					'uglify'
				]
            }
        },
		
		clean: {
			clean: ["prod"]
		},
		
		less: {
			development: {
				options: {
					paths: ["src/theme"]
				},
				files: {
					//"src/theme/default/jscow-theme-default.css": "src/theme/default/jscow-theme-default.less"
				}
			},
			production: {
				options: {
					paths: ["prod/theme"],
					cleancss: true,
					modifyVars: {
						//imgPath: '"http://"'
					}
				},
				files: {
					"prod/theme/default/jscow-theme-default-min.css": "src/theme/default/jscow-theme-default.less"
				}
			}
		},
		
		copy: {
			main: {
				files: [
					{expand: true, cwd: 'src/lib', src: ['**'], dest: 'prod/lib/'}
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
				files: [
					{
						expand: true,
						cwd: 'prod/lib/components',
						src: '**/*.js',
						dest: 'prod/lib/components'
					},
					{'prod/lib/jscow-components.min.js': ['prod/lib/components/*']}
				]
			}
		}
		
	});
	
	grunt.loadNpmTasks('grunt-contrib-clean');
	
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	
	grunt.loadNpmTasks('grunt-contrib-copy');
	//grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-compress');
	
	// Default task(s).
	grunt.registerTask('default', [ 
		'clean',
		'less',
		'copy',
		'uglify',
		'watch'
	]);
	
};
