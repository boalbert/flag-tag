<template>
	<section class="game-container">
		<div class="select-game-region" v-if="!gameStarted">
			<button
				class="start-button button__all-countries"
				v-on:click="startGame('')"
			>
				<i class="fas fa-award"></i> All Countries
			</button>
			<button
				v-if="!challenge"
				class="start-button"
				v-on:click="startGame('Europe')"
			>
				Europe
			</button>
			<button
				v-if="!challenge"
				class="start-button"
				v-on:click="startGame('Americas')"
			>
				Americas
			</button>
			<button
				v-if="!challenge"
				class="start-button"
				v-on:click="startGame('Asia')"
			>
				Asia
			</button>
			<button
				v-if="!challenge"
				class="start-button"
				v-on:click="startGame('Africa')"
			>
				Africa
			</button>
			<button
				v-if="!challenge"
				class="start-button"
				v-on:click="startGame('Oceania')"
			>
				Oceania
			</button>
			<button
				v-if="!challenge"
				class="start-button button__random"
				v-on:click="startGame(randomRegion())"
			>
				<i class="fas fa-random"></i> RANDOM
			</button>
		</div>

		<section v-if="gameStarted" class="quiz">
			<header v-if="!quitGame">
				<h1>Question {{ questionCounter }}</h1>

				<h2>Correct flags: {{ correctAnswer }}</h2>
			</header>
			<main v-if="!quitGame">
				<div class="box-flag">
					<p class="timer">({{ formattedElapsedTime }})</p>
					<img class="img-flag" v-bind:src="this.countryFlag" />
				</div>
				<div class="box-suggestion">
					<ul v-for="(alternative, index) in alternatives" v-bind:key="index">
						<li
							:class="answerClass(alternative)"
							v-on:click="checkAnswer(alternative)"
						>
							{{ alternative }}
						</li>
					</ul>
				</div>
				<button class="button--quit" v-on:click="quitShowScore">
					END GAME
				</button>
			</main>
			<div v-if="quitGame" class="results">
				<header>
					<h1 class="h1-text-result">Result</h1>
				</header>

				<article class="results-stats-box">
					<p class="stat-header">Total score:</p>
					<p>{{ totalScore }}</p>

					<p class="stat-header">Correct flags:</p>

					<p>
						{{ correctAnswer }}
					</p>

					<p class="stat-header">Questions:</p>
					<p>{{ questionCounter }}</p>

					<p class="stat-header">Elapsed time:</p>
					<p>{{ formattedElapsedTime }} min</p>
				</article>

				<button class="button--play-again" v-on:click="resetRound">
					Play again?
				</button>
			</div>
		</section>
	</section>
