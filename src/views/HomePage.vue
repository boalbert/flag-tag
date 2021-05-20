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
	name: 'HomePage',
	components: {
		SelectGameMode,
		ListHighScore,
	},
	data() {
		return {}
	},
}
</script>

<style>
section {
	display: flex;
	flex-direction: column;
	width: 95%;
	margin: 0 auto;
	justify-content: center;
	grid-column-start: 2;
	gap: 20px;
}

@media screen and (min-width: 1050px) {
	section {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		justify-items: stretch;
		max-width: 1400px;
	}
}

button:hover {
	cursor: pointer;
}

.button__gameOptions {
	background-color: #1b4d7a;
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
</style>
