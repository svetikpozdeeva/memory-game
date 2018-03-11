import Vue from 'vue'
import template from './index.pug'


(() => {
	Vue.component('Game', {
	  	template: template(),
	  	props: ['cards'],
	  	data() {
	  		return {
	  			sound: new Audio('/sounds/click.mp3'),
	  			cardsLength: 9,
	  			backCardImage: '/img/back.png',
	  			backSide: false,
	  			cardsGame: [],
	  			openedCards: [],
	  			openedPairs: 0,
	  			notOpenedPairs: 9,
	  			totalPoints: 0,
	  		}
	  	},
	  	methods: {
	  		rollCard(card) {
	  			if (this.backSide && !card.isVisible && this.openedCards.length < 2) {
	  				card.isVisible = true
	  				this.openedCards.push(card)
					this.sound.play()
	  			}
	  		},
	  		createCardsGame() {
	  			let cardsArr = []
	  			let randomValues = []
	  			let randomCard

	  			for(let i = 0; i < this.cardsLength; i++) {
	  				do {
	  					randomCard = Math.floor(Math.random() * (53 - 1) + 1)
	  				} while(randomValues.find((item) => {
	  					return item === randomCard
	  				}))

	  				randomValues.push(randomCard)
	  				
	  				this.cards.forEach(item => {
	  					if (item.number === randomCard) {
	  						cardsArr.push(item)
	  					}
	  				})
	  			}

	  			let cardsArrDuplicate = []

	  			cardsArr.forEach(item => {
	  				const card = { ...item }
	  				const cardCopy = { ...item }
	  				cardsArrDuplicate.push(card, cardCopy)
	  			})

				cardsArrDuplicate.sort((a, b) => {
					return Math.random() - 0.5
				})

				cardsArrDuplicate.forEach((item, index) => {
					item.id = index
				})

	  			this.cardsGame = cardsArrDuplicate
	   		},
	   		startGame() {
	   			this.createCardsGame()
	  			this.totalPoints = 0
	  			this.openedCards = []
	  			this.openedPairs = 0
	  			this.notOpenedPairs =9
	  			this.backSide = false
	  			setTimeout(() => {
	  				this.backSide = true
	  			}, 5000)
	   		}
	  	},
	  	created() {
			this.startGame()
	  	},
	  	watch: {
		    openedCards(cards, cardsOld) {
		      	if (cards.length === 2) {
	  				setTimeout(() => {
						if (cards[0].id !== cards[1].id && cards[0].number === cards[1].number) {
		  					cards.forEach(item => item.hidden = true)
		  					this.openedPairs += 1 
		  					this.notOpenedPairs -= 1
		  					this.totalPoints += this.notOpenedPairs * 42 
		  					this.$emit('calculatePoints', this.totalPoints)
		  				} else {
		  					cards.forEach(item => item.isVisible = false)
		  					this.totalPoints -= this.openedPairs * 42
		  					this.$emit('calculatePoints', this.totalPoints)
		  				}
		  				this.openedCards = []
	  				}, 1000)
	  			}
		    },
		    notOpenedPairs(pairs) {
		    	if (pairs === 0) {
		    		this.$emit('changeStatus', 'end')
		    	}
		    }
	  	},
	})
})()
