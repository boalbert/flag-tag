<template>
	<!-- Temporär component
    Ersätt data med data från highscore prop -->
	<div class="highscore-container">
		<div class="highscore-header">
			<h2><i class="fas fa-star"></i> Highscore</h2>
		</div>
		<ol>
			<li v-for="(score, index) in highscore" v-bind:key="index">
				{{ score.userName }} - {{ score.highScore }}
			</li>
		</ol>
	</div>
</template>

<script>
export default {
	name: 'ListHighScore',
	props: {
		highscore: Array,
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

<style>
h2 {
	font-family: 'Space Mono', monospace;
    font-weight: bold;
	letter-spacing: 5px;
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
