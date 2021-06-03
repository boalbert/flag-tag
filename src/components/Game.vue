<template>
	<section class="game-container">
		<div class="select-game-region" v-if="!gameStarted">
			<button
				class="start-button button__all-countries"
				v-on:click="startGame('AllRegions')"
			>
				All Regions
			</button>
			<button class="start-button" v-on:click="startGame('Europe')">
				Europe
			</button>
			<button class="start-button" v-on:click="startGame('Americas')">
				Americas
			</button>
			<button class="start-button" v-on:click="startGame('Asia')">
				Asia
			</button>
			<button class="start-button" v-on:click="startGame('Africa')">
				Africa
			</button>
			<button class="start-button" v-on:click="startGame('Oceania')">
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
					<!-- Show timer in challenge-mode -->
					<p class="timer" v-if="challenge">
						<i class="far fa-clock"></i> {{ formattedElapsedTime }}
					</p>
					<img class="img-flag" v-bind:src="this.countryFlag" />
				</div>
				<div class="box-suggestion">
					<ul v-for="(alternative, index) in alternatives" v-bind:key="index">
						<li>
							<button
								class="button--alternative"
								:class="answerClass(alternative)"
								v-on:click="checkAnswer(alternative)"
								:disabled="disabled"
							>
								{{ alternative }}
							</button>
						</li>
					</ul>
				</div>
				<button class="button--quit" v-on:click="quitShowScore">
					END GAME
				</button>
			</main>

			<!-- Shows result when game is finished -->
			<div v-if="quitGame" class="results">
				<header>
					<h2 class="h2-text-result">Result</h2>
				</header>
				<article class="results-stats-box">
					<!-- Challenge mode: -->
					<!-- Player is logged in -->
					<div v-if="challenge && signedIn">
						<!-- Beat her old highscore -->
						<div v-if="showGoodJobPromt">
							<h2>Wow! New highscore!</h2>
							<p>
								Great job! This was your best one yet! Keep going and you'll get
								even better!
							</p>
						</div>
						<!-- Did not beat her old highscore -->
						<div v-if="!showGoodJobPromt">
							<h2>Aww... Try again!</h2>
							<p>You did not beat your old highscore.</p>
						</div>
					</div>

					<!-- Challenge mode: -->
					<!-- Player is not logged in -->
					<div v-else-if="challenge && !signedIn">
						<!-- Player gets MORE than half questions correct -->
						<div v-if="this.correctAnswer / this.questionCounter > 0.5">
							<h2>
								Good job!
							</h2>
							<p>
								Create an account and log in to save you highscore.
							</p>
						</div>

						<!-- Player gets LESS than half questions correct -->
						<div v-else>
							<h2>
								Not impressed...
							</h2>
							<p>
								You might not want to save this score...
							</p>
						</div>
					</div>

					<!-- Practice mode: -->
					<!-- If player gets MORE than half the questions correct -->
					<div v-else>
						<h2 v-if="this.correctAnswer / this.questionCounter > 0.5">
							Good job! You're on the right track!
						</h2>
						<!-- If player gets LESS than half correct-->
						<h2 v-else>Keep practicing!</h2>
						<p>
							Maybe one day you'll get a place on the highscore list? Start a
							challenge round when you feel ready.
						</p>
					</div>

					<p><b>Answered questions:</b> {{ questionCounter }}</p>
					<p><b>Correct answers:</b> {{ correctAnswer }}</p>

					<!-- Hide score and time when practicing -->
					<p v-if="challenge"><b>Time:</b> {{ formattedElapsedTime }} min(s)</p>
					<!-- Hide calculated score if not challenge completed in full -->
					<p v-if="challenge && this.questionCounter === 20">
						<b>Total score:</b> {{ totalScore }}p
					</p>
					<p v-if="challenge && this.questionCounter < 20">
						<b>Total score:</b> You finished to early to say...
					</p>
				</article>

				<button class="button--play-again" v-on:click="resetRound">
					Play again?
				</button>

				<button
					v-if="!signedIn && this.challenge"
					class="button--play-again"
					v-on:click="redirectToRegister"
				>
					Log in and save your score?
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

			if (this.countryListSplice - length < 1) {
				this.countryListSplice = [...this.countryListOriginal]
			}

			let index = Math.floor(Math.random() * this.countryListSplice.length)

			this.correctIndexToSplice = index
			return this.countryListSplice[index]
		},

		async createRegionQuestion(region) {
			if (this.regionList.length === 0) {
				this.selectedRegion = region
				this.regionList = await this.getCountriesByRegion(region)
				this.countryListSplice = [...this.regionList]
			}

			if (this.selectedRegion !== region) {
				this.selectedRegion = region
				this.regionList = await this.getCountriesByRegion(region)
				this.countryListSplice = [...this.regionList]
			}

			if (this.countryListSplice.length < 1) {
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
			//Time bonus suggestion. Timebonus starts at 8000p and is counted down by 99p every second
			//This will generate a maximum timebonus of aprox 5000p (25% of maximum questions score).
			let timeBonus = 8000 - (this.elapsedTime / 1000) * 99
			if (timeBonus < 0) timeBonus = 0

			let calculatedScore = this.correctAnswer * 999 + timeBonus
			this.totalScore = calculatedScore.toFixed(0)
		},

		resetRound() {
			this.correctAnswer = 0
			this.totalScore = 0
			this.resetTimer()
			this.questionCounter = 0
			this.gameStarted = false
			this.quitGame = false
			this.showGoodJobPromt = false
		},

		randomRegion() {
			let regions = [
				'Europe',
				'Americas',
				'Asia',
				'Africa',
				'Oceania',
				'AllRegions',
			]
			console.log(Math.floor(Math.random() * 5))

			return regions[Math.floor(Math.random() * regions.length + 1)]
		},

		checkIfLoggedIn() {
			let loggedInUserId = localStorage.getItem('userId')
			console.log(loggedInUserId)

			if (loggedInUserId != null) {
				console.log('User is logged in: ' + loggedInUserId)
				this.signedIn = true
			}
		},

		quitShowScore() {
			this.questionCounter--
			this.quitGame = true
			this.stopTimer()
			this.calculateTotalScore()
			this.checkIfLoggedIn()

			// If user is not logged in
			// Save highscore and region as temp variables in localstorage
			if (!this.signedIn && this.challenge) {
				console.log('Saving tempHighscore and tempRegion to localStorage.')
				localStorage.setItem('tempHighscore', this.totalScore)
				localStorage.setItem('tempRegion', this.selectedRegion)

				// If user is logged in
				// Compare new score with old scored from localstorage
			} else {
				// New score
				let newHighScore = this.totalScore
				// Old score from localstorage
				let highscores = JSON.parse(localStorage.getItem('highScore'))
				// If in challange-mode AND new highscore is better than old highscore
				// POST to database
				if (
					this.challenge &&
					highscores[this.selectedRegion] < newHighScore &&
					this.questionCounter === 20
				) {
					console.log(
						'I challenge, bättre poäng och skall ha svarat på 20 frågor?'
					)
					this.showGoodJobPromt = true
					highscores[this.selectedRegion] = newHighScore
					localStorage.setItem('highScore', JSON.stringify(highscores))
					this.postHighScore(this.totalScore)
				}
			}
		},
		async displayQuestion(region) {
			this.disabled = false
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
			this.disabled = true
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
				region: this.selectedRegion,
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
		redirectToRegister() {
			this.$router.push({ path: '/register' })
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
			signedIn: false,
			showGoodJobPromt: false, // True if player beats her old highscore
			disabled: false,
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
	max-width: 550px;
	height: 100%;
	margin: 0 auto;
	box-shadow: 7px 7px;
	border: 2px solid black;
	padding-bottom: 20px;
}

header {
	background-color: #f5b442;
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

.results {
	display: flex;
	flex-direction: column;
}

.results button {
	align-self: center;
}

li {
	list-style: none;
	text-align: center;
	margin: 0 auto;
}

.button--alternative {
	color: black;
	cursor: pointer;

	height: 75px;
	background-color: #f58442;
	font-weight: bold;
	font-family: 'Space Mono', monospace;

	margin-top: 5px;
	margin-bottom: 5px;
	box-shadow: 2px 2px;
	font-size: 16px;
	overflow: hidden;
	overflow-wrap: break-word;
	width: 170px;
	text-align: center;
	border: none;
}

.correct {
	background-color: green;
}

.incorrect {
	background-color: red;
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
	width: 190px;
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

	.select-game-region {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}
	.box-suggestion {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}

	li {
		list-style: none;
		text-align: center;
		margin: 0 auto;
	}

	.button--alternative {
		color: black;
		cursor: pointer;

		height: 75px;
		background-color: #f58442;
		font-weight: bold;
		font-family: 'Space Mono', monospace;

		margin-top: 5px;
		margin-bottom: 5px;
		box-shadow: 2px 2px;
		font-size: 16px;
		overflow: hidden;
		overflow-wrap: break-word;
		width: 220px;
		text-align: center;
		border: none;
		outline: none;
	}

	.button--alternative:active {
		transform: translateY(1px);
		box-shadow: 2px 2px;
		border: none;
		outline: none;
	}

	.img-flag {
		width: 85%;
		height: 300px;
	}

	.quiz {
		width: 550px;
	}
	.correct {
		background-color: green;
		box-shadow: 2px 2px;
		border: none;
		outline: none;
	}

	.incorrect {
		background-color: red;
		box-shadow: 2px 2px;
		border: none;
		outline: none;
	}
}
</style>
