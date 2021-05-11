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

<style></style>
