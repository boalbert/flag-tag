<template>
	<section class="game-container">
		<div class="select-game-region" v-if="!gameStarted">
			<button
				class="start-button button__all-countries"
				v-on:click="startGame('AllRegions')"
			>
				All Regions
			</button>
			<button
				class="start-button"
				v-on:click="startGame('Europe')"
			>
				Europe
			</button>
			<button
				class="start-button"
				v-on:click="startGame('Americas')"
			>
				Americas
			</button>
			<button
				class="start-button"
				v-on:click="startGame('Asia')"
			>
				Asia
			</button>
			<button
				class="start-button"
				v-on:click="startGame('Africa')"
			>
				Africa
			</button>
			<button
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
				<h2>Question {{ questionCounter }}<span v-if="challenge">/20</span></h2>

				<h3>Correct flags: {{ correctAnswer }}</h3>
			</header>
			<main v-if="!quitGame">
				<div class="box-flag">
					<p class="timer">
						<i class="far fa-clock"></i> {{ formattedElapsedTime }}
					</p>
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
					<h2 class="h2-text-result">Result</h2>
				</header>

				<article class="results-stats-box">
					<!-- v-if newScore > highScore  -->
					<div>
						<h2>Wow!</h2>
						<h3>You beat your last highscore!</h3>
					</div>

					<p><b>Answered questions:</b> {{ questionCounter }}</p>
					<p><b>Correct answers:</b> {{ correctAnswer }}</p>
					<p><b>Time:</b> {{ formattedElapsedTime }} min(s)</p>

					<p><b>Total score:</b> {{ totalScore }}p</p>
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
			this.correctAnswer = 0
			this.totalScore = 0
			this.resetTimer()
			this.questionCounter = 0
			this.gameStarted = false
			this.quitGame = false
		},

		randomRegion() {
			let regions = ['Europe', 'Americas', 'Asia', 'Africa', 'Oceania', 'AllRegions']
			console.log(Math.floor(Math.random() * 5))

			return regions[Math.floor(Math.random() * regions.length + 1)]
		},

		quitShowScore() {
			this.questionCounter--
			this.quitGame = true
			this.stopTimer()
			this.calculateTotalScore()

			// let currentHighScore = localStorage.getItem('highScore')
			// console.log('Old score' + currentHighScore)
			let newHighScore = this.totalScore
			console.log('New score' + newHighScore)
      let highscores = JSON.parse(localStorage.getItem("highScore"))

      console.log(highscores[this.selectedRegion])

			if (this.challenge && highscores[this.selectedRegion] < newHighScore ){
        highscores[this.selectedRegion] = newHighScore

				localStorage.setItem('highScore',JSON.stringify(highscores))
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

			if (region === 'AllRegions') {
				country = await this.createQuestion()
			} else {
				country = await this.createRegionQuestion(region)
			}

			this.countryName = country.name
			this.countryFlag = country.flag
			this.alternatives.push(country.name)

			if (region === 'AllRegions') {
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
				region: this.selectedRegion
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
			selectedRegion: 'AllRegions',
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
	font-size: 25px;
}

h3 {
	font-size: 19px;
}
h2,
h3 {
	font-family: 'Space Mono', monospace;
	letter-spacing: 2px;

}

.game-container {
	max-width: 1400px;
	display: flex;
}

.select-game-region {
	display: flex;
	flex-direction: column;
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
	width: 320px;
	margin: 5px;
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

.button__random:hover {
	background: rgb(195, 193, 34);
	background: radial-gradient(
		circle,
		rgba(195, 193, 34, 1) 10%,
		rgba(240, 45, 253, 1) 90%
	);
}

.quiz {
	display: flex;
	width: 100%;
	height: 100%;
	margin: 0 auto;
	box-shadow: 7px 7px;
	border: 2px solid black;
    padding-bottom: 20px;
}

header {
	background-color: #f5b442;
	/* height: 200px; */
	width: 100%;
	border-bottom: 3px solid black;
}

.timer {
	font-size: 15px;
	align-self: center;
	font-family: 'Space Mono', monospace;
	font-weight: bolder;
}
.h2-text-result {
	font-family: 'Space Mono', monospace;
	letter-spacing: 2px;
	font-size: 30px;

	margin: 0;
	padding: 15px;
}
.results-stats-box {
	font-family: 'Space Mono', monospace;
	padding: 15px;
	text-align: center;
}

.stat-header {
	font-weight: bold;
}

.correct {
	background-color: green;
}

.incorrect {
	background-color: red;
}
.box-flag {
	justify-content: center;
	margin-bottom: 15px;
}

.img-flag {
	height: 220px;
	width: 95%;
	max-width: 500px;
	border: 2px solid black;

}

.box-suggestion {
	display: grid;
	grid-template-columns: 1fr 1fr;
}

ul {
	padding: 0;
	margin: 0;
}

li {
	color: black;
	cursor: pointer;
	list-style: none;
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
	width: 150px;
	text-align: center;
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
	h2 {
		font-size: 25px;
	}

	h3 {
		font-size: 19px;
	}
	li {
		width: 190px;
		height: 80px;
		font-size: 17px;
		padding: 2px;
	}

	.select-game-region {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}
	.box-suggestion {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}

	.img-flag {
		width: 85%;
		height: 300px;
	}

	.quiz {
		width: 550px;
	}
}
</style>
