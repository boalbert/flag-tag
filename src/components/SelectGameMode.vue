<template>
	<div class="game-mode-container">
		<!-- Ersätt med <router-link> till varje game-mode? -->

		<router-link to="/gamepage">
			<button class="button__gameOptions">Practice</button>
		</router-link>

		<router-link to="/challengepage">
			<button class="button__gameOptions">Challenge</button>
		</router-link>
	</div>
</template>

<script>
export default {
	name: 'SelectGameMode',
}
</script>

<style scoped>
button {
	font-family: Arial, sans-serif;
	font-size: 25px;
	color: #f5b442;
	background-color: #125db3;
}
button:hover {
	background-color: #4188d7;
}
</style>
