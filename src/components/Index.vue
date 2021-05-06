<template>
	<section>
		<!-- Ersätt med komponent 'header'? -->
		<header>
			<div>
				<h2>💡</h2>
			</div>
			<div>
				<h1>FlagTag</h1>
			</div>
			<div>
				<!-- Dölj om man ej är inloggad  -->
				<!-- Alternativt visa Log in / Sign up om man ej är inloggad -->
				<router-link to="/profile" v-if="signedIn">👱🏻‍♀️ Profile</router-link>
				<router-link to="/register" v-else>🚪 Sign up / Sign in</router-link>
			</div>
		</header>

		<main>
			<div class="game-mode-container">
				<!-- Ersätt med <router-link> till varje game-mode? -->
				<button class="button__gameOptions">Practice</button>
				<button class="button__gameOptions">Challenge</button>
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
					<li>Name - 213p</li>
					<li>Username - 200p</li>
					<li>Player - 190p</li>
					<li>User - 150p</li>
					<li>Name - 50p</li>
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
	font-size: 20px;
}

li {
	padding: 5px;
}
section {
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
	border-bottom: 2px solid lightgray;
	margin-bottom: 50px;
	background-color: rgb(247, 247, 247);
}

main {
	display: flex;
	flex-direction: column;
}

/* Highscore item */
aside {
}

footer {
}

button {
	color: white;
	border-radius: 5px;
}

.button__gameOptions {
	background-color: #007bff;
	text-transform: uppercase;
	font-size: 25px;
	width: 300px;
	height: 100px;
	border: 0;
	margin: 25px 0 25px 0;
}

.button__darkMode {
	font-size: 25px;
	border: 0;
	background-color: none;
}

.game-mode-container {
	display: flex;
	flex-direction: column;
	grid-column-start: 2;
	margin: 0 auto;
}

@media screen and (min-width: 1050px) {
	main {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		justify-items: stretch;
	}
}
</style>