</template>
<script>
import _ from 'lodash'
export default {
	name: 'Game',
	props: {
		challenge: Boolean,
	},
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

			this.correctIndexToSplice = index
			return this.countryListSplice[index]
		},

		async createRegionQuestion(region) {
			if (this.regionList.length == 0) {
				this.regionList = await this.getCountriesByRegion(region)
				this.countryListSplice = [...this.regionList]
			}

			if (this.selectedRegion != region) {
				this.regionList = await this.getCountriesByRegion(region)
				this.countryListSplice = [...this.regionList]
			}

			if (this.regionList.length == 0) {
				this.selectedRegion = region
				this.regionList = await this.getCountriesByRegion(region)
				this.countryListSplice = [...this.regionList]
			}

			if (this.selectedRegion != region) {
				this.selectedRegion = region
				this.regionList = await this.getCountriesByRegion(region)
				this.countryListSplice = [...this.regionList]
			}

			let index = Math.floor(Math.random() * this.countryListSplice.length)

			this.correctIndexToSplice = index
			return this.countryListSplice[index]
		},

		startGame(region) {
			this.resetTimer()
			this.startTimer()
			this.displayQuestion(region)
		},

		startTimer() {
			this.timer = setInterval(() => {
				this.elapsedTime += 1000
			}, 1000)
		},

		resetTimer() {
			this.elapsedTime = 0
		},

		stopTimer() {
			clearInterval(this.timer)
		},

		calculateTotalScore() {
			this.totalScore = this.correctAnswer * this.elapsedTime * 0.125
		},

		resetRound() {
			this.totalScore = 0
			this.resetTimer()
			this.questionCounter = 0
			this.gameStarted = false
			this.quitGame = false
		},

		randomRegion() {
			let regions = ['Europe', 'Americas', 'Asia', 'Africa', 'Oceania', '']
			console.log(Math.floor(Math.random() * 5))

			return regions[Math.floor(Math.random() * regions.length + 1)]
		},

		quitShowScore() {
			this.questionCounter--
			this.quitGame = true
			this.stopTimer()
			this.calculateTotalScore()

			let currentHighScore = localStorage.getItem('highScore')
			console.log('Old score' + currentHighScore)
			let newHighScore = this.totalScore
			console.log('New score' + newHighScore)

			if (
				this.challenge &&
				this.selectedRegion === '' &&
				currentHighScore < newHighScore
			) {
				localStorage.setItem('highScore', newHighScore)
				this.postHighScore(this.totalScore)
			}
		},
		async displayQuestion(region) {
			this.answered = false
			this.questionCounter++
			this.gameStarted = true
			this.quitGame = false
			this.alternatives = []
			let country

			if (region === '') {
				country = await this.createQuestion()
			} else {
				country = await this.createRegionQuestion(region)
			}

			this.countryName = country.name
			this.countryFlag = country.flag
			this.alternatives.push(country.name)

			if (region === '') {
				while (this.alternatives.length < 4) {
					let index = Math.floor(
						Math.random() * this.countryListOriginal.length
					)
					if (
						!this.alternatives.includes(this.countryListOriginal[index].name)
					) {
						this.alternatives.push(this.countryListOriginal[index].name)
					}
				}
			} else {
				while (this.alternatives.length < 4) {
					let index = Math.floor(Math.random() * this.regionList.length)
					if (!this.alternatives.includes(this.regionList[index].name)) {
						this.alternatives.push(this.regionList[index].name)
					}
				}
			}
			this.alternatives = _.shuffle(this.alternatives)

			if (this.challenge === true && this.questionCounter === 21) {
				this.quitShowScore()
			}
		},
		checkAnswer(alternative) {
			console.log(alternative)
			this.answered = true

			let selectedAnswer = alternative
			console.log(selectedAnswer)

			if (this.countryName === selectedAnswer) {
				this.countryListSplice.splice(this.correctIndexToSplice, 1)
				this.correctAnswer++
				console.log('Correct answer')
			} else {
				console.log('Wrong answer')
			}
			setTimeout(this.displayQuestion, 1000, this.selectedRegion)
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
		postHighScore(highScore) {
			let userId = localStorage.getItem('userId')
			let getHighScore = {
				userId: userId,
				highScore: highScore,
			}
			fetch('http://localhost:3000/highScore', {
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
				},
				body: JSON.stringify(getHighScore),
			})
				.then((response) => response.json())
				.then((data) => {
					console.log(data)
				})
		},
	},
	data() {
		return {
			gameStarted: false,
			countryListOriginal: [],
			regionList: [],
			countryListSplice: [],
			selectedRegion: '',
			countryName: '',
			countryFlag: '',
			alternatives: [],
			correctAnswer: 0,
			questionCounter: 0,
			quitGame: false,
			answered: false,
			correctIndexToSplice: Number,
			elapsedTime: 0,
			timer: undefined,
			totalScore: 0,
		}
	},
	computed: {
		formattedElapsedTime() {
			const date = new Date(null)
			date.setSeconds(this.elapsedTime / 1000)
			const utc = date.toUTCString()
			return utc.substr(utc.indexOf(':') + 1, 5)
		},
	},
}
</script>
<style scoped>
h2 {
	font-family: 'Space Mono', monospace;
	letter-spacing: 2px;
	font-size: 30px;
	color: black;
}
.game-container {
	max-width: 1400px;
	display: flex;
}

