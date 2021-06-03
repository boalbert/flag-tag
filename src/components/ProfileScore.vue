<template>
	<div class="score-container">
		<div class="All-Regions">
			<label>All Regions</label>
			<p>{{ highScore.highScoreAllRegions }}</p>
		</div>
		<div class="Asia">
			<label>Asia</label>
			<p>{{ highScore.highScoreAsia }}</p>
		</div>
		<div class="Americas">
			<label>Americas</label>
			<p>{{ highScore.highScoreAmericas }}</p>
		</div>
		<div class="Africa">
			<label>Africa</label>
			<p>{{ highScore.highScoreAfrica }}</p>
		</div>
		<div class="Europe">
			<label>Europe</label>
			<p>{{ highScore.highScoreEurope }}</p>
		</div>
		<div class="Oceania">
			<label>Oceania</label>
			<p>{{ highScore.highScoreOceania }}</p>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ProfileScore',
	data() {
		return {
			highScore: Array,
			userId: Number,
		}
	},
	mounted() {
		this.userId = localStorage.getItem('userId')
		this.getHighscore()
		console.log(this.userId)
	},
	methods: {
		getHighscore() {
			fetch(`http://localhost:3000/highscore/${this.userId}`, {
				method: 'GET',
				headers: {
					'Content-type': 'application/json',
				},
			})
				.then((response) => response.json())
				.then((data) => {
					console.log(data)
					this.highScore = data.highscore[0]
				})
		},
	},
}
</script>

<style>
.score-container {
	display: grid;
	justify-content: center;
	text-align: center;
	grid-template-columns: repeat(3, 150px);
	margin: auto;
	width: 450px;
	padding: 10px;
	box-shadow: 4px 4px;
	background: linear-gradient(90deg, #125db3 35%, #f58442 100%);
	font-family: 'Space Mono', monospace;
	font-weight: 800;
	font-size: 18px;
}
.All-Regions {
}
.Asia {
}
.Americas {
}
.Africa {
}
.Europe {
}
.Oceania {
}
</style>
