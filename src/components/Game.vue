<template>
	<div class="game-container">
		<button v-if="!gameStarted" v-on:click="displayQuestion">
			Start
		</button>
		<div v-if="gameStarted" class="quiz">
			<div v-if="!quitGame" class="header">
				<h1>Question {{ questionCounter }}</h1>
				<h3>Score: {{ score }}</h3>
			</div>
			<div v-if="!quitGame" class="main">
				<div class="box-flag">
					<img class="img-flag" v-bind:src="this.countryFlag" />
				</div>
				<div class="box-suggestion">
					<ul>
						<li
							v-for="(alternative, index) in alternatives"
							v-bind:key="index"
							v-on:click="checkAnswer(alternative)"
							:class="answerClass(alternative)"
						>
							{{ alternative }}
						</li>
					</ul>
				</div>
				<button v-on:click="quitGame = true">
					Quit / Show score
				</button>
			</div>
			<div v-if="quitGame" class="results">
				<h2>Your score:</h2>
				<p>Score: {{ score }}</p>
				<p>Questions: {{ questionCounter }}</p>
				<button v-on:click="resetRound">Play again?</button>
			</div>
		</div>
	</div>
</template>
<script>
import _ from 'lodash'
console.log('Game Value')
export default {
	name: 'Game',
	methods: {
		getAllCountries() {
			return new Promise((resolve, reject) => {
				fetch('https://restcountries.eu/rest/v2/all')
					.then((response) => {
						resolve(response.json())
					})
					.catch((err) => {
						console.log(err)
						console.error(reject)
					})
			})
		},
		getCountriesByRegion(region) {
			return new Promise((resolve, reject) => {
				fetch(`https://restcountries.eu/rest/v2/region/${region}`)
					.then((response) => {
						resolve(response.json())
					})
					.catch((err) => {
						console.log(err)
						console.error(reject)
					})
			})
		},
		async createQuestion() {
			if (this.countryListOriginal.length < 1) {
				this.countryListOriginal = await this.getAllCountries()
				this.countryListSplice = [...this.countryListOriginal]
			}
			let index = Math.floor(Math.random() * this.countryListSplice.length)

			this.correctIndexToSplice = this.countryListSplice[index]
			return this.countryListSplice[index]
		},

		resetRound() {
			this.questionCounter = 0
			this.gameStarted = true
			this.score = 0
			this.quitGame = false
			this.displayQuestion()
		},
		async displayQuestion() {
			this.answered = false
			this.questionCounter++
			this.gameStarted = true
			this.quitGame = false
			this.alternatives = []

			let country = await this.createQuestion()
			this.countryName = country.name
			this.countryFlag = country.flag
			this.alternatives.push(country.name)
			while (this.alternatives.length < 4) {
				let index = Math.floor(Math.random() * this.countryListOriginal.length)
				if (!this.alternatives.includes(this.countryListOriginal[index].name)) {
					this.alternatives.push(this.countryListOriginal[index].name)
				}
			}
			this.alternatives = _.shuffle(this.alternatives)
		},
		checkAnswer(alternative) {
			this.answered = true

			let selectedAnswer = alternative
			console.log(selectedAnswer)

			if (this.countryName === selectedAnswer) {
				this.countryListSplice.splice(this.correctIndexToSplice, 1)
				this.score++
			} else {
				console.log('Wrong answer')
			}
			setTimeout(this.displayQuestion, 1000)
		},

		answerClass(alternative) {
			let answerClass = ''
			if (alternative === this.countryName && this.answered) {
				answerClass = 'correct'
			} else if (this.answered) {
				answerClass = 'incorrect'
			}

			return answerClass
		},
	},
	data() {
		return {
			gameStarted: false,
			countryListOriginal: [],
			countryListSplice: [],
			countryName: '',
			countryFlag: '',
			alternatives: [],
			score: 0,
			questionCounter: 0,
			quitGame: false,
			answered: false,
			correctIndexToSplice: Number,
		}
	},
}
</script>
<style scoped>
h1 {
	font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
	font-size: 30px;
	color: #f7931e;
}
button {
	font-family: Arial, sans-serif;
	font-size: 16px;
	color: #f7931e;
	background-color: #3333ff;
}

.game-container {
	display: grid;
	/* border: 2px solid blue; */
}

.quiz {
	display: grid;
	/* border: 2px solid red; */
	width: 500px;
	height: 800px;
	margin: 0 auto;

	border: 1px solid rgb(243, 243, 243);
	box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}

.header {
	/* background-color: green; */
}

.results {
}

.main {
}

.box-flag {
}

.correct {
	background-color: green;
}

.incorrect {
	background-color: red;
}

.img-flag {
	width: 400px;
	height: 100%;
	max-height: 280px;
	/* margin: 15px; */

	border: 2px solid lightgray;
}

.box-suggestion {
	display: flex;
	/* flex-direction: column; */
	/* border: 2px solid green; */
	justify-content: center;
	/* width: 100%; */
}

ul {
	padding: 0;
}

li {
	cursor: pointer;
	list-style: none;
	width: 400px;
	border: 1px solid rgb(175, 175, 175);
	margin-bottom: 8px;
	border-radius: 5px;
	padding: 5px;
}
</style>
