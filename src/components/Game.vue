<template>
	<div class="game-container">
		<button class="start-button" v-if="!gameStarted" v-on:click="startGame('')">
			All countries
		</button>
		<button
			class="start-button"
			v-if="!gameStarted"
			v-on:click="startGame('Europe')"
		>
			Europe
		</button>
		<button
			class="start-button"
			v-if="!gameStarted"
			v-on:click="startGame('Americas')"
		>
			Americas
		</button>
		<button
			class="start-button"
			v-if="!gameStarted"
			v-on:click="startGame('Asia')"
		>
			Asia
		</button>
		<button
			class="start-button"
			v-if="!gameStarted"
			v-on:click="startGame('Africa')"
		>
			Africa
		</button>
		<button
			class="start-button"
			v-if="!gameStarted"
			v-on:click="startGame('Oceania')"
		>
			Oceania
		</button>
		<div v-if="gameStarted" class="quiz">
			<div v-if="!quitGame" class="header">
				<h1>Question {{ questionCounter }}</h1>
				<h3>Correct flags: {{ correctAnswer }}</h3>
				<p>{{ formattedElapsedTime }}</p>
			</div>
			<div v-if="!quitGame" class="main">
				<div class="box-flag">
					<img class="img-flag" v-bind:src="this.countryFlag" />
				</div>
				<div class="box-suggestion">
					<ul class="list-answers">
						<li
							v-for="(alternative, index) in alternatives"
							v-bind:key="index"
							v-on:click="checkAnswer(alternative)"
							:class="answerClass(alternative)"
						>
							{{ alternative }}
						</li>
					</ul>
					<button class="quit-button" v-on:click="quitShowScore">
						Quit / Show score
					</button>
				</div>
			</div>
			<div v-if="quitGame" class="results">
				<h1>Result</h1>
				<h3>Score: {{ totalScore }}</h3>
				<p>Correct flags: {{ correctAnswer }}</p>
				<p>Questions: {{ questionCounter }}</p>
				<p>Your time: {{ formattedElapsedTime }}</p>
				<button v-on:click="resetRound">Play again?</button>
				<!--        <button>Change region?</button>  -->
			</div>
		</div>
	</div>
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
			this.gameStarted = true
			this.correctAnswer = 0
			this.quitGame = false
			this.startTimer()

			// Ändra till redirect 'Select Game'?
			this.displayQuestion(this.selectedRegion)
		},

		quitShowScore() {
			this.questionCounter--
			this.quitGame = true
			this.stopTimer()
			this.calculateTotalScore()
      if (this.challenge && this.selectedRegion === ''){
        this.postHighScore(this.totalScore)
      }
		},
		async displayQuestion(region) {
			this.answered = false
			this.questionCounter++
			this.gameStarted = true
			this.quitGame = false
			this.alternatives = []
			this.selectedRegion = region
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
				console.log('I if')
				answerClass = 'correct'
			} else if (this.answered) {
				console.log('I else - if')
				answerClass = 'incorrect'
			}

			return answerClass
		},
    postHighScore(highScore){
      let userId = localStorage.getItem("userId")
      let getHighScore = {
        userId : userId,
        highScore: highScore
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
    }
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
h1 {
	font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
	font-size: 30px;
	color: #f7931e;
}
button {
	font-family: Arial, sans-serif;
	font-size: 16px;
	color: #f5b442;
	background-color: #125db3;
}

.game-container {
	display: flex;
	margin: auto;
	padding: 10px;
	justify-content: center;
	width: 20%;
	height: 40px;
}

.start-button {
	width: 400px;
	height: 60px;
	border: none;
	font-size: 22px;
	margin: 4px 2px;
	border-radius: 5px;
	text-align: center;
}
button:hover {
	background-color: #4188d7;
	text-align: center;
}

.quiz {
	display: grid;
	/* border: 2px solid red; */
	width: 700px;
	height: 800px;
	margin: 0 auto;

	border: 1px solid rgb(243, 243, 243);
	box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}

.header {
	/* background-color: green; */
	margin: auto;
}

.results {
	width: 700px;
}

.main {
	width: auto;
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
	display: block;
	/* flex-direction: column; */
	/* border: 2px solid green; */
	justify-content: center;
	/* width: 100%; */
}

ul {
	padding: 0;
	height: 100px;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	/*width: 700px;*/
}

li {
	cursor: pointer;
	list-style: none;
	width: 180px;
	height: 40px;
	border: 1px solid rgb(175, 175, 175);
	margin-bottom: 8px;
	margin: auto;
	border-radius: 5px;
	padding: 10px;
	background-color: #125db3;
	color: #f5b442;
}

li:hover {
	background-color: #4188d7;
}

.quit-button {
	cursor: pointer;
	list-style: none;
	width: 180px;
	height: 50px;
	border: 1px solid rgb(175, 175, 175);
	margin-bottom: 8px;
	border-radius: 5px;
	padding: 10px;
	background-color: #125db3;
	color: #f5b442;
	position: relative;
	top: 30px;
}
</style>
