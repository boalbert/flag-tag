<template>
	<div class="highscore-container">
		<div class="highscore-header">
			<h2><i class="fas fa-star"></i> Highscore</h2>
			<h3>All Regions</h3>
		</div>
		<ol>
			<li v-for="(score, index) in highscore" v-bind:key="index">
				{{ score.userName }} - {{ score.highScoreAllRegions }}
			</li>
		</ol>
	</div>
</template>

<script>
export default {
	name: 'ListHighScore',
	data() {
		return {
			highscore: Array,
		}
	},
	methods: {
		getHighscore() {
			fetch('http://localhost:3000/highScore/', {
				method: 'GET',
				headers: {
					'Content-type': 'application/json',
				},
			})
				.then((response) => response.json())
				.then((data) => {
					this.highscore = data.users
					console.log(this.highscore)
				})
		},
	},
	mounted() {
		this.getHighscore()
	},
}
</script>

<style scoped>
h2 {
	font-family: 'Space Mono', monospace;
	font-weight: bold;
	letter-spacing: 5px;
	margin-bottom: 0px;
}

h3 {
	font-size: 16px;
	font-family: 'Space Mono', monospace;
	font-weight: bold;
	letter-spacing: 5px;
	margin-top: 0px;
	padding-top: 0px;
}
.highscore-header {
	background-color: #f5b442;
	padding: 0px;
	border-bottom: 2px solid black;
}
.highscore-container {
	margin: 0 auto;
	margin-bottom: 20px;
	text-align: center;
	box-shadow: 7px 7px;
	border: 2px solid black;
	height: 300px;
	display: flex;
	flex-direction: column;
	width: 300px;
}
ol {
	font-family: 'Space Mono', monospace;
	text-align: center;
}
li {
	font-size: 16px;
}
</style>
