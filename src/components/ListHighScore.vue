<template>
	<!-- Temporär component
    Ersätt data med data från highscore prop -->
	<div>
		<h2>
			Highscore
		</h2>
		<!-- <ol v-for="score in highscore" key="score.id"> -->
		<ol>
			<!-- <li>{{ score.username }} - {{ score.points }}</li> -->
			<li>Name - 213p</li>
			<li>Username - 200p</li>
			<li>Player - 190p</li>
			<li>User - 150p</li>
			<li>Name - 50p</li>
		</ol>
	</div>
</template>

<script>
export default {
	name: 'ListHighScore',
	props: {
		highscore: Array,
	},
}
</script>

<style>
    h2{
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        font-size: 30px;
        color: #f7931e;
        text-align: center;
    }
    li{
        font-family: Arial, sans-serif;
        font-size: 14px;
        color: #3333ff;
        text-align: center;
    }
</style>
