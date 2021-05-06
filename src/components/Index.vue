<template>
	<section>
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
@import url('https://fonts.googleapis.com/css2?family=Arvo:wght@700&family=Open+Sans&display=swap');
body {
	font-family: 'Open Sans', Arial, sans-serif;
}

p {
	font-size: 14px;
	line-height: 130%;
}

h1 {
	font-family: 'Arvo', Georgia, serif;
}

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

main {
	display: flex;
	flex-direction: column;
}

@media screen and (min-width: 1050px) {
	main {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		justify-items: stretch;
	}
}
</style>