.select-game-region {
	display: flex;
	flex-direction: column;
	gap: 15px;
	align-self: center;
}

.start-button {
	background-color: #f5b442;
	border: none;
	font-size: 30px;
	font-family: 'Space Mono', monospace;
	font-weight: bolder;
	letter-spacing: 5px;
	text-transform: uppercase;
	border: 2px solid black;
	box-shadow: 5px 5px;
	width: 400px;
}
.start-button:hover {
	background-color: #f0c273;
}

.button__all-countries {
	height: 100px;
	background-color: #f58442;
	grid-column: 1/-1;
	justify-self: center;
}

.button__all-countries:hover {
	background-color: #f78d4f;
}

.button__random {
	background: rgb(195, 193, 34);
	background: radial-gradient(
		circle,
		rgba(195, 193, 34, 1) 0%,
		rgba(240, 45, 253, 1) 100%
	);
}

.quiz {
	display: flex;
	width: 350px;
	height: 930px;
	margin: 0 auto;
	box-shadow: 7px 7px;
	border: 2px solid black;
	background-color: white;
}

header {
	background-color: #f5b442;
	margin: 0 0 20px 0;
	height: 200px;
	width: 100%;
	border-bottom: 3px solid black;
}

.timer {
	font-size: 15px;
	align-self: center;
	font-family: 'Space Mono', monospace;
	font-weight: bolder;
}
.h1-text-result {
	font-family: 'Space Mono', monospace;
	letter-spacing: 2px;
	font-size: 45px;
	color: black;
	margin: 0;
	padding: 15px;
}
.results-stats-box {
	width: 200px;
	margin: 0 auto;
	text-align: left;
	font-family: 'Space Mono', monospace;
	display: grid;
	grid-template-columns: auto auto;
	justify-content: flex-start;
}

.stat-header {
	font-weight: bold;
}

.results {
}

.box-flag {
	justify-content: center;
	margin-bottom: 15px;
}

.correct {
	background-color: green;
}

.incorrect {
	background-color: red;
}

.img-flag {
	height: 250px;
	min-height: 300px;
	width: 100%;
	max-height: 350px;
	border: 2px solid black;
	box-shadow: 5px 5px;
}

.box-suggestion {
	/* display: grid;
	grid-template-columns: 1fr 1fr; */
	display: flex;
	flex-direction: column;
}

ul {
	padding: 0;
	margin: 0;
}

li {
	color: black;
	cursor: pointer;
	list-style: none;
	width: 220px;
	height: 65px;
	background-color: #f58442;
	font-weight: bold;
	font-family: 'Space Mono', monospace;
	margin: 0 auto;
	margin-top: 5px;
	margin-bottom: 5px;
	box-shadow: 2px 2px;
	font-size: 16px;
	overflow: hidden;
	overflow-wrap: break-word;
}

.button--quit {
	font-size: 18px;
	cursor: pointer;
	width: 180px;
	height: 65px;
	background-color: #328bf1;
	font-weight: bold;
	font-family: 'Space Mono', monospace;
	box-shadow: 2px 2px;
	text-align: center;
	border: none;
	margin-top: 20px;
}

.button--play-again {
	font-size: 18px;
	cursor: pointer;
	width: 180px;
	height: 65px;
	background-color: #328bf1;
	font-weight: bold;
	font-family: 'Space Mono', monospace;
	box-shadow: 2px 2px;
	text-align: center;
	border: none;
	margin-top: 20px;
}

.button--play-again:hover {
	background-color: #1972d6;
}

.button--quit:hover {
	background-color: #1972d6;
}

@media screen and (min-width: 1050px) {
	.select-game-region {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}
	.box-suggestion {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}

	.img-flag {
		width: 480px;
		height: 100%;
		max-height: 280px;
	}

	.box-flag {
		min-height: 300px;
	}

	.quiz {
		width: 550px;
		height: 900px;
	}

	.game-container {
	}
}
</style>
