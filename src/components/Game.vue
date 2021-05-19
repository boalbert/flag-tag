<template>
	<div class="game-container">
		<button class="start-button" v-if="!gameStarted" v-on:click="displayQuestion('')">
			All countries
		</button>
    <button class="start-button" v-if="!gameStarted" v-on:click="displayQuestion('Europe')">
      Europe
    </button>
    <button class="start-button" v-if="!gameStarted" v-on:click="displayQuestion('Americas')">
      Americas
    </button>
    <button class="start-button" v-if="!gameStarted" v-on:click="displayQuestion('Asia')">
      Asia
    </button>
    <button class="start-button" v-if="!gameStarted" v-on:click="displayQuestion('Africa')">
      Africa
    </button>
    <button class="start-button" v-if="!gameStarted" v-on:click="displayQuestion('Oceania')">
      Oceania
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
          <button class="quit-button" v-on:click="quitGame = true">
            Quit / Show score
          </button>
				</div>

			</div>
			<div v-if="quitGame" class="results">
				<h2>Your score:</h2>
				<p>Score: {{ score }}</p>
				<p>Questions: {{ questionCounter }}</p>
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

      if(this.regionList.length == 0) {
        this.selectedRegion = region
        this.regionList = await this.getCountriesByRegion(region)
        this.countryListSplice = [...this.regionList]
      }

        if(this.selectedRegion != region){
          this.selectedRegion = region
          this.regionList = await this.getCountriesByRegion(region)
          this.countryListSplice = [...this.regionList]
        }

      let index = Math.floor(Math.random() * this.countryListSplice.length)

      this.correctIndexToSplice = index
      return this.countryListSplice[index]
    },

		resetRound() {
			this.questionCounter = 0
			this.gameStarted = false
			this.score = 0
			this.quitGame = false
		},
		async displayQuestion(region) {
			this.answered = false
			this.questionCounter++
			this.gameStarted = true
			this.quitGame = false
			this.alternatives = []
      let country;

			if(region === ''){
        country = await this.createQuestion()
      }else {
        country = await this.createRegionQuestion(region)
      }

			this.countryName = country.name
			this.countryFlag = country.flag
			this.alternatives.push(country.name)

      if(region === '') {
        while (this.alternatives.length < 4) {
          let index = Math.floor(Math.random() * this.countryListOriginal.length)
          if (!this.alternatives.includes(this.countryListOriginal[index].name)) {
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
		},
		checkAnswer(alternative) {console.log(alternative)
			this.answered = true

			let selectedAnswer = alternative
			console.log(selectedAnswer)

			if (this.countryName === selectedAnswer) {
				this.countryListSplice.splice(this.correctIndexToSplice, 1)
				this.score++
        console.log('Correct answer')
			} else {
				console.log('Wrong answer')
			}
			setTimeout(this.displayQuestion,1000, this.selectedRegion);
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
      regionList: [],
			countryListSplice: [],
      selectedRegion: '',
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
	color: #F5B442;
	background-color: #125DB3;
  min-width: 30vw;
}

.game-container {
	display: flex;
  flex-wrap: wrap;
  margin: auto;
  padding: 10px;
  justify-content: center;
  width: 20%;
  height: 40px;

}

.start-button{
  width: 400px;
  height: 60px;
  border: none;
  font-size: 22px;
  margin: 4px 2px;
  border-radius: 5px;
  text-align: center;
}
button:hover{
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
  background-color: #125DB3;
  color: #F5B442;
}

li:hover{
  background-color: #4188d7;
}

.quit-button{
  cursor: pointer;
  list-style: none;
  width: 180px;
  height: 50px;
  border: 1px solid rgb(175, 175, 175);
  margin-bottom: 8px;
  border-radius: 5px;
  padding: 10px;
  background-color: #125DB3;
  color: #F5B442;
  position: relative;
  top: 30px;
}
</style>
