import gulp from 'gulp'
import path from 'path'
import pug from 'gulp-pug'
import stylus from 'gulp-stylus'
import plumber from 'gulp-plumber'
import concat from 'gulp-concat'
import autoprefixer from 'gulp-autoprefixer'
import server from 'gulp-develop-server'
import util from 'gulp-util'
import webpackStream from 'webpack-stream'
import webpack from 'webpack'

import options from './webpack.config.babel.js'

gulp.task('default', ['dist', 'watch'], () => {
	server.listen({path: './server.js'}, () => {
		util.log(util.colors.blue.bold('Debug mode'))

	})
}) 

gulp.task('dist', ['js', 'assets', 'stylus'], () => {
	return gulp.src('./src/template/index.pug')
		.pipe(pug())
		.pipe(gulp.dest('dist'))
})

gulp.task('js', callback => {
	return gulp.src('./src/js/index.js')
	.pipe(plumber())
	.pipe(webpackStream(options, webpack))
	.pipe(gulp.dest('./dist/js'))
	.on('data', () => {
		if (!callback.called) {
			callback.called = true;
			callback();
		}
	})
})

gulp.task('assets', () => {
	return gulp.src('./src/assets/**/*')
		.pipe(gulp.dest('dist/'))
})

gulp.task('stylus', () => {
	return gulp.src('./src/stylus/index.styl')
	.pipe(plumber())
	.pipe(stylus())
	.pipe(autoprefixer({
		browsers: ['last 2 versions'],
		cascade: false
	}))
	.pipe(gulp.dest('./dist/css'))
})


gulp.task('watch', () => {
	gulp.watch('src/template/**/*', ['dist'])
	gulp.watch('src/assets/**/*', ['assets'])
	gulp.watch('src/**/*.styl', ['stylus'])
})