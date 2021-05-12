<template>
	<section>
		<SelectGameMode />
		<ListHighScore />
	</section>
</template>

<script>
import SelectGameMode from '@/components/SelectGameMode.vue'
import ListHighScore from '@/components/ListHighScore.vue'

export default {
	name: 'Home',
	components: {
		SelectGameMode,
		ListHighScore,
	},
	data() {
		return {
			userDetails: '',
			signedIn: false,
		}
	},
}
</script>

<style>
section {
	display: flex;
	flex-direction: column;
	width: 95%;
	margin: 0 auto;
	max-width: 1400px;
}

@media screen and (min-width: 1050px) {
	section {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		justify-items: stretch;
	}
}

button:hover {
	cursor: pointer;
}

.button__gameOptions {
	background-color: #007bff;
	text-transform: uppercase;
	font-size: 25px;
	width: 300px;
	height: 100px;
	border: 0;
	margin: 25px 0 25px 0;
	color: white;
	border-radius: 5px;
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
</style>
