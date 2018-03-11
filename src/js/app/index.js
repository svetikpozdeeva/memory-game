import Vue from 'vue'
import template from './index.pug'
import '../components/start-game'
import '../components/game'
import '../components/end-game'
import cardsData from '../../../data/cards.json'


(() => {
	const app = new Vue({
		el: '#app', 
		template: template(),
		data() {
			return {
				gameStatus: 'start',
				cards: cardsData.cards,
				points: 0,
			}
		},
		methods: {
  			changeStatus(status) {
  				this.gameStatus = status
  			},
  			calculatePoints(points) {
  				this.points = points
  			}
  		}
	})
})()

