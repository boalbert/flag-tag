<template>
	<section>
		<header>
			<div>
				<button class="button__darkMode">💡</button>
			</div>
			<div class="logo">
				<h1>FlagTag</h1>
			</div>
			<div>
				<!-- v-if="signedIn" -->
				<!-- Dölj om man ej är inloggad  -->
				<!-- Alternativt visa Log in / Sign up om man ej är inloggad -->
				<a href="#" class="button__profile" v-if="signedIn">👱🏻‍♀️ Profile </a>
				<a href="#" class="button__profile" v-else>🚪 Sign up / Sign in</a>
			</div>
		</header>

		<main>
			<div></div>
			<div class="game-mode-container">
				<button class="button__gameOptions" @click="practice">Practice</button>
				<button class="button__gameOptions" @click="challenge">
					Challenge
				</button>
				<!-- <button class="button__gameOptions" @click="login">
					Log in / Sign Up
				</button> -->
			</div>

			<!-- Ersätts med komponent <highscore />? -->
			<aside>
				<h2>
					Highscore
				</h2>
				<!-- Skicka in array med highscore som prop till komponenten -->
				<!-- <ol v-for="score in highscore" key="score.id"> -->
				<ol>
					<!-- <li>{{ score.usename }} - {{ score.points }}</li> -->
					<li>Player 1</li>
					<li>Player 2</li>
					<li>Player 3</li>
					<li>Player 4</li>
					<li>Player 5</li>
				</ol>
			</aside>
		</main>

		<!-- <footer>
			Länkar till facebook / twitter / etc?
		</footer> -->
	</section>
</template>

<script>
export default {
	name: 'Index',
	props: {
		highscore: Array,
	},
	data() {
		return {
			signedIn: false,
		}
	},
	methods: {},
	mounted() {},
}
</script>

<style>
h1 {
	font-size: 45px;
}

h2 {
	font-size: 30px;
}

p {
	font-size: 16px;
}

ol,
li {
	font-size: 25px;
}
section {
	/* border: 2px solid blue; */
	display: flex;
	flex-direction: column;
	width: 95%;
	margin: 0 auto;
	max-width: 1400px;
}

header {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;

	align-items: baseline;
	height: 150px;
}

main {
	display: flex;
	flex-direction: column;
	/* border: 2px solid red; */
}

aside {
	/* border: 2px solid orange; */
	padding: 5px;
}

footer {
	/* border: 2px solid green; */
}

.logo {
	text-align: center;
	/* border: 2px solid green; */
}

.game-mode-container {
	display: flex;
	flex-direction: column;
	margin: 0 auto;
}

button {
	color: white;
	border-radius: 5px;
}

.button__gameOptions {
	background-color: cornflowerblue;
	font-size: 25px;
	width: 250px;
	height: 100px;
	border: 0;
	margin: 25px 0 25px 0;
}

.button__profile {
	/* color: red; */
}

.button__darkMode {
	font-size: 25px;
	border: 0;
	background-color: none;
	/* padding: 15px; */
}

@media screen and (min-width: 1050px) {
	body {
	}
	header {
	}

	main {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
	}
}
</style>
