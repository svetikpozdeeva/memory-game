import Vue from 'vue'
import template from './index.pug'

(() => {
	Vue.component('StartGame', {
	  	template: template(),
	  	methods: {
	  		startGame() {
	  			this.$emit('changeStatus', 'game')
	  		}
	  	}
	})
})()

