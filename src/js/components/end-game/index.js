import Vue from 'vue'
import template from './index.pug'

(() => {
	Vue.component('EndGame', {
	  	template: template(),
	  	props: ['points'],
	  	data() {
	  		return {
	  			audio: new Audio('/sounds/win.mp3')
	  		}
	  	},
	  	methods: {
	  		retryGame() {
	  			this.stopMusic()
	  			this.$emit('changeStatus', 'game')
  			},
  			playMusic() { 
	  			this.audio.play()
  			},
  			stopMusic() {
  				this.audio.pause()
				this.audio.currentTime = 0
  			}
	  	},
	  	created() {
	  		this.playMusic()
	  	}
	})
})()