<template>
	<section class="game-mode-container">
		<article class="card">
			<div class="card-body">
				<div class="card-left-container"></div>
				<div class="card-right-container">
					<p>
						Practice your skills in the game of FlagTag. Select from
						<strong>six different regions</strong>, or just go all out and
						<strong>guess them all!</strong>
					</p>
					<p>
						No timelimit, no flaglimit, just <strong>pure practice!</strong>
					</p>
				</div>
			</div>
			<div class="card-footer">
				<router-link to="/gamepage">
					<button class="button--startgame">
						<i class="fas fa-play"></i> Practice
					</button>
				</router-link>
			</div>
		</article>

		<article class="card">
			<div class="card-body">
				<div class="card-left-container"></div>
				<div class="card-right-container">
					<p><strong>“Use your swag to brag in FlagTag!</strong></p>
					<p>
						Time to test your skills!

						<strong>20 flags</strong> from all regions. Guess them
						<strong>all</strong> and guess them <strong>fast!</strong>
					</p>
				</div>
			</div>
			<div class="card-footer">
				<router-link to="/challengepage">
					<button class="button--startgame">
						<i class="fas fa-play"></i> Challenge
					</button>
				</router-link>
			</div>
		</article>

		<!-- 
		<router-link to="/challengepage">
			<button>Challenge</button>
		</router-link> -->
	</section>
</template>

<script>
export default {
	name: 'SelectGameMode',
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Arvo:wght@700&family=Open+Sans&display=swap');

p {
	font-family: 'Open Sans', sans-serif;
	font-size: 14px;
	line-height: 100%;
}
.game-mode-container {
	display: flex;
	width: 300px;
}
.card {
	display: flex;
	flex-direction: column;
	box-shadow: 7px 7px;
	background-color: white;
	border: 2px solid black;
	margin-bottom: 20px;
}

.card-body {
	display: flex;
}

.card-left-container {
	background-image: url('../img/cardbg.png');
	width: 200px;
}

.button--startgame {
	width: 100%;
	background-color: #f5b442;
	border: none;

	font-family: 'Space Mono', monospace;
	font-size: 23px;
	color: black;
	text-align: center;
	letter-spacing: 8px;
	font-weight: bolder;
	text-transform: uppercase;
	margin: 0; /* Removes space around button for mobile-view */
}

.button--startgame:hover {
	background-color: #f0c273;
}

@media screen and (min-width: 1050px) {
	.button--startgame {
		font-size: 30px;
	}
	.card-left-container {
		width: 400px;
	}
	.card-body {
		height: 200px;
	}
	.game-mode-container {
		width: 400px;
	}
	.card-right-container {
		padding: 15px;
	}

	p {
		font-size: 16px;
		line-height: 130%;
	}
}
</style>
